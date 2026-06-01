# Regla: Naming en Frontend

## Objetivo
Definir una convencion unica para nombres en React + TypeScript y evitar mezcla de estilos entre UI y API.

## Alcance
Aplica a todo el codigo en frontend/src.

## Regla principal
1. Usar PascalCase para componentes React y tipos de dominio de UI.
2. Usar camelCase para variables, funciones, handlers, estado y hooks.
3. Usar UPPER_SNAKE_CASE para constantes globales/inmutables de modulo.
4. Permitir snake_case solo en DTOs crudos de API.

## Convencion UI vs API
- Objetos de API deben terminar en sufijo Dto cuando mantengan snake_case.
- Modelos internos de UI no usan sufijo Dto y deben estar en camelCase.
- Todo dato de API debe mapearse a modelo UI antes de entrar a estado/props.

## Ejemplos
- Componente: CatalogHeader
- Hook: useCatalogFilters
- Handler: handleBookSubmit
- Constante: API_BASE_URL
- API (DTO): published_year
- UI (modelo): publishedYear

## Regla de oro
No mezclar snake_case de backend dentro del estado de React o props de componentes.
Primero transformar, luego renderizar.
