#!/bin/bash

echo "🚀 Iniciando proceso de 'Fuerza Bruta' para API Key..."
echo "Te pediré tu email y contraseña de Appwrite para loguearte via terminal."

# 1. Login
npx appwrite-cli login

# 2. Generate Key
echo "🔑 Generando 'Agent Gravity Secret'..."
npx appwrite-cli projects create-key \
    --project-id "696075130002ba18c0ac" \
    --name "Agent Gravity Secret" \
    --scopes databases.read databases.write \
    --scopes collections.read collections.write \
    --scopes attributes.read attributes.write \
    --scopes documents.read documents.write \
    --scopes users.read users.write \
    --scopes storage.read storage.write \
    --scopes files.read files.write

echo "✅ ¡LISTO! Copia el 'secret' que aparece arriba y dámelo."
