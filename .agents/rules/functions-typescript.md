# Functions TypeScript

## Objetivo
Definir estándares para diseñar y usar funciones en TypeScript con foco en legibilidad, seguridad de tipos, testabilidad y bajo acoplamiento.

## Principios
1. Una función debe resolver una sola responsabilidad clara.
2. La firma debe expresar intención de negocio, no detalles internos.
3. Priorizar funciones puras y predecibles.
4. Evitar complejidad accidental mediante composición de funciones pequeñas.

## Definición de funciones

1. Nombrar funciones con verbo + entidad o acción + contexto.
2. Tipar explícitamente parámetros y retorno en funciones exportadas.
3. Evitar any. Usar unknown con narrowing cuando sea necesario.
4. Usar objeto de parámetros cuando hay 3 o más argumentos.
5. Limitar longitud: si supera 30-40 líneas, considerar dividir.
6. Evitar efectos secundarios ocultos.
7. No mutar argumentos de entrada; retornar nuevas estructuras.
8. En funciones async, manejar errores con contexto útil.
9. Validar entradas en límites del sistema (API, formularios, adapters).
10. Usar funciones auxiliares privadas para reducir anidación y ramas complejas.

## Uso de funciones

1. Reutilizar lógica en utilidades antes de duplicar bloques.
2. Evitar funciones inline complejas dentro de render de React.
3. Evitar llamar funciones costosas en cada render sin memoización.
4. Mantener consistencia de contratos: misma entrada, mismo comportamiento.
5. No mezclar transformación de datos con I/O en una misma función si puede separarse.
6. Para operaciones de red, encapsular fetch en funciones dedicadas por dominio.
7. Propagar errores con mensajes accionables y trazables.

## Tipado recomendado

1. type para unions y aliases; interface para contratos extensibles.
2. Generic solo cuando aporta reutilización real.
3. Evitar sobrecarga innecesaria; preferir firmas claras y explícitas.
4. Para resultados inciertos, preferir tipos de resultado explícitos en vez de null ambiguo.

## Testing de funciones

1. Cubrir casos felices, bordes y errores.
2. Testear funciones puras de forma aislada.
3. Evitar tests acoplados a implementación interna.
4. Incluir casos de fechas, redondeos y locale cuando aplique.

## Checklist de PR

- [ ] Funciones exportadas con retorno tipado.
- [ ] Sin any innecesario.
- [ ] Sin mutación de argumentos.
- [ ] Sin funciones largas o multi-responsabilidad.
- [ ] Errores manejados con contexto.
- [ ] Tests para casos borde y error.