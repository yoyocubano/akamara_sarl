
import { Client, Databases, Permission, Role, ID } from 'node-appwrite';

// CONFIGURATION
const PROJECT_ID = process.env.APPWRITE_PROJECT_ID || '696075130002ba18c0ac';
const API_KEY = process.env.APPWRITE_API_KEY; 
const ENDPOINT = 'https://cloud.appwrite.io/v1';
const DB_NAME = 'main';

if (!API_KEY) {
    console.error("❌ Error: APPWRITE_API_KEY environment variable is required.");
    process.exit(1);
}

const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID)
    .setKey(API_KEY);

const databases = new Databases(client);

async function createAttributes(collectionId, attributes) {
    for (const attr of attributes) {
        try {
            if (attr.type === 'string') {
                await databases.createStringAttribute(DB_NAME, collectionId, attr.key, attr.size, attr.required, attr.default);
            } else if (attr.type === 'boolean') {
                await databases.createBooleanAttribute(DB_NAME, collectionId, attr.key, attr.required, attr.default);
            } else if (attr.type === 'email') {
                await databases.createEmailAttribute(DB_NAME, collectionId, attr.key, attr.required);
            }
             // Wait a bit just in case of rate limits
             await new Promise(r => setTimeout(r, 200));
        } catch (e) {
            // Likely already exists
        }
    }
}

async function setupCollections() {
    console.log('🔧 Setting up New Collections...');

    const collections = [
        { 
            id: 'mobiliario', 
            name: 'Mobiliario', 
            permissions: [Permission.read(Role.any()), Permission.write(Role.users()), Permission.update(Role.users()), Permission.delete(Role.users())],
            attributes: [
                { key: 'name', type: 'string', size: 255, required: true },
                { key: 'description', type: 'string', size: 1000, required: false },
                { key: 'category', type: 'string', size: 100, required: true }, 
                { key: 'image_url', type: 'string', size: 2048, required: true },
                { key: 'active', type: 'boolean', required: false, default: true }
            ]
        },
        { 
            id: 'messages', 
            name: 'Mensajes de Contacto', 
            permissions: [Permission.read(Role.users()), Permission.create(Role.any()), Permission.update(Role.users()), Permission.delete(Role.users())],
            attributes: [
                { key: 'name', type: 'string', size: 255, required: true },
                { key: 'company', type: 'string', size: 255, required: false },
                { key: 'email', type: 'email', required: true },
                { key: 'division', type: 'string', size: 100, required: false },
                { key: 'message', type: 'string', size: 5000, required: true },
                { key: 'read', type: 'boolean', required: false, default: false }
            ]
        }
    ];

    for (const col of collections) {
        try {
            console.log(`Checking ${col.name} (${col.id})...`);
            try {
                await databases.getCollection(DB_NAME, col.id);
            } catch (e) {
                await databases.createCollection(DB_NAME, col.id, col.name, col.permissions);
            }
            await databases.updateCollection(DB_NAME, col.id, col.name, col.permissions);
            await createAttributes(col.id, col.attributes);
            console.log(`✅ ${col.name} Ready.`);
        } catch (e) {
            console.error(`❌ Error with ${col.name}:`, e.message);
        }
    }
}

setupCollections();
