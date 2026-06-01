export interface BookDto {
  id: number;
  title: string;
  author: string;
  category: string;
  published_year: number;
  available: boolean;
}

export interface CatalogFacetsDto {
  authors: string[];
  categories: string[];
  total_books: number;
  available_books: number;
}

export interface GetBooksFilters {
  q: string;
  author: string;
  category: string;
  availability: string;
}

export interface CreateBookPayloadDto {
  title: string;
  author: string;
  category: string;
  published_year: number;
  available: boolean;
}

export type UpdateBookPayloadDto = Partial<CreateBookPayloadDto>;
