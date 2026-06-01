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
- Resumen: una API en FastAPI
- [Detalle](./memory-bank/arqueture-backend.md)

### Frontend
- Resumen: Una aplicación en React con Typescript y Tailwind
- [Detalle](./memory-bank/arqueture-frontend.md)

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


## Observaciones de estado actual


## Conclusiones
Proyecto educativo full-stack, bien enfocado para practicar integracion React + FastAPI, filtros, formularios y pruebas basicas.
Actualmente funcional como CRUD parcial (listar, filtrar, crear, actualizar) con almacenamiento en memoria y una UI util para operaciones simples de catalogo.