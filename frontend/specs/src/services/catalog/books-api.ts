import {
  type BookDto,
  type CatalogFacetsDto,
  type CreateBookPayloadDto,
  type GetBooksFilters,
  type UpdateBookPayloadDto,
} from "./catalog-types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

function ensureOk(response: Response, message: string): void {
  if (!response.ok) {
    throw new Error(`${message}: ${response.status}`);
  }
}

function buildBooksQuery(filters: GetBooksFilters): string {
  const params = new URLSearchParams();

  if (filters.q.trim()) params.set("q", filters.q.trim());
  if (filters.author) params.set("author", filters.author);
  if (filters.category) params.set("category", filters.category);
  if (filters.availability) params.set("available", filters.availability);

  const query = params.toString();
  return query ? `?${query}` : "";
}

export async function getBooks(filters: GetBooksFilters): Promise<BookDto[]> {
  const response = await fetch(`${API_BASE_URL}/api/books${buildBooksQuery(filters)}`);
  ensureOk(response, "Failed to fetch catalog data");
  return response.json() as Promise<BookDto[]>;
}

export async function getCatalogFacets(): Promise<CatalogFacetsDto> {
  const response = await fetch(`${API_BASE_URL}/api/books/facets`);
  ensureOk(response, "Failed to fetch facets");
  return response.json() as Promise<CatalogFacetsDto>;
}

export async function createBook(payload: CreateBookPayloadDto): Promise<BookDto> {
  const response = await fetch(`${API_BASE_URL}/api/books`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  ensureOk(response, "Failed to create book");
  return response.json() as Promise<BookDto>;
}

export async function updateBook(
  bookId: number,
  payload: UpdateBookPayloadDto,
): Promise<BookDto> {
  const response = await fetch(`${API_BASE_URL}/api/books/${bookId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  ensureOk(response, "Failed to update book");
  return response.json() as Promise<BookDto>;
}
