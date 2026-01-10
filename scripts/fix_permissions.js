
import { Client, Databases, Permission, Role } from 'node-appwrite';

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

async function fixPermissions() {
    console.log('🔧 Fixing Permissions...');

    const collections = [
        { id: 'site_settings', name: 'Site Settings' },
        { id: 'novedades', name: 'Novedades' },
        { id: 'knowledge_base', name: 'Knowledge Base' }
    ];

    for (const col of collections) {
        try {
            console.log('Checking ' + col.name + ' (' + col.id + ')...');
            // Update permissions to ensure Authenticated Users can Write, everyone can Read
            await databases.updateCollection(
                DB_NAME, 
                col.id, 
                col.name, 
                [
                    Permission.read(Role.any()), 
                    Permission.write(Role.users()), // Authenticated users can write
                    Permission.update(Role.users()),
                    Permission.delete(Role.users())
                ]
            );
            console.log('✅ Permissions updated for ' + col.name);
        } catch (e) {
            console.error('❌ Error updating ' + col.name + ':', e.message);
        }
    }
}

fixPermissions();
