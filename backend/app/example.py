def _apply_filters(books: list[Book],
                   query: str | None,
                   author: str | None,
                   category: str | None,
                   available: bool | None) -> list[Book]: 
    filtered = books
    if query:
        query_text = query.lower().strip()
        filtered = [book
                    for book in filtered
                    if query_text in book.title.lower()
                    or query_text in book.author.lower()
                    or query_text in book.category.lower()]
    if author:
        filtered = [book for book in filtered if book.author == author]
    if category:
        filtered = [book for book in filtered if book.category == category]
    if available is not None:
        filtered = [book for book in filtered if book.available is available]
    return sorted(filtered, key=lambda item: (item.title.lower(), item.id))


def get_books(query: str | None = Query(default=None),
              author: str | None = Query(default=None),
              category: str | None = Query(default=None),
              available: bool | None = Query(default=None),
              limit: int = Query(default=100, ge=1, le=200)) -> list[Book]:
    filtered = _apply_filters(BOOKS, query, author, category, available)
    return filtered[:limit]