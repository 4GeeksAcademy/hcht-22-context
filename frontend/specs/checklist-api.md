# Checklist de implementación

## Preparación
- [ ] Crear estructura src/services/catalog
- [ ] Crear archivo de tipos catalog-types.ts
- [ ] Crear archivo de cliente books-api.ts
- [ ] Crear barrel index.ts

## Migración
- [ ] Mover lógica de GET /api/books
- [ ] Mover lógica de GET /api/books/facets
- [ ] Mover lógica de POST /api/books
- [ ] Mover lógica de PUT /api/books/{book_id}
- [ ] Reemplazar uso de funciones locales en App.tsx por imports del servicio
- [ ] Eliminar funciones locales HTTP en App.tsx

## Validación funcional
- [ ] Carga inicial del catálogo
- [ ] Filtro por texto
- [ ] Filtro por autor
- [ ] Filtro por categoría
- [ ] Filtro por disponibilidad
- [ ] Crear libro
- [ ] Editar libro

## Calidad
- [ ] Ejecutar lint frontend
- [ ] Ejecutar build frontend
- [ ] Verificar que no hay cambios de contrato API
