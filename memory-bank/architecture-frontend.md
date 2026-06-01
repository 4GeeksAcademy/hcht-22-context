# Arquitectura Frontend

## Resumen
El frontend es una SPA en React + TypeScript que implementa la gestion de catalogo bibliografico.
Actualmente la mayor parte de la logica de UI y de integracion HTTP vive en un unico archivo: `frontend/src/App.tsx`.

## Stack y herramientas
- React 19
- TypeScript
- Vite 8
- Tailwind CSS v4
- ESLint

## Estructura relevante
- `frontend/src/main.tsx`: punto de entrada y render de `App`.
- `frontend/src/App.tsx`: vista principal, estado de UI, llamadas a API y formularios.
- `frontend/src/index.css`: tokens de tema y estilos base con Tailwind.
- `frontend/src/lib/utils.ts`: helper `cn` (actualmente sin uso).

## Estado arquitectonico actual

### Patrón principal
Componente contenedor unico (monolito de presentacion + estado + acceso a datos):
- Define tipos locales de dominio (`Book`, `CatalogFacets`, `BookFormState`).
- Define funciones de acceso a API (`fetchBooks`, `fetchFacets`, `createBook`, `updateBook`).
- Gestiona estado de filtros, listado, errores y formulario.
- Renderiza todo el layout y las interacciones.

### Flujo de datos en UI
1. Al cargar la pantalla, `useEffect` invoca `loadCatalog`.
2. `loadCatalog` ejecuta en paralelo:
	- `GET /api/books`
	- `GET /api/books/facets`
3. Se actualizan estados `books` y `facets`.
4. Acciones de usuario:
	- Filtros: submit -> recarga catalogo.
	- Crear: submit -> `POST /api/books` -> recarga.
	- Editar: submit -> `PUT /api/books/{id}` -> recarga.

## Contrato con backend

### Endpoints consumidos
- `GET /api/books`
- `GET /api/books/facets`
- `POST /api/books`
- `PUT /api/books/{book_id}`

### Base URL
- `VITE_API_BASE_URL` (si existe) o cadena vacia.
- En desarrollo con Docker Compose se usa proxy de Vite para `/api` hacia backend.

## Riesgos y mejoras recomendadas

### Riesgos
- Alto acoplamiento: una sola pantalla concentra demasiadas responsabilidades.
- Repeticion de manejo de errores y estados de carga.
- Ausencia de pruebas de frontend para flujos actuales.

### Mejores siguientes pasos
1. Extraer cliente API a `services` o `lib/api`.
2. Extraer logica de estado a hooks (`useCatalog`, `useBookForm`).
3. Dividir la UI en componentes de dominio (`CatalogHeader`, `FiltersPanel`, `BookList`, `BookForm`).
4. Agregar pruebas de comportamiento (al menos filtros, creacion y edicion).

## Notas de mantenimiento
- Documentar cualquier cambio de endpoints en este archivo y en `context.md` para evitar deriva documental.
