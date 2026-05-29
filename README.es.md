# Catálogo de Biblioteca Comunitaria

_Aplicación de catálogo de biblioteca comunitaria con frontend en React + TypeScript y backend en FastAPI._

## Pasos recomendados

1. Haz un fork de este repositorio a tu cuenta.
2. Abre tu fork en GitHub Codespaces o clónalo y ejecútalo en tu entorno local.
3. Ejecuta tu agente de IA para inspeccionar frontend y backend.
4. Documenta las reglas propuestas y el banco de memoria en tu fork.
5. Ajusta y valida las reglas hasta que sean aplicables al flujo real del proyecto.

| Concepto|	Dónde se aplica|
|-|-|
|Exploración de código con IA	| Fase 1: generar y validar un resumen del proyecto |
|Análisis de prácticas de ingeniería	| Fase 2: identificar patrones buenos y malos |
|Reglas de repositorio (.agents/rules)	| Fase 3: escribir archivos de gobernanza accionables |
|Documentación del memory bank	| Fase 4: descripción del producto, stack tecnológico, estado actual |
|Disciplina de commits|	Un commit por fase, sin mega-commits agrupados |

## Estructura esperada del directorio para agentes

```text
./.agents
└─ /rules
   └─ <nombre-regla>.md
└─ memory-bank/
   ├── architecture.md
   ├── product-context.md
   └── README.md
```

## Cómo ejecutar en local

```bash
docker compose up --build
```

El frontend usa por defecto el proxy de Vite para `/api`, así que no necesitas variables de entorno extra ni en desarrollo local ni en Codespaces.
Si necesitas apuntar a otro backend, copia `frontend/.env.example` como `.env` y define `VITE_API_BASE_URL`.

- Frontend: http://localhost:5173
- Backend: http://localhost:8000
- Documentación API: http://localhost:8000/docs

---

Este y muchos otros proyectos son construidos por estudiantes como parte de los [Coding Bootcamps](https://4geeksacademy.com/) de 4Geeks Academy. Encuentra más acerca de los [cursos](https://4geeksacademy.com/es/comparar-programas) de [Ingeniería de IA](https://4geeksacademy.com/es/coding-bootcamps/ingenieria-ia), [Data Science & Machine Learning](https://4geeksacademy.com/es/coding-bootcamps/curso-datascience-machine-learning), [Ciberseguridad](https://4geeksacademy.com/es/coding-bootcamps/curso-ciberseguridad) y [Full-Stack Software Developer con IA](https://4geeksacademy.com/es/coding-bootcamps/programador-full-stack).
