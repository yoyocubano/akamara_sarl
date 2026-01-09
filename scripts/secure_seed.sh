#!/bin/bash

# Ensure we are in the project root
cd "$(dirname "$0")/.."

echo "📍 Working Directory: $(pwd)"

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed or not in PATH."
    exit 1
fi

echo ""
echo "🔐 SECURITY CHECK: Appwrite API Key Required"
echo "   Permission requirements: database.write, collections.write, attributes.write, documents.write"
echo ""
echo -n "👉 Please paste your Appwrite API Key (Hidden Input): "
read -s APPWRITE_API_KEY
echo ""

if [ -z "$APPWRITE_API_KEY" ]; then
    echo "❌ Error: No API Key provided."
    exit 1
fi

export APPWRITE_API_KEY
echo "✅ Key captured. Starting Knowledge Injection..."
echo ""

# Run the seeding script
node scripts/seed_knowledge.js
