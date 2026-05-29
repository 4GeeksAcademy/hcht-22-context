# Contexto del proyecto

## Resumen ejecutivo
Este repositorio implementa una aplicacion full-stack llamada **Community Library Catalog** (Catalogo de Biblioteca Comunitaria).
Permite consultar, filtrar y administrar un catalogo de libros mediante un frontend React y una API en FastAPI.

## Que realiza el proyecto
- Muestra un listado de libros de una biblioteca comunitaria.
- Permite filtrar por texto libre (`q`), autor, categoria y disponibilidad.
- Expone estadisticas simples del catalogo (total de libros y disponibles).
- Permite crear libros nuevos.
- Permite editar libros existentes (actualizacion parcial por `PUT`).

## Stack tecnologico

### Backend
- Lenguaje: Python 3.13 (imagen `python:3.13-slim`).
- Framework API: FastAPI.
- Servidor ASGI: Uvicorn (`uvicorn[standard]`).
- Debug remoto: `debugpy` (puerto 5678 expuesto).
- Testing: `pytest`, `pytest-cov`, `httpx`, `fastapi.testclient`.

### Frontend
- Framework: React 19 + TypeScript.
- Bundler/dev server: Vite 8.
- Estilos: Tailwind CSS v4 (via `@tailwindcss/vite`) + variables CSS (OKLCH).
- Tooling: ESLint (flat config), TypeScript, Vitest.
- Librerias incluidas: `recharts`, `lucide-react`, `clsx`, `tailwind-merge`, `class-variance-authority`.

### Orquestacion y entorno
- Docker Compose con 2 servicios:
  - `frontend` en `5173`.
  - `backend` en `8000` (+ `5678` para debug).
- El frontend usa proxy Vite para `/api` hacia `http://backend:8000`.

## Arquitectura y flujo

### Backend (API REST en memoria)
La API mantiene un arreglo global de libros semilla en memoria (`BOOKS`), sin base de datos persistente.

Endpoints principales:
- `GET /health`: healthcheck.
- `GET /api/books`: lista libros con filtros `q`, `author`, `category`, `available`, y `limit`.
- `GET /api/books/facets`: devuelve autores, categorias y totales del catalogo.
- `POST /api/books`: crea libro y asigna `id` incremental.
- `PUT /api/books/{book_id}`: actualiza campos del libro existente.

Validaciones:
- Pydantic define limites de longitud y rangos (`published_year` entre 1450 y 2100).
- Si no existe un libro solicitado para update, retorna 404.

### Frontend (SPA)
La aplicacion principal (`App.tsx`) maneja:
- Estado de filtros y formulario.
- Carga inicial y recarga por cambios de filtros.
- Fetch concurrente de libros + facets (`Promise.all`).
- Manejo de errores y estados de carga/envio.
- Modo creacion y modo edicion de libros.

Interfaz:
- Header con KPIs basicos del catalogo.
- Panel de filtros.
- Grid de tarjetas de libros.
- Formulario lateral para alta/edicion.

## Pruebas y cobertura funcional

### Backend
Las pruebas cubren:
- Healthcheck.
- Ordenamiento en listado.
- Filtros combinados.
- Facets.
- Creacion de libros.
- Actualizacion de libros.

### Frontend
Hay pruebas unitarias enfocadas en utilidades financieras (`financial-utils.ts`):
- Calculo de KPIs (ingresos/egresos/beneficio).
- Agregacion mensual.
- Formateo de moneda y porcentaje.

## Observaciones de estado actual
- Existe una **inconsistencia de dominio**: el producto actual es un catalogo de biblioteca, pero en `frontend/src/lib` hay tipos, mocks y tests de analitica financiera que no se usan en `App.tsx`.
- El backend no persiste datos: al reiniciar el contenedor/proceso, el catalogo vuelve al seed inicial.
- `README.md` (ingles) es minimo y delega casi todo a `README.es.md`.

## Conclusiones
Proyecto educativo full-stack, bien enfocado para practicar integracion React + FastAPI, filtros, formularios y pruebas basicas.
Actualmente funcional como CRUD parcial (listar, filtrar, crear, actualizar) con almacenamiento en memoria y una UI util para operaciones simples de catalogo.