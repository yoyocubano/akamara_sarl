# 🚀 Guía de Integración: GitHub + Supabase

¡Felicidades! Has habilitado el flujo de trabajo **"Database as Code"**.
Ahora, cada vez que crees un archivo en `supabase/migrations` y hagas *Push*, los cambios se aplicarán automáticamente a tu base de datos en vivo.

## ⚠️ Paso Crítico: Configurar Secretos

Para que esto funcione, necesitas dar permiso a GitHub para hablar con Supabase. Haz lo siguiente:

### 1. Obtener Token de Acceso (Supabase)
1. Ve a [Supabase Access Tokens](https://supabase.com/dashboard/account/tokens).
2. Haz clic en **"Generate New Token"**.
3. Nómbrelo `GitHub Action Akamara`.
4. Copia el token (empieza con `sbp_...`).

### 2. Configurar en GitHub
1. Ve a tu repositorio en GitHub: `https://github.com/yoyocubano/akamara_S.U.R.L/settings/secrets/actions` (Ajusta la URL si es distinta).
2. Haz clic en **"New repository secret"**.
3. Crea el primero:
   - **Name:** `SUPABASE_ACCESS_TOKEN`
   - **Value:** (Pega el token que copiaste en el paso 1).
4. Crea el segundo:
   - **Name:** `SUPABASE_DB_PASSWORD`
   - **Value:** La contraseña de base de datos que creaste al iniciar tu proyecto Supabase.
     *(Si la olvidaste, puedes resetearla en Project Settings > Database > Reset Password)*.

---

## 🛠 Cómo hacer cambios en la Base de Datos

1. **Crear Migración:** En tu VS Code, crea un nuevo archivo en `supabase/migrations/`:
   `20260110_nueva_tabla.sql`
2. **Escribir SQL:** Escribe tu código SQL dentro.
3. **Commit & Push:**
   ```bash
   git add .
   git commit -m "feat: crear tabla de productos"
   git push origin main
   ```
4. **Listo:** Ve a la pestaña "Actions" en GitHub para ver cómo el robot aplica tus cambios.
