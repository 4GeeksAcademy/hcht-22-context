# React Components

## Objetivo
Estandarizar definición y uso de componentes React para mejorar mantenibilidad, accesibilidad, rendimiento y consistencia del frontend.

## Principios
1. Componentes pequeños, cohesionados y orientados a una responsabilidad.
2. UI declarativa con separación clara entre estado, efectos y presentación.
3. Accesibilidad como requisito base.
4. Optimización solo cuando exista evidencia de costo real.

## Definición de componentes

1. Un componente por archivo en PascalCase.
2. Tipar props con interface o type explícito.
3. Evitar props excesivas; si crecen mucho, dividir componente.
4. No incluir lógica de negocio compleja en JSX.
5. Extraer cálculos complejos a helpers o hooks.
6. Evitar estado duplicado derivable de props o de otro estado.
7. Inicializar estado con valores seguros para evitar null checks innecesarios.
8. Mantener handlers nombrados con prefijo handle y callbacks de props con prefijo on.
9. Evitar componentes de más de 200-250 líneas; considerar partición.

## Uso de hooks y efectos

1. Respetar reglas de hooks sin excepciones.
2. useEffect solo para efectos reales, no para lógica derivable.
3. Incluir cleanup cuando haya listeners, timers o fetch activos.
4. En fetch, prevenir race conditions con cancelación o control de request activa.
5. Evitar dependencias inestables en effects; memoizar cuando corresponda.

## Uso de componentes

1. Evitar prop drilling profundo; usar composición o context cuando aplique.
2. Evitar crear funciones/objetos pesados inline en árboles grandes.
3. Modelar explícitamente estados de carga, error y vacío.
4. Reutilizar componentes presentacionales para patrones repetidos.
5. Mantener contratos de props estables y documentados por tipos.

## Accesibilidad y UX

1. Todo input debe tener label asociado.
2. Botones e íconos accionables con nombre accesible.
3. Manejar focus visible y navegación por teclado.
4. Mensajes de error claros y cercanos al campo o acción.
5. Contraste y semántica HTML correctos en elementos interactivos.

## Testing de componentes

1. Priorizar pruebas de comportamiento visible para usuario.
2. Cubrir carga, error, vacío e interacción principal.
3. Evitar snapshots masivos sin intención clara.
4. Mockear red en pruebas de integración de UI.

## Checklist de PR

- [ ] Props tipadas y legibles.
- [ ] Sin lógica compleja inline en JSX.
- [ ] useEffect con dependencias y cleanup correctos.
- [ ] Estados loading/error/empty cubiertos.
- [ ] Inputs y controles accesibles.
- [ ] Tests de interacción para flujos críticos.