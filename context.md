# Contexto del proyecto

## Resumen ejecutivo
Este repositorio contiene una aplicacion full-stack de catalogo bibliografico comunitario.
La solucion permite listar, filtrar, crear y editar libros desde una SPA en React, consumiendo una API REST en FastAPI.

## Alcance funcional actual
- Consulta de catalogo con filtros por texto, autor, categoria y disponibilidad.
- Visualizacion de facets del catalogo (autores, categorias, totales y disponibles).
- Alta de libros via formulario.
- Edicion de libros existentes via formulario.
- Persistencia en memoria del backend (sin base de datos).

## Stack tecnologico

### Backend
- Python 3.13
- FastAPI + Pydantic
- Uvicorn
- Pruebas con pytest y TestClient
- Detalle: [memory-bank/architecture-backend.md](memory-bank/architecture-backend.md)

### Frontend
- React 19 + TypeScript + Vite
- Tailwind CSS v4
- Aplicacion montada en un unico componente principal (`App.tsx`)
- Detalle: [memory-bank/architecture-frontend.md](memory-bank/architecture-frontend.md)

### Orquestacion
- Docker Compose con dos servicios:
  - `frontend` en puerto `5173`
  - `backend` en puerto `8000`
- Puerto `5678` expuesto en backend para debug remoto.
- Vite proxy enruta `/api` a `http://backend:8000`.

## Arquitectura y flujo

### Flujo de datos
1. El frontend solicita listado y facets al backend.
2. La API aplica filtros en memoria sobre `BOOKS`.
3. El frontend renderiza tarjetas de libros y contadores.
4. Al crear/editar, el frontend invoca `POST` o `PUT` y vuelve a cargar datos.

### API disponible
- `GET /health`
- `GET /api/books`
- `GET /api/books/facets`
- `POST /api/books`
- `PUT /api/books/{book_id}`

## Pruebas

### Backend
- Cobertura funcional presente para healthcheck, listado ordenado, filtros, facets, creacion y actualizacion.

### Frontend
- No hay pruebas activas para la UI de catalogo actual.

## Riesgos y deuda tecnica
- Persistencia en memoria: los cambios se pierden al reiniciar el servicio backend.
- Falta de separacion por capas en frontend: logica de datos y presentacion viven en `App.tsx`.
- Sin suite de pruebas frontend para los flujos actuales (filtros, alta y edicion).

## Conclusiones
El proyecto esta funcional y enfocado en aprendizaje full-stack con una base simple de mantenimiento.
El siguiente salto de madurez recomendado es dividir el frontend por modulos (servicios, hooks y componentes) y agregar pruebas para los flujos de usuario actuales.