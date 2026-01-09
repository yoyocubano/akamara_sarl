#!/bin/bash

cd "$(dirname "$0")/.."

if [ -f .env ]; then
    export $(cat .env | xargs)
fi

echo "🔧 Appwrite Collection Setup"
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
echo "✅ Key loaded. Setting up collections..."
echo ""

node scripts/setup_new_collections.js
