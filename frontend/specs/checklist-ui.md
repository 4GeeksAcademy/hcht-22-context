# Checklist de implementacion UI

## Preparacion
- [ ] Crear carpeta src/components/catalog
- [ ] Definir contratos de props para CatalogHeader, FiltersPanel, BookList y BookForm
- [ ] Confirmar tipos compartidos usados por los componentes

## Extraccion de componentes
- [ ] Crear CatalogHeader.tsx
- [ ] Mover bloque de header desde App a CatalogHeader
- [ ] Crear FiltersPanel.tsx
- [ ] Mover bloque de filtros desde App a FiltersPanel
- [ ] Crear BookList.tsx
- [ ] Mover bloque de listado desde App a BookList
- [ ] Crear BookForm.tsx
- [ ] Mover bloque de formulario desde App a BookForm

## Integracion en App
- [ ] Reemplazar JSX inline por componentes de dominio
- [ ] Pasar props y callbacks necesarios a cada componente
- [ ] Mantener handlers y estado en App como contenedor
- [ ] Verificar que no se rompa el flujo de edicion y reset de formulario

## Validacion funcional
- [ ] Carga inicial del catalogo
- [ ] Filtro por texto
- [ ] Filtro por autor
- [ ] Filtro por categoria
- [ ] Filtro por disponibilidad
- [ ] Crear libro
- [ ] Editar libro
- [ ] Cancelar edicion

## Calidad
- [ ] Ejecutar lint frontend
- [ ] Ejecutar build frontend
- [ ] Revisar que App quede mas pequeno y orientado a orquestacion
