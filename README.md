# Sistema de Buzón de Sugerencias, Incidencias y Reportes Éticos
### Gerencia de Talento Humano — FAME S.A.C.

Sistema web corporativo diseñado para empleados de la empresa, enfocado en fomentar la transparencia, confianza y escucha activa mediante reportes protegidos (100% anónimos o identificados).

---

## 🏛️ Arquitectura del Proyecto (MVC)

El proyecto está organizado siguiendo el patrón arquitectónico **Modelo - Vista - Controlador (MVC)**, separando claramente la lógica de negocio, las vistas y los datos:

```text
TalentoHumano/
├── docker-compose.yml             # Orquestador Docker (PostgreSQL + Backend + Frontend)
├── backend/                       # API REST (Controladores y Modelos)
│   ├── Dockerfile
│   ├── sql/
│   │   └── init.sql               # Esquema de tablas e índices PostgreSQL y datos demo
│   └── src/
│       ├── config/
│       │   └── db.ts              # Conexión y Pool de PostgreSQL
│       ├── models/                # [M] MODELO: Lógica de datos, consultas SQL y reglas
│       │   └── reportModel.ts
│       ├── controllers/           # [C] CONTROLADOR: Orquestación de peticiones y respuestas
│       │   └── reportController.ts
│       ├── routes/                # Rutas y Endpoints de la API
│       │   └── reportRoutes.ts
│       ├── middlewares/           # Manejo centralizado de errores
│       │   └── errorHandler.ts
│       └── server.ts              # Servidor Express
└── frontend/                      # [V] VISTA: Interfaz amigable en React + Vite + Tailwind
    ├── Dockerfile
    ├── nginx.conf                 # Configuración de Nginx para producción
    └── src/
        ├── components/
        │   ├── Navbar.tsx         # Barra superior y selector de vistas
        │   ├── NewReportForm.tsx  # Formulario con opción anónima y generación de Ticket
        │   ├── TrackTicketView.tsx# Consulta del estado y respuesta oficial con Ticket
        │   └── AdminDashboard.tsx # Panel administrativo de gestión para Talento Humano
        ├── services/
        │   └── api.ts             # Cliente de conexión con la API
        ├── types/                 # Tipos e interfaces TypeScript
        └── App.tsx
```

---

## 🚀 Despliegue Rápido con Docker

Para levantar todo el ecosistema (PostgreSQL + Backend + Frontend) con un solo comando:

```bash
docker-compose up --build -d
```

### URLs de Acceso:
- **Frontend (Web Empleados y RRHH):** `http://localhost:3000`
- **Backend API REST:** `http://localhost:4000/api/reports`
- **Health Check:** `http://localhost:4000/api/health`
- **Base de Datos PostgreSQL:** `localhost:5432` (usuario: `postgres`, contraseña: `postgres`, bd: `talentohumano_db`)

Para detener los contenedores:
```bash
docker-compose down
```

---

## 💻 Desarrollo Local (Modo Híbrido)

Si deseas trabajar en desarrollo local con recarga en vivo (hot reload):

### 1. Iniciar solo la base de datos con Docker:
```bash
docker-compose up -d db
```

### 2. Iniciar el Backend:
```bash
cd backend
npm install
npm run dev
```
*(El backend se ejecutará en http://localhost:4000)*

### 3. Iniciar el Frontend:
```bash
cd frontend
npm install
npm run dev
```
*(El frontend se ejecutará en http://localhost:3000 o 5173)*

---

## 📋 Funcionalidades Principales

1. **Envío de Sugerencias y Reportes:**
   - Tres categorías principales: **Sugerencia de Mejora**, **Incidencia Laboral** y **Reporte Ético Confidencial**.
   - Selector de **Anonimato 100% Protegido** (no guarda IPs ni nombres).
   - Generación de un **Código de Ticket único** (ejemplo: `TH-2026-X8B9`) para que el colaborador consulte el estado de su caso sin revelar su identidad.

2. **Seguimiento con Código de Ticket:**
   - Línea de tiempo visual del avance: *Recibido ➔ En Evaluación ➔ Atendido / Resuelto*.
   - Visualización de la respuesta y acciones tomadas por el área de Talento Humano.

3. **Panel Administrativo de Talento Humano:**
   - Métricas y tarjetas de resumen en tiempo real.
   - Filtros avanzados por tipo de reporte, estado y prioridad.
   - Modal para redactar la **Respuesta Oficial** para el empleado y guardar **Notas Internas Confidenciales de RRHH**.

