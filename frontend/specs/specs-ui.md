# Separacion de UI en componentes de dominio

## Contexto
La pantalla principal concentra hoy presentacion, estado y flujo de acciones en un unico archivo.
Se requiere dividir la UI de catalogo en componentes de dominio para reducir acoplamiento y facilitar mantenimiento.

## Objetivo
Separar la vista principal en componentes reutilizables y claros:
- CatalogHeader
- FiltersPanel
- BookList
- BookForm

El objetivo es mantener el comportamiento actual sin cambios funcionales.

## Alcance
Incluye:
- Extraccion de bloques JSX de App a componentes de dominio.
- Definicion de contratos de props para cada componente.
- Mantener App como contenedor de estado y orquestacion.
- Mantener los mensajes de error y flujo actual de carga/edicion.

No incluye:
- Cambio de endpoints backend.
- Rediseño visual mayor.
- Introduccion de nuevas funcionalidades.

## Reglas de arquitectura y naming
- Carpetas por dominio en kebab-case.
- Componentes en PascalCase.tsx.
- Estado y handlers en App en camelCase.
- Evitar crecimiento de App con nueva logica de presentacion.

Estructura objetivo sugerida:
- src/components/catalog/CatalogHeader.tsx
- src/components/catalog/FiltersPanel.tsx
- src/components/catalog/BookList.tsx
- src/components/catalog/BookForm.tsx

## Diseño tecnico

### App (contenedor)
Responsabilidades:
- Mantener estado global de pantalla: listado, facets, loading, error, submitting, formulario y modo edicion.
- Ejecutar casos de uso: carga de catalogo, aplicar filtros, crear, editar.
- Pasar props y callbacks a componentes hijos.

No debe:
- Contener JSX extenso de sub-vistas una vez completada la extraccion.

### CatalogHeader
Responsabilidades:
- Renderizar titulo, descripcion y metricas de facets.

Props sugeridas:
- facets: CatalogFacets | null

### FiltersPanel
Responsabilidades:
- Renderizar controles de filtros (q, author, category, availability).
- Emitir cambios por campo y submit.

Props sugeridas:
- q: string
- author: string
- category: string
- availability: string
- facets: CatalogFacets | null
- onQChange(value: string): void
- onAuthorChange(value: string): void
- onCategoryChange(value: string): void
- onAvailabilityChange(value: string): void
- onSubmit(event: FormEvent<HTMLFormElement>): void

### BookList
Responsabilidades:
- Renderizar estados de loading y lista vacia.
- Renderizar tarjetas de libros y boton de editar.

Props sugeridas:
- books: Book[]
- loading: boolean
- onEdit(book: Book): void

### BookForm
Responsabilidades:
- Renderizar formulario de alta/edicion.
- Emitir cambios de campos y submit/cancel.

Props sugeridas:
- value: BookFormState
- editingId: number | null
- submitting: boolean
- onChange(next: BookFormState): void
- onSubmit(event: FormEvent<HTMLFormElement>): void
- onCancel(): void

## Flujo de integracion
1. App renderiza CatalogHeader con facets actuales.
2. App renderiza FiltersPanel con filtros controlados y submit.
3. App renderiza BookList con books/loading y callback onEdit.
4. App renderiza BookForm con estado actual de formulario y acciones.
5. App sigue siendo el unico componente con efectos y llamadas a API.

## Criterios de aceptacion
- App queda limitado a orquestacion y composicion de componentes.
- Los 4 componentes de dominio existen y se usan en App.
- No hay regresiones en:
  - Carga inicial
  - Filtro por texto
  - Filtro por autor
  - Filtro por categoria
  - Filtro por disponibilidad
  - Crear libro
  - Editar libro
- Lint y build frontend sin errores.

## Riesgos y mitigacion
Riesgo:
- Props demasiado acopladas o verbosas.
Mitigacion:
- Mantener componentes presentacionales y sin side effects.

Riesgo:
- Regresiones al mover handlers y estados de formulario.
Mitigacion:
- Migrar por bloques (header, filtros, lista, formulario) y validar flujo manual al final.

## Pruebas recomendadas
Manual:
- Verificar carga inicial y facets.
- Aplicar cada filtro de forma independiente.
- Crear un libro y confirmar que aparece en lista.
- Editar un libro y confirmar persistencia visual de cambios.

Opcional automatizado:
- Tests de render para BookList (loading, empty, list).
- Tests de interaccion para FiltersPanel y BookForm.
