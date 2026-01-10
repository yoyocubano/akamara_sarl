# Guía de Actualización para Agente IDX / Firebase (Gemini)

Esta guía detalla los pasos para transferir el contexto, las reglas y la "memoria" del Ingeniero Senior (Antigravity) al agente Gemini integrado en Project IDX.

## 1. Prompt Maestro (Instrucción Inicial)

Copia y pega este texto en el chat con Gemini dentro de IDX para inicializar su contexto:

```text
Actúa como el Ingeniero Senior de Akamara y Welux Events. Tu objetivo es mantener la consistencia técnica y estética que hemos logrado hasta ahora.

**Reglas de Oro del Proyecto:**
1. **Estética:** Siempre mantén el diseño 'Premium & Warmer' (Fondos oscuros/Void, acentos Amber/Gold, Glassmorphism). Nunca uses estilos default básicos.
2. **Seguridad:** Nunca expongas API Keys en el cliente. Úsalas via Cloudflare Functions o Appwrite/Supabase Backend.
3. **Datos:** La persistencia en web es temporal (Auto-cleanup a 10 días). La fuente de verdad absoluta es Google Sheets (integrado vía Make).
4. **SEO:** Usa siempre el componente <SEO /> y las etiquetas <Helmet> en cada nueva página creada.
5. **Multilenguaje:** Todo texto nuevo debe ir a los archivos JSON en `public/locales` (i18n), nunca hardcodeado en los componentes.
6. **Código Limpio:** Usa `clsx` y `tailwind-merge` (utilidad cn) para clases CSS dinámicas.

**Contexto de Identidad:**
- **Akamara S.U.R.L.:** Ecosistema cubano de diseño premium.
- **Welux Events:** Agencia de lujo en Luxemburgo.
- Ambos proyectos comparten ADN técnico pero tienen identidades visuales distintas.
```

## 2. Configuración de Entorno (.idx/dev.nix)

Para que el entorno de desarrollo en la nube sea idéntico al local, asegura que el archivo `.idx/dev.nix` contenga esta configuración:

```nix
{ pkgs, ... }: {
  channel = "stable-23.11";
  packages = [
    pkgs.nodejs_20
    pkgs.python3
    pkgs.wrangler # CRÍTICO: Para desplegar a Cloudflare desde IDX
  ];
  env = {
    # Variables de entorno globales si las necesitas
  };
  idx = {
    extensions = [
      "ESLint.vscode-eslint"
      "esbenp.prettier-vscode"
      "bradlc.vscode-tailwindcss"
    ];
    previews = {
      enable = true;
      previews = {
        web = {
          command = ["npm" "run" "dev" "--" "--port" "$PORT" "--host" "0.0.0.0"];
          manager = "web";
        };
      };
    };
  };
}
```

## 3. Transferencia de Memoria

Para que el agente sepa en qué estado quedó el proyecto:
1. Sube el archivo `.agent/PENDING_TASKS.md` a la raíz de tu proyecto en IDX.
2. Instruye al agente: *"Analiza el archivo PENDING_TASKS.md antes de empezar cualquier tarea para saber qué falta por hacer."*
