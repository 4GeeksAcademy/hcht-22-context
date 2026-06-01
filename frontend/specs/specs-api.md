# Extracción de cliente API a src/services

## Contexto
La lógica HTTP del catálogo vive hoy en App.tsx y mezcla responsabilidades de UI, estado y acceso a datos.
Se requiere mover el cliente API a una capa de servicios para reducir acoplamiento y facilitar pruebas.

## Objetivo
Extraer las llamadas HTTP de catálogo hacia src/services, manteniendo el comportamiento actual de:
- listado
- facets
- filtros
- creación
- edición

## Alcance
Incluye:
- crear módulo de servicio para catálogo
- mover y tipar funciones de acceso API
- adaptar App.tsx para consumir el servicio

No incluye:
- rediseño de UI
- refactor de hooks/componentes
- cambios de endpoints backend

## Contrato backend vigente
Endpoints:
- GET /api/books
- GET /api/books/facets
- POST /api/books
- PUT /api/books/{book_id}

Base URL:
- VITE_API_BASE_URL o cadena vacía

## Estructura objetivo
- src/services/catalog/books-api.ts
- src/services/catalog/catalog-types.ts
- src/services/catalog/index.ts

Opcional fase 2:
- src/services/catalog/catalog-mappers.ts
- src/services/http/http-client.ts

## Diseño técnico

### Tipos
En catalog-types.ts definir:
- BookDto
- CatalogFacetsDto
- GetBooksFilters
- CreateBookPayloadDto
- UpdateBookPayloadDto

Nota:
- snake_case permitido solo en DTOs API.

### API pública del servicio
books-api.ts exporta:
- getBooks(filters: GetBooksFilters): Promise<BookDto[]>
- getCatalogFacets(): Promise<CatalogFacetsDto>
- createBook(payload: CreateBookPayloadDto): Promise<BookDto>
- updateBook(bookId: number, payload: UpdateBookPayloadDto): Promise<BookDto>

### Reglas de implementación
- Resolver base URL en un único punto.
- Construir query params de filtros con URLSearchParams.
- Validar response.ok en todas las requests.
- Lanzar errores con mensajes consistentes por operación.

## Cambios esperados en App
- Eliminar fetchBooks, fetchFacets, createBook, updateBook locales.
- Importar funciones desde src/services/catalog.
- Mantener mensajes de error de UI actuales.
- Mantener flujo loadCatalog con Promise.all.

## Criterios de aceptación
- App.tsx sin llamadas directas a fetch para catálogo.
- Integración funcional sin regresiones:
  - carga inicial
  - filtro por texto/autor/categoría/disponibilidad
  - crear libro
  - editar libro
- Lint y build sin errores.

## Pruebas recomendadas
Manual:
- validar carga, filtros, creación y edición.

Automatizadas:
- tests unitarios de books-api:
  - serialización de filtros
  - manejo de errores HTTP
  - parseo de respuestas JSON

## Riesgos y mitigación
Riesgo:
- ruptura de tipos al mover funciones.
Mitigación:
- introducir tipos en servicio y adaptar App gradualmente.

Riesgo:
- persistencia de snake_case en UI.
Mitigación:
- fase 2 con mappers DTO a modelo UI camelCase.
