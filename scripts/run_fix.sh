#!/bin/bash

# Ensure we are in the project root
cd "$(dirname "$0")/.."

# Check if .env exists and source it just in case, but rely on user input/env behavior
if [ -f .env ]; then
    export $(cat .env | xargs)
fi

echo "🔧 Appwrite Permission Fixer"
echo "--------------------------------"

if [ -z "$APPWRITE_API_KEY" ]; then
    echo "⚠️  APPWRITE_API_KEY not found in environment."
    echo -n "👉 Please paste your Appwrite API Key (Hidden Input): "
    read -s APPWRITE_API_KEY
    echo ""
    export APPWRITE_API_KEY
fi

if [ -z "$APPWRITE_API_KEY" ]; then
    echo "❌ Error: No API Key provided."
    exit 1
fi

export APPWRITE_API_KEY
echo "✅ Key loaded. Updating permissions..."
echo ""

# Run the permission fix script
node scripts/fix_permissions.js
