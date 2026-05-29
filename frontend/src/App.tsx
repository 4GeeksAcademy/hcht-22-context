import { FormEvent, useEffect, useMemo, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  published_year: number;
  available: boolean;
}

interface CatalogFacets {
  authors: string[];
  categories: string[];
  total_books: number;
  available_books: number;
}

interface BookFormState {
  title: string;
  author: string;
  category: string;
  published_year: string;
  available: boolean;
}

const EMPTY_FORM: BookFormState = {
  title: "",
  author: "",
  category: "",
  published_year: "",
  available: true,
};

async function fetchBooks(filters: {
  q: string;
  author: string;
  category: string;
  availability: string;
}): Promise<Book[]> {
  const params = new URLSearchParams();
  if (filters.q.trim()) params.set("q", filters.q.trim());
  if (filters.author) params.set("author", filters.author);
  if (filters.category) params.set("category", filters.category);
  if (filters.availability) params.set("available", filters.availability);

  const query = params.toString();
  const response = await fetch(
    `${API_BASE_URL}/api/books${query ? `?${query}` : ""}`,
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch catalog data: ${response.status}`);
  }
  return response.json();
}

async function fetchFacets(): Promise<CatalogFacets> {
  const response = await fetch(`${API_BASE_URL}/api/books/facets`);
  if (!response.ok) {
    throw new Error(`Failed to fetch facets: ${response.status}`);
  }
  return response.json();
}

async function createBook(payload: BookFormState): Promise<Book> {
  const response = await fetch(`${API_BASE_URL}/api/books`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      published_year: Number(payload.published_year),
    }),
  });
  if (!response.ok) {
    throw new Error(`Failed to create book: ${response.status}`);
  }
  return response.json();
}

async function updateBook(bookId: number, payload: BookFormState): Promise<Book> {
  const response = await fetch(`${API_BASE_URL}/api/books/${bookId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      published_year: Number(payload.published_year),
    }),
  });
  if (!response.ok) {
    throw new Error(`Failed to update book: ${response.status}`);
  }
  return response.json();
}

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [facets, setFacets] = useState<CatalogFacets | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [q, setQ] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [availability, setAvailability] = useState("");
  const [form, setForm] = useState<BookFormState>(EMPTY_FORM);

  const activeFilters = useMemo(
    () => ({ q, author, category, availability }),
    [q, author, category, availability],
  );

  function resetForm(): void {
    setForm(EMPTY_FORM);
    setEditingId(null);
  }

  async function loadCatalog(filters = activeFilters): Promise<void> {
    const [booksData, facetsData] = await Promise.all([
      fetchBooks(filters),
      fetchFacets(),
    ]);
    setBooks(booksData);
    setFacets(facetsData);
  }

  function startEdit(book: Book): void {
    setEditingId(book.id);
    setForm({
      title: book.title,
      author: book.author,
      category: book.category,
      published_year: String(book.published_year),
      available: book.available,
    });
  }

  function canSubmitForm(value: BookFormState): boolean {
    return (
      value.title.trim().length > 0 &&
      value.author.trim().length > 0 &&
      value.category.trim().length > 0 &&
      /^\d{4}$/.test(value.published_year)
    );
  }

  async function handleFilterSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await loadCatalog();
    } catch {
      setError("No se pudo cargar el catalogo. Revisa la API de backend.");
    } finally {
      setLoading(false);
    }
  }

  async function handleBookSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmitForm(form)) {
      setError("Completa titulo, autor, categoria y un ano valido (4 digitos).");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      if (editingId === null) {
        await createBook(form);
      } else {
        await updateBook(editingId, form);
      }
      resetForm();
      await loadCatalog();
    } catch {
      setError("No se pudo guardar el libro. Intentalo nuevamente.");
    } finally {
      setSubmitting(false);
    }
  }

  useEffect(() => {
    loadCatalog()
      .catch(() => {
        setError("No se pudo cargar el catalogo. Revisa la API de backend.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [activeFilters]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30 text-foreground">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6">
          <header className="rounded-2xl border border-border/70 bg-card/95 p-6 shadow-sm">
            <h1 className="text-2xl font-semibold tracking-tight">
              Catalogo de Biblioteca Comunitaria
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Busca, filtra y administra libros, autores y categorias en un solo lugar.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-secondary px-3 py-1 text-secondary-foreground">
                Total libros: {facets?.total_books ?? "-"}
              </span>
              <span className="rounded-full bg-secondary px-3 py-1 text-secondary-foreground">
                Disponibles: {facets?.available_books ?? "-"}
              </span>
            </div>
          </header>

          {error ? (
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive-foreground">
              {error}
            </div>
          ) : null}

          <section className="rounded-2xl border border-border/70 bg-card p-5">
            <h2 className="mb-4 text-base font-semibold">Filtros de catalogo</h2>
            <form
              className="grid grid-cols-1 gap-3 md:grid-cols-5"
              onSubmit={handleFilterSubmit}
            >
              <input
                value={q}
                onChange={(event) => setQ(event.target.value)}
                placeholder="Buscar por titulo, autor o categoria"
                className="rounded-md border border-input bg-background px-3 py-2 text-sm md:col-span-2"
              />
              <select
                value={author}
                onChange={(event) => setAuthor(event.target.value)}
                className="rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Todos los autores</option>
                {(facets?.authors ?? []).map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Todas las categorias</option>
                {(facets?.categories ?? []).map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <select
                value={availability}
                onChange={(event) => setAvailability(event.target.value)}
                className="rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Disponibles y prestados</option>
                <option value="true">Solo disponibles</option>
                <option value="false">Solo prestados</option>
              </select>
              <button
                type="submit"
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground md:col-start-5"
              >
                Aplicar filtros
              </button>
            </form>
          </section>

          <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div className="rounded-2xl border border-border/70 bg-card p-5 xl:col-span-2">
              <h2 className="mb-4 text-base font-semibold">Listado de libros</h2>
              {loading ? (
                <p className="text-sm text-muted-foreground">Cargando catalogo...</p>
              ) : books.length === 0 ? (
                <p className="text-sm text-muted-foreground">No hay libros con los filtros actuales.</p>
              ) : (
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {books.map((book) => (
                    <article
                      key={book.id}
                      className="rounded-xl border border-border/70 bg-background p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-sm font-semibold leading-tight">{book.title}</h3>
                          <p className="mt-1 text-xs text-muted-foreground">{book.author}</p>
                        </div>
                        <span
                          className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                            book.available
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {book.available ? "Disponible" : "Prestado"}
                        </span>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                        <span>{book.category}</span>
                        <span>{book.published_year}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => startEdit(book)}
                        className="mt-4 rounded-md border border-input px-3 py-1.5 text-xs font-medium"
                      >
                        Editar
                      </button>
                    </article>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-border/70 bg-card p-5">
              <h2 className="text-base font-semibold">
                {editingId === null ? "Registrar libro" : `Editar libro #${editingId}`}
              </h2>
              <form className="mt-4 flex flex-col gap-3" onSubmit={handleBookSubmit}>
                <input
                  value={form.title}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, title: event.target.value }))
                  }
                  placeholder="Titulo"
                  className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
                <input
                  value={form.author}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, author: event.target.value }))
                  }
                  placeholder="Autor"
                  className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
                <input
                  value={form.category}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, category: event.target.value }))
                  }
                  placeholder="Categoria"
                  className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
                <input
                  value={form.published_year}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, published_year: event.target.value }))
                  }
                  placeholder="Ano de publicacion"
                  inputMode="numeric"
                  className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
                <label className="flex items-center gap-2 text-sm text-muted-foreground">
                  <input
                    type="checkbox"
                    checked={form.available}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, available: event.target.checked }))
                    }
                  />
                  Disponible para prestamo
                </label>
                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-70"
                  >
                    {submitting
                      ? "Guardando..."
                      : editingId === null
                        ? "Crear libro"
                        : "Guardar cambios"}
                  </button>
                  {editingId !== null ? (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="rounded-md border border-input px-4 py-2 text-sm"
                    >
                      Cancelar
                    </button>
                  ) : null}
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default App;
