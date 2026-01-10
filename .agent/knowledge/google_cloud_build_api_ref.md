# Google Cloud Build API Reference

**Fuente**: Google Cloud Documentation (Paste del Usuario)
**Uso**: Automatización de Builds y Despliegues (CI/CD) para Akamara.

## Descripción General

Cloud Build es el servicio que "construye" tu aplicación en la nube. Toma tu código de GitHub, lee el `Dockerfile`, y crea el contenedor que luego se sirve en Cloud Run.

## Service Endpoint

`https://cloudbuild.googleapis.com`

## Recursos Principales

### Projects.Builds (v1)

* `create`: Inicia un nuevo build.
* `list`: Lista builds anteriores.
* `cancel`: Cancela un build en progreso.
* `retry`: Reintenta un build fallido.

### Triggers (Desencadenadores)

* `create`: Crea un trigger (ej: "Cuando haga push a main, despliega").
* `run`: Ejecuta un trigger manualmente.

### GitHub Enterprise Configs

Permite conectar repositorios de GitHub Enterprise.

### Worker Pools

Permite crear trabajadores privados para builds seguros.

---
*Nota: Esta API es fundamental para que el repositorio de Akamara se sincronice automáticamente con el sitio web.*
