# Funcionalidad: Desatomizar App.tsx

## Objetivo
Refactorizar la pantalla de catalogo para reducir complejidad en App, separando UI, tipos y acceso a API, sin cambiar el comportamiento funcional actual.

## Alcance
- Separar la barra de filtros en un componente dedicado.
- Separar el listado de libros en un componente dedicado.
- Separar el formulario de alta y edicion en un componente dedicado.
- Mover tipos e interfaces del dominio catalogo a un modulo de tipos.
- Mover llamadas fetch de catalogo a un modulo de API.
- Mantener la logica de estado y orquestacion principal en App.

## No alcance
- No cambiar endpoints de backend.
- No cambiar diseno visual de la pantalla.
- No introducir librerias nuevas de estado o data fetching.
- No modificar reglas de negocio actuales.

## Diseno propuesto

### 1) Tipos de dominio
Definir tipos de catalogo en un archivo dedicado con nombres en PascalCase y propiedades segun contrato backend:
- Book
- CatalogFacets
- BookFormState
- BookFilters

Referencia de contrato backend:
- GET /api/books
- GET /api/books/facets
- POST /api/books
- PUT /api/books/{book_id}

### 2) Capa API
Crear modulo de API para encapsular fetch y serializacion:
- getBooks(filters)
- getCatalogFacets()
- createBook(payload)
- updateBook(bookId, payload)

Reglas:
- Construir query params en un solo punto.
- Normalizar manejo de errores de red y status no OK.
- Convertir published_year a numero al enviar payload cuando aplique.

### 3) Componentes UI
Separar en 3 componentes:

- Filtros
Responsabilidad:
- Render de inputs/selects de busqueda.
- Emision de cambios y submit.

Props minimas:
- filters
- facets
- onChangeFilter
- onSubmit
- isLoading

- Listado de libros
Responsabilidad:
- Render de estado vacio, carga y lista.
- Emision de evento editar.

Props minimas:
- books
- isLoading
- onEdit

- Formulario de libro
Responsabilidad:
- Render y edicion de campos.
- Validacion visual basica.
- Submit de crear/editar y cancelar edicion.

Props minimas:
- form
- editingId
- isSubmitting
- onChangeField
- onSubmit
- onCancel
- canSubmit

### 4) App como orquestador
App mantiene:
- Estado global de pantalla.
- Handlers de eventos.
- useEffect de carga inicial y recarga.
- Integracion entre componentes y capa API.

## Criterios de aceptacion
- App reduce su tamano y complejidad al delegar UI y fetch.
- Filtros siguen funcionando igual que antes.
- Listado muestra carga, vacio y resultados igual que antes.
- Crear libro funciona y refresca listado.
- Editar libro funciona y refresca listado.
- Cancelar edicion restablece formulario.
- Errores de carga/guardado se muestran como actualmente.
- No hay cambios de comportamiento visibles para usuario final.

## Validacion recomendada
- Probar flujo manual completo con backend levantado:
- Carga inicial.
- Filtrar por texto, autor, categoria y disponibilidad.
- Crear libro.
- Editar libro.
- Cancelar edicion.
- Verificar que tipos y naming respeten reglas del repositorio.
