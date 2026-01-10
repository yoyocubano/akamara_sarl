# 🔑 Guía Manual: Recuperar Llaves de Supabase

Como solicitaste, aquí tienes los pasos exactos para conseguir las dos llaves que faltan.

## 1. Contraseña de Base de Datos (DB Password)
Esta es la contraseña que definiste cuando creaste el proyecto. Supabase **NO** te la puede mostrar (por seguridad), pero puedes cambiarla.

1. Entra a tu proyecto en [Supabase Dashboard](https://supabase.com/dashboard).
2. En el menú lateral izquierdo, ve a **Settings** (ícono de engranaje ⚙️).
3. Selecciona **Database**.
4. Busca la sección **"Database Password"**.
5. Haz clic en **"Reset Database Password"**.
6. Escribe una nueva contraseña segura y **G U Á R D A L A** en tu gestor de contraseñas o en `MIS_CONTRASENAS...` (¡No la pierdas esta vez!).
7. *Nota: Esto desconectará momentáneamente tu app hasta que actualicemos la configuración, pero como estamos en desarrollo, no pasa nada.*

## 2. Token de Acceso Personal (Access Token)
Este es el "permiso especial" para que GitHub y yo podamos controlar tu Supabase.

1. En el Dashboard, haz clic en tu **Avatar/Perfil** (abajo a la izquierda).
2. Selecciona **"Account Settings"**.
3. Ve a la pestaña **"Access Tokens"**.
4. Haz clic en el botón verde **"Generate New Token"**.
5. Ponle de nombre: `Akamara GitHub Agent`.
6. Haz clic en **"Generate Token"**.
7. **COPIA EL TOKEN INMEDIATAMENTE**. Supabase nunca más te lo volverá a mostrar. Empieza con `sbp_...`.

---

## ¿Qué hacer con ellas?
Una vez las tengas:
1. Ve a tu repositorio en GitHub > Settings > Secrets.
2. Crea `SUPABASE_DB_PASSWORD` con la contraseña del paso 1.
3. Crea `SUPABASE_ACCESS_TOKEN` con el token del paso 2.
