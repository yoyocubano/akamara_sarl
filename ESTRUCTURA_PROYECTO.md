# Estructura del Proyecto Akamara

Este documento explica la organización de las carpetas y archivos del sistema, utilizando nombres descriptivos en español para facilitar la navegación conceptual sin romper la configuración técnica del código.

## 📂 Carpetas Principales (Raíz)

- **`/src` (CÓDIGO FUENTE):** El corazón de la aplicación. Aquí vive toda la lógica, interfaz y funcionamiento del sitio.
  - **`/components` (COMPONENTES):** Piezas visuales reutilizables (Botones, Tarjetas, Menús). Son los "ladrillos" de la construcción.
  - **`/pages` (PÁGINAS/PANTALLAS):** Las vistas completas que ve el usuario (Inicio, Contacto, Admin).
  - **`/layouts` (PLANTILLAS):** Estructuras que envuelven las páginas (ej. `AdminLayout` tiene la barra lateral).
  - **`/contexts` (ESTADOS GLOBALES):** Información que viaja por toda la app (Configuración, Autenticación).
  - **`/lib` (LIBRERÍAS):** Conexiones externas (ej. cliente de Supabase).
  - **`/assets` (ACTIVOS):** Archivos locales importados por código (Imágenes, Iconos).
  - **`/i18n.ts` (TRADUCTOR):** El archivo maestro de idiomas (Español/Inglés).

- **`/public` (PÚBLICO):** Archivos estáticos que se sirven tal cual (Favicon, `robots.txt`). Lo que pongas aquí es accesible directamente por URL.

- **`/recursos_creativos` (Antes `userideasakamara`):**
  - Contiene los videos conceptuales y material de inspiración (`Akamara_Creacion_Final.mp4`). Renombrado para mayor claridad.

- **`/supabase` (BASE DE DATOS):** Configuración y esquemas de la base de datos (SQL).

- **`/dist` (DISTRIBUCIÓN):** (Generado automáticamente) El código final optimizado listo para subir a internet. No se edita manualmente.

## ⚠️ Nota Técnica Importante

No se renombraron carpetas como `src` o `components` físicamente porque las herramientas de desarrollo modernas (Vite, React, TypeScript) dependen de estos estándares. Renombrarlas causaría que el proyecto dejara de funcionar ("romper el build"). La carpeta `recursos_creativos` srr renombró porque es independiente del código.

---
*Generado por Agente Gravity - 2024*
