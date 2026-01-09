# 🛡️ Política de Seguridad de Akamara S.U.R.L.

Este repositorio contiene el código fuente de la infraestructura digital de Akamara S.U.R.L. La seguridad es nuestra prioridad #1 dado el entorno operativo.

## 🔒 Protocolos Activos

### 1. Protección de Infraestructura (Cloudflare)
- **Headers de Seguridad Estrictos**: Se ha configurado el archivo `_headers` para forzar HSTS, X-Frame-Options (anti-clickjacking) y CSP.
- **Firewall Web (WAF)**: Desplegado a través de Cloudflare Pages para mitigar ataques DDoS y bots maliciosos.
- **SSL/TLS**: Encriptación forzosa de extremo a extremo (Full Strict).

### 2. Integridad del Código
- **Dependabot**: Activado para monitorear vulnerabilidades en paquetes `npm`.
- **Ramas Protegidas**: La rama `main` está bloqueada contra *force pushes*.
- **Secretos**: Las claves API (DeepSeek, Appwrite) no se guardan en el código (hardcoded) excepto las que son públicas por diseño. Los secretos críticos deben estar en `.env` local o en las variables de entorno de Cloudflare.

### 3. Autenticación y Datos (Appwrite)
- **RBAC (Role Based Access Control)**:
    - `Lectura`: Pública (Mobiliario, Novedades).
    - `Escritura`: Estrictamente limitada a usuarios autenticados (Admin).
- **Protección de Rutas**: El panel `/admin` está protegido por un componente `ProtectedRoute` que verifica la sesión antes de renderizar.

### 4. Limitaciones Conocidas (Disclaimer)
- **Riesgo 0 no existe**: Ningún sistema es impenetrable.
- **Ingeniería Social**: La mayor vulnerabilidad es el factor humano (contraseñas débiles, phishing).

## 🚨 Reporte de Incidentes
Si detecta una vulnerabilidad, por favor contacte inmediatamente a `security@akamara.cu` (o al desarrollador principal).

## 📝 Changelog de Seguridad
- **Enero 2026**: Implementación de CSP estricto y bloqueo de iframes externos.
