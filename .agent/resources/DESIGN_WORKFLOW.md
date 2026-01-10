# 🎨 Design Workflow - Super Team 2026

Este documento guía al **Actor Diseñador** (Stitch, Veo, Nano Banana) sobre cómo colaborar en Welux Events.

## 🛠️ Herramientas de Diseño

### 1. Stitch (UI/UX)

- **Uso**: Rediseño de componentes React y flujos de usuario.
- **Flujo**: Generar UI en Stitch → Exportar a Figma → Usar la extensión de Figma en VS Code para inspeccionar → Antigravity implementa en el código.

### 2. Veo (Video)

- **Uso**: Creación de visuales dinámicos para el Hero Section y promociones.
- **Acceso**: Google AI Studio.
- **Destino**: `client/public/assets/video/`

### 3. Nano Banana (Photo)

- **Uso**: Generación de fotos de producto (Quiet Luxury) y edición 3D.
- **Acceso**: Google AI Studio / Gemini Pro.
- **Destino**: `client/public/assets/images/`

## 🌉 Integración con VS Code

### Figma a Código

1. Abre la extensión **Figma** en la barra lateral.
2. Logueate y abre el archivo exportado de Stitch.
3. Copia las propiedades CSS directamente al componente.

### Wireframing con Excalidraw

1. Crea un archivo `.excalidraw` en cualquier carpeta.
2. Úsalo para esbozar ideas rápidas de layout antes de pasar a Stitch.

## 📊 Protocolo de Entrega de Activos

| Tipo | Formato | Destino | Conversión |
| :--- | :--- | :--- | :--- |
| **Icons** | SVG | `client/src/assets/icons/` | React Components |
| **Videos** | MP4 / WebM | `client/public/video/` | Lazy Loading |
| **Images** | WebP / AVIF | `client/public/img/` | responsive sizing |

## 🧪 Verificación de Diseño

El **Auditor (Snyk/Qodo)** verificará que:

1. Los activos no pesen más de lo permitido.
2. El código generado por Stitch siga las `.cursorrules` (TypeScript estricto).
3. La accesibilidad (ARIA) sea correcta.
