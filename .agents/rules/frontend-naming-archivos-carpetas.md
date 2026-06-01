# Regla: naming de archivos y carpetas en frontend

## Objetivo
Definir una convencion unica para nombrar carpetas y archivos del frontend, mejorando legibilidad, navegacion y consistencia.

## Alcance
Aplica a todo el codigo dentro de `frontend/src` y a nuevos modulos del frontend.

## Convencion
1. Carpetas en kebab-case y por dominio de negocio.
2. Componentes React en PascalCase.tsx.
3. Hooks con prefijo use y archivo en camelCase (ejemplo: useCatalog.ts).
4. Servicios de API en kebab-case (ejemplo: books-api.ts).
5. DTOs de API en kebab-case con sufijo -dto (ejemplo: book-dto.ts).
6. Modelos de UI en kebab-case sin sufijo dto (ejemplo: book.ts).
7. Tests con nombre espejo + sufijo .test (ejemplo: BookCard.test.tsx, useCatalog.test.ts).

## Estructura sugerida
- components/catalog/
- hooks/catalog/
- services/catalog/
- types/catalog/

## Ejemplos
- Correcto: components/catalog/BookCard.tsx
- Correcto: hooks/catalog/useCatalog.ts
- Correcto: services/catalog/books-api.ts
- Correcto: types/catalog/book-dto.ts
- Incorrecto: components/catalog/book-card.tsx
- Incorrecto: hooks/catalog/catalogHook.ts
- Incorrecto: services/catalog/booksApi.ts

## Restricciones
- No mezclar componentes, hooks y servicios en la misma carpeta sin criterio de dominio.
- No usar nombres genericos como misc, helpers2 o temp.
- No usar snake_case para nombres de archivo en frontend, excepto cuando lo exija una herramienta externa.
