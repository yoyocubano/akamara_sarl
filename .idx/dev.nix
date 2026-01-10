# .idx/dev.nix
{ pkgs, ... }: {
  # Usar un canal estable y reciente para tener paquetes actualizados
  channel = "stable-24.05";

  # Paquetes para el entorno de desarrollo
  packages = [
    pkgs.nodejs_20_x # Actualizado para mayor compatibilidad con Vite
    pkgs.python3
    pkgs.wrangler # Para Cloudflare Workers
    pkgs.pnpm     # Recomendado por welux-events/DEPLOY_PROTOCOL.md
  ];

  # Las variables de entorno se pueden definir aquí si es necesario
  env = {};

  # Configuración específica de IDX
  idx = {
    # Extensiones de VS Code recomendadas
    extensions = [
      "dbaeumer.vscode-eslint" # ID oficial de la extensión ESLint
      "esbenp.prettier-vscode"
      "bradlc.vscode-tailwindcss"
    ];

    # Configurar vistas previas simultáneas para ambos proyectos
    previews = {
      enable = true;
      previews = {
        # 1. Vista Previa para Welux Events
        web-welux = {
          cwd = "welux-events"; 
          # Usar pnpm según el DEPLOY_PROTOCOL.md del proyecto
          command = ["pnpm", "run", "dev", "--", "--port", "$PORT", "--host", "0.0.0.0"];
          manager = "web";
        };

        # 2. Vista Previa para Akamara
        web-akamara = {
          # Corregido el nombre de la carpeta según la estructura de tu proyecto
          cwd = "akamara_sarl";
          command = ["npm", "run", "dev", "--", "--port", "$PORT", "--host", "0.0.0.0"];
          manager = "web";
        };
      };
    };

    # Instalar dependencias automáticamente al crear el espacio de trabajo
    workspace = {
      onCreate = {
        # Usar pnpm para Welux Events
        install-welux = "cd welux-events && pnpm install";
        # Usar npm para Akamara (asumiendo que usa npm)
        install-akamara = "cd akamara_sarl && npm install";
      };
    };
  };
}
