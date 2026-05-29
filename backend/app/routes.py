from __future__ import annotations

from fastapi import APIRouter, HTTPException, Query, status
from pydantic import BaseModel, Field

router = APIRouter()


class BookBase(BaseModel):
    title: str = Field(min_length=1, max_length=180)
    author: str = Field(min_length=1, max_length=120)
    category: str = Field(min_length=1, max_length=80)
    published_year: int = Field(ge=1450, le=2100)
    available: bool = True


class Book(BookBase):
    id: int


class BookCreate(BookBase):
    pass


class BookUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=1, max_length=180)
    author: str | None = Field(default=None, min_length=1, max_length=120)
    category: str | None = Field(default=None, min_length=1, max_length=80)
    published_year: int | None = Field(default=None, ge=1450, le=2100)
    available: bool | None = None


class CatalogFacets(BaseModel):
    authors: list[str]
    categories: list[str]
    total_books: int
    available_books: int


def _seed_books() -> list[Book]:
    return [
        Book(id=1, title="Cien anos de soledad", author="Gabriel Garcia Marquez", category="Novela", published_year=1967, available=True),
        Book(id=2, title="Don Quijote de la Mancha", author="Miguel de Cervantes", category="Clasicos", published_year=1605, available=True),
        Book(id=3, title="Rayuela", author="Julio Cortazar", category="Novela", published_year=1963, available=False),
        Book(id=4, title="La tregua", author="Mario Benedetti", category="Poesia", published_year=1960, available=True),
        Book(id=5, title="El principito", author="Antoine de Saint-Exupery", category="Infantil", published_year=1943, available=True),
        Book(id=6, title="Pedro Paramo", author="Juan Rulfo", category="Novela", published_year=1955, available=False),
        Book(id=7, title="Ficciones", author="Jorge Luis Borges", category="Cuentos", published_year=1944, available=True),
        Book(id=8, title="Mujercitas", author="Louisa May Alcott", category="Juvenil", published_year=1868, available=True),
    ]


BOOKS: list[Book] = _seed_books()
NEXT_ID = max(book.id for book in BOOKS) + 1


def _apply_filters(
    books: list[Book],
    q: str | None,
    author: str | None,
    category: str | None,
    available: bool | None,
) -> list[Book]:
    filtered = books

    if q:
        q_text = q.lower().strip()
        filtered = [
            book
            for book in filtered
            if q_text in book.title.lower()
            or q_text in book.author.lower()
            or q_text in book.category.lower()
        ]

    if author:
        filtered = [book for book in filtered if book.author == author]

    if category:
        filtered = [book for book in filtered if book.category == category]

    if available is not None:
        filtered = [book for book in filtered if book.available is available]

    return sorted(filtered, key=lambda item: (item.title.lower(), item.id))


def _find_book(book_id: int) -> Book:
    for book in BOOKS:
        if book.id == book_id:
            return book
    raise HTTPException(status_code=404, detail="Book not found")


@router.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@router.get("/api/books", response_model=list[Book])
def get_books(
    q: str | None = Query(default=None),
    author: str | None = Query(default=None),
    category: str | None = Query(default=None),
    available: bool | None = Query(default=None),
    limit: int = Query(default=100, ge=1, le=200),
) -> list[Book]:
    filtered = _apply_filters(BOOKS, q, author, category, available)
    return filtered[:limit]


@router.get("/api/books/facets", response_model=CatalogFacets)
def get_catalog_facets() -> CatalogFacets:
    authors = sorted({book.author for book in BOOKS})
    categories = sorted({book.category for book in BOOKS})
    available_books = sum(1 for book in BOOKS if book.available)

    return CatalogFacets(
        authors=authors,
        categories=categories,
        total_books=len(BOOKS),
        available_books=available_books,
    )


@router.post("/api/books", response_model=Book, status_code=status.HTTP_201_CREATED)
def create_book(payload: BookCreate) -> Book:
    global NEXT_ID

    book = Book(id=NEXT_ID, **payload.model_dump())
    BOOKS.append(book)
    NEXT_ID += 1
    return book


@router.put("/api/books/{book_id}", response_model=Book)
def update_book(book_id: int, payload: BookUpdate) -> Book:
    current = _find_book(book_id)
    updates = payload.model_dump(exclude_unset=True)

    for field_name, field_value in updates.items():
        setattr(current, field_name, field_value)

    return current
