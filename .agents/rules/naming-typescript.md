# Reglas de Naming en TypeScript/TSX

## Reglas

1. Interfaces y tipos en PascalCase
- Usar nombres de dominio en PascalCase para interface y type.
- Evitar abreviaturas ambiguas.
- Ejemplos: Book, CatalogFacets, BookFormState, FinancialMovement, KPIMetrics, MonthlyDataPoint, OperationType.

2. Componentes React en PascalCase
- Todo componente React debe nombrarse en PascalCase.
- El nombre del archivo de componente debe coincidir con el nombre del componente principal.
- Ejemplo: App en App.tsx.

3. Funciones y variables en camelCase
- Usar camelCase para funciones, parametros, variables locales y propiedades internas.
- Los nombres deben describir accion o significado de dominio.
- Ejemplos: fetchBooks, loadCatalog, startEdit, formatPercent.

4. Constantes de modulo en UPPER_SNAKE_CASE
- Usar UPPER_SNAKE_CASE para constantes de modulo que representen configuracion o valores inmutables compartidos.
- Mantener camelCase para constantes locales de bloque o funcion.
- Ejemplos: API_BASE_URL, EMPTY_FORM.

5. Setters de estado React con prefijo set
- Los setters de useState deben usar el patron set + NombreEnPascalCase del estado.
- Ejemplos: books/setBooks, editingId/setEditingId, availability/setAvailability.

6. Handlers de eventos con prefijo handle
- Las funciones de eventos de UI deben iniciar con handle.
- Ejemplos: handleFilterSubmit, handleBookSubmit.

7. Predicados o validaciones con prefijo semantico
- Las funciones booleanas deben iniciar con can, is, has o should segun corresponda.
- Ejemplo: canSubmitForm.

8. Archivos utilitarios y de dominio en kebab-case
- Usar kebab-case descriptivo en archivos utilitarios y de dominio.
- Ejemplos: financial-types.ts, financial-utils.ts, mock-data.ts.

9. Archivo de componente en PascalCase
- En componentes de UI, preferir archivo en PascalCase para el componente principal.
- Ejemplo: App.tsx.

10. Literales de union string en lowercase o formatos de negocio
- Usar lowercase en unions de string de dominio general.
- Mantener formato oficial cuando el dominio lo requiera.
- Ejemplos: income, outcome, sales, operational.
- Excepcion valida: B2B, B2C.

11. Propiedades internas en camelCase y externas segun contrato
- En modelos internos, usar camelCase.
- Si un contrato externo exige snake_case, mantenerlo sin renombrar en la capa de transporte.
- Si se desea normalizar a camelCase, crear una capa de mapeo explicita en un solo punto.

## Convencion recomendada para nuevas contribuciones

- Mantener PascalCase para tipos, interfaces y componentes.
- Mantener camelCase para funciones, variables y props locales.
- Reservar UPPER_SNAKE_CASE para constantes de modulo.
- Mantener prefijos handle para eventos y set para setters de estado.
- No convertir a camelCase campos que provienen del API en snake_case, salvo que exista una capa de mapeo explicita.

## Reglas de consistencia adicionales

1. Un solo idioma: inlges
- Elegir ingles para todos modulo y mantener consistencia.

2. Sufijos de contexto recomendados
- En datos: usar sufijos como Data, Payload, Params cuando agreguen claridad.
- En estados de UI: usar isLoading, hasError, errorMessage para facilitar lectura.

3. Nombres en pruebas
- Casos de prueba con descripcion de comportamiento observable.
- Datos de prueba con nombres semanticos, por ejemplo sampleMovements, onlyOutcomes.

4. Evitar nombres debiles
- Evitar data, item, obj, tmp salvo en callbacks cortos y obvios.
- Preferir book, movement, filters, monthlyMap, metrics.

5. Evitar siglas no estandar
- Aceptar siglas de negocio establecidas como KPI, API, B2B, B2C.
- Evitar crear siglas nuevas sin documentacion.
