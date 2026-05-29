# Naming TypeScript

## Objetivo
Definir una convención de nombres TypeScript consistente con el estilo actual del proyecto para mejorar legibilidad, mantenibilidad y velocidad de revisión.

## Principios base
1. Priorizar nombres semánticos y de dominio sobre abreviaturas.
2. Mantener consistencia dentro del archivo y entre módulos relacionados.
3. Separar claramente nombres de modelo de dominio y nombres de transporte API.

## Reglas de nomenclatura

1. Usar `PascalCase` para tipos, interfaces y componentes.
   Ejemplos: `Book`, `CatalogFacets`, `BookFormState`, `FinancialMovement`, `App`.

2. Usar `camelCase` para funciones, variables, parámetros y propiedades internas.
   Ejemplos: `fetchBooks`, `loadCatalog`, `activeFilters`, `editingId`.

3. Usar `UPPER_SNAKE_CASE` para constantes de módulo que no cambian.
   Ejemplos: `API_BASE_URL`, `EMPTY_FORM`.

4. En React, nombrar estado y setter como pareja `x` + `setX`.
   Ejemplos: `books/setBooks`, `loading/setLoading`, `form/setForm`.

5. Para handlers de eventos UI, usar prefijo `handle`.
   Ejemplos: `handleFilterSubmit`, `handleBookSubmit`.

6. Para callbacks recibidos por props, usar prefijo `on`.
   Ejemplos sugeridos: `onSubmit`, `onCancel`, `onBookSelect`.

7. Para funciones de API, usar verbo + entidad.
   Ejemplos: `fetchBooks`, `fetchFacets`, `createBook`, `updateBook`.

8. Para tipos de estado/formulario local, usar sufijo `State`.
   Ejemplos: `BookFormState`, `FilterState`.

9. Colecciones en plural, elemento individual en singular.
   Ejemplos: `books` y `book`, `authors` y `author`.

10. Booleanos con forma afirmativa y legible.
    Ejemplos: `available`, `loading`, `submitting`, `canSubmitForm`.

## Reglas para modelos de datos (dominio vs API)

1. Mantener los nombres del contrato backend cuando la estructura se serializa directo.
   Ejemplo actual: `published_year`.

2. Si se introduce capa de mapeo, separar tipos de API y dominio explícitamente:
   - `ApiBook` para transporte (snake_case).
   - `Book` para UI/dominio (camelCase).
   - mappers con nombres `mapApiBookToBook` y `mapBookToApiBook`.

3. No mezclar en un mismo objeto campos snake_case y camelCase sin razón técnica documentada.

## Reglas de tipado

1. Evitar `any`; preferir tipos explícitos o `unknown` con narrowing.

2. Tipar retorno de funciones exportadas y helpers no triviales.
   Ejemplos: `computeKPIs(...): KPIMetrics`, `resetForm(): void`.

3. Usar `type` para uniones y aliases; `interface` para contratos de objeto extensibles.

4. Usar `type-only imports` para imports de solo tipos.
   Ejemplo: `import { type FinancialMovement } from "./financial-types";`

5. Evitar tipos implícitos ambiguos en estructuras intermedias; declarar `Record` o interfaces auxiliares cuando aplique.

## Reglas de nombres de archivos

1. Componentes React en `PascalCase.tsx`.
   Ejemplo: `App.tsx`.

2. Utilidades y tipos en `kebab-case.ts`.
   Ejemplos: `financial-utils.ts`, `financial-types.ts`.

3. Tests unitarios con sufijo `.test.ts` o `.test.tsx` junto al módulo probado.
   Ejemplo: `financial-utils.test.ts`.

## Consistencia de estilo

1. Mantener el estilo del archivo en edición (comillas, punto y coma, formato).

2. No introducir abreviaturas crípticas fuera de casos convencionales de corto alcance (`i`, `m`, `e` en loops/callbacks).

3. Identificadores de código en inglés de forma preferente; texto visible al usuario puede mantenerse en español.

## Ejemplos rápidos

1. Mejor: `loadCatalog`, peor: `loadData2`.
2. Mejor: `handleBookSubmit`, peor: `submit`.
3. Mejor: `books.map((book) => ...)`, peor: `books.map((b) => ...)` en bloques largos.
4. Mejor: `canSubmitForm`, peor: `submitFlag`.

## Checklist de PR

- [ ] Tipos e interfaces en `PascalCase`.
- [ ] Funciones y variables en `camelCase`.
- [ ] Constantes de módulo en `UPPER_SNAKE_CASE`.
- [ ] Parejas de estado React consistentes (`x` / `setX`).
- [ ] Handlers de UI con `handle*` y callbacks de props con `on*`.
- [ ] Sin `any` innecesario.
- [ ] Contratos API respetados (snake_case cuando aplique).
- [ ] Nombres de archivo alineados a su rol (`PascalCase.tsx` o `kebab-case.ts`).