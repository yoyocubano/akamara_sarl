# Solución Error Firebase Studio (Project IDX)

El error `ENOENT: no such file or directory, open '/home/user/dos-en-uno/package.json'` ocurre porque IDX intenta arrancar un servidor web en la raíz de tu carpeta (`dos-en-uno`), pero tus proyectos reales están dentro de subcarpetas (`welux-events` y `akamara_S.U.R.L.`).

Para arreglar esto y tener **dos vistas previas simultáneas** (una para cada proyecto), crea o edita el archivo `.idx/dev.nix` en la raíz de `dos-en-uno` con el siguiente contenido:

```nix
# .idx/dev.nix
{ pkgs, ... }: {
  # Selección del canal de Nix (paquetes estables)
  channel = "stable-23.11";

  # Paquetes a instalar en el entorno (Node, Python, Wrangler)
  packages = [
    pkgs.nodejs_20
    pkgs.python3
    pkgs.wrangler
  ];

  # Variables de entorno
  env = {};

  # Configuración específica de IDX
  idx = {
    # Extensiones de VS Code recomendadas
    extensions = [
      "ESLint.vscode-eslint"
      "esbenp.prettier-vscode"
      "bradlc.vscode-tailwindcss"
    ];

    # Configuración de Vistas Previas (Aquí está la magia)
    previews = {
      enable = true;
      previews = {
        # 1. Vista Previa de Welux Events
        web-welux = {
          # Ejecuta npm run dev DENTRO de la carpeta welux-events
          cwd = "welux-events"; 
          command = ["npm" "run" "dev" "--" "--port" "$PORT" "--host" "0.0.0.0"];
          manager = "web";
        };

        # 2. Vista Previa de Akamara S.U.R.L.
        web-akamara = {
          # Ejecuta npm run dev DENTRO de la carpeta akamara_S.U.R.L.
          cwd = "akamara_S.U.R.L.";
          command = ["npm" "run" "dev" "--" "--port" "$PORT" "--host" "0.0.0.0"];
          manager = "web";
        };
      };
    };

    # Tareas al iniciar el workspace (Opcional, para instalar dependencias auto)
    workspace = {
      onCreate = {
        npm-install-welux = "cd welux-events && npm install";
        npm-install-akamara = "cd akamara_S.U.R.L. && npm install";
      };
    };
  };
}
```

## Pasos para aplicar:
1. Crea este archivo en `.idx/dev.nix` dentro de tu proyecto en IDX.
2. IDX te pedirá reconstruir el entorno ("Rebuild Environment"). Acepta.
3. Al reiniciar, verás dos pestañas de "Web Preview": una para Welux y otra para Akamara, funcionando independientemente.
