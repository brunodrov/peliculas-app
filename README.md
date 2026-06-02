# Sistema de Gestión de Películas

Aplicación web para gestionar una lista de películas personal. Permite agregar, editar, eliminar y puntuar películas, además de visualizar un reporte por género.

---

## Tecnologías utilizadas

- **Backend:** Node.js + Express.js
- **Frontend:** HTML, CSS y Vanilla JavaScript
- **Persistencia:** En memoria (array con seed inicial)
- **Arquitectura:** API REST Nivel 2 de Richardson

---

## Requisitos previos

Antes de ejecutar el proyecto, asegurate de tener instalado:

- [Node.js](https://nodejs.org) v18 o superior
- npm (viene incluido con Node.js)

---

## Instalación y ejecución

### 1. Clonar o descomprimir el proyecto

Si descargaste el .zip, descomprimilo en una carpeta de tu preferencia.

### 2. Instalar las dependencias del backend

Abrí una terminal, navegá a la carpeta `backend` y ejecutá:

```bash
cd backend
npm install
```

### 3. Iniciar el servidor

Dentro de la carpeta `backend` ejecutá:

```bash
npm run dev
```

Deberías ver en la terminal:
Servidor corriendo en http://localhost:3000

### 4. Abrir el frontend

Abrí el archivo `frontend/index.html` en tu navegador. Se recomienda usar la extensión **Live Server** de VS Code para evitar problemas de CORS.

---

## Estructura del proyecto

peliculas-app/
├── backend/
│   ├── data/
│   │   └── peliculas.js       → datos en memoria (seed)
│   ├── routes/
│   │   └── peliculas.js       → endpoints de la API
│   ├── index.js               → punto de entrada del servidor
│   └── package.json           → configuración y scripts
│
├── frontend/
│   ├── index.html             → página principal
│   ├── reporte.html           → página de reporte
│   ├── styles.css             → estilos
│   ├── app.js                 → lógica del frontend
│   └── reporte.js             → lógica del reporte
│
└── README.md

---

## Scripts disponibles

Desde la carpeta `backend/`:

| Script | Comando | Descripción |
|---|---|---|
| Producción | `npm start` | Inicia el servidor con Node |
| Desarrollo | `npm run dev` | Inicia el servidor con nodemon (reinicio automático) |

---

## Documentación de la API

**Base URL:** `http://localhost:3000`

| Método | Endpoint | Descripción | Status Codes |
|---|---|---|---|
| GET | `/api/peliculas` | Obtener todas las películas | 200 |
| GET | `/api/peliculas/:id` | Obtener una película por ID | 200, 404 |
| POST | `/api/peliculas` | Agregar una película nueva | 201, 400 |
| PUT | `/api/peliculas/:id` | Editar una película existente | 200, 400, 404 |
| DELETE | `/api/peliculas/:id` | Eliminar una película | 200, 404 |
| GET | `/api/peliculas/reporte` | Reporte por género con promedio de puntuación | 200 |

### Ejemplo de película (JSON)

```json
{
  "id": 1,
  "titulo": "Inception",
  "anio": 2010,
  "genero": "Ciencia Ficción",
  "director": "Christopher Nolan",
  "sinopsis": "Un ladrón que roba secretos a través de los sueños.",
  "puntuacion": 5,
  "estado": "vista"
}
```

---

## Notas importantes

- Los datos se guardan **en memoria**. Si el servidor se reinicia, vuelve a las 5 películas del seed inicial.
- El frontend debe ejecutarse con **Live Server** o similar para evitar problemas de CORS al hacer requests al backend.
- La carpeta `node_modules` no está incluida en el zip. Ejecutar `npm install` para regenerarla.