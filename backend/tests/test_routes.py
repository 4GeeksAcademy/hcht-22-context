from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_health_endpoint_returns_ok():
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_books_endpoint_returns_catalog_sorted_by_title():
    response = client.get("/api/books")

    assert response.status_code == 200
    payload = response.json()
    assert payload
    titles = [item["title"] for item in payload]
    assert titles == sorted(titles, key=str.lower)


def test_books_endpoint_filters_by_query_author_category_and_availability():
    response = client.get(
        "/api/books",
        params={
            "q": "cien",
            "author": "Gabriel Garcia Marquez",
            "category": "Novela",
            "available": True,
        },
    )

    assert response.status_code == 200
    payload = response.json()
    assert payload
    assert all("cien" in item["title"].lower() for item in payload)
    assert all(item["author"] == "Gabriel Garcia Marquez" for item in payload)
    assert all(item["category"] == "Novela" for item in payload)
    assert all(item["available"] is True for item in payload)


def test_facets_endpoint_returns_authors_categories_and_totals():
    response = client.get("/api/books/facets")

    assert response.status_code == 200
    payload = response.json()
    assert set(payload.keys()) == {
        "authors",
        "categories",
        "total_books",
        "available_books",
    }
    assert payload["total_books"] >= payload["available_books"]
    assert payload["authors"]
    assert payload["categories"]


def test_create_book_adds_new_record():
    response = client.post(
        "/api/books",
        json={
            "title": "Casa de Munecas",
            "author": "Henrik Ibsen",
            "category": "Teatro",
            "published_year": 1879,
            "available": True,
        },
    )

    assert response.status_code == 201
    payload = response.json()
    assert payload["id"] > 0
    assert payload["title"] == "Casa de Munecas"

    list_response = client.get("/api/books", params={"q": "Munecas"})
    assert list_response.status_code == 200
    list_payload = list_response.json()
    assert any(item["id"] == payload["id"] for item in list_payload)


def test_update_book_modifies_existing_record():
    create_response = client.post(
        "/api/books",
        json={
            "title": "El tunel",
            "author": "Ernesto Sabato",
            "category": "Novela",
            "published_year": 1948,
            "available": True,
        },
    )
    book_id = create_response.json()["id"]

    update_response = client.put(
        f"/api/books/{book_id}",
        json={"available": False, "category": "Clasicos"},
    )

    assert update_response.status_code == 200
    payload = update_response.json()
    assert payload["id"] == book_id
    assert payload["available"] is False
    assert payload["category"] == "Clasicos"
