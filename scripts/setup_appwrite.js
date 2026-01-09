import { Client, Databases, Permission, Role } from 'node-appwrite';

// CONFIGURATION
// Replace these with your values or set them as environment variables
const PROJECT_ID = process.env.APPWRITE_PROJECT_ID || 'REPLACE_WITH_PROJECT_ID';
const API_KEY = process.env.APPWRITE_API_KEY || 'REPLACE_WITH_API_KEY'; // Need an API Key with 'collections.write', 'attributes.write', 'databases.write' scope
const ENDPOINT = 'https://cloud.appwrite.io/v1';

const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID)
    .setKey(API_KEY);

const databases = new Databases(client);
const DB_NAME = 'main';

async function setup() {
    console.log('🚀 Starting Appwrite Setup for Akamara...');

    try {
        // 1. Create Database
        try {
            await databases.create(DB_NAME, 'Main Database');
            console.log('✅ Database "main" created.');
        } catch (e) {
            console.log('ℹ️  Database might already exist:', e.message);
        }

        // 2. Create "Novedades" Collection
        try {
            await databases.createCollection(DB_NAME, 'novedades', 'Novedades', [
                Permission.read(Role.any()), // Public Read
                Permission.write(Role.users()) // Authenticated Write (Admin)
            ]);
            console.log('✅ Collection "novedades" created.');
            
            // Attributes
            await databases.createStringAttribute(DB_NAME, 'novedades', 'title', 256, true);
            await databases.createStringAttribute(DB_NAME, 'novedades', 'overview', 1000, true);
            await databases.createUrlAttribute(DB_NAME, 'novedades', 'image_url', true);
            console.log('   - Attributes defined for "novedades"');
        } catch (e) {
            console.log('ℹ️  Collection "novedades" issue:', e.message);
        }

        // 3. Create "Analytics" Collection
        try {
            await databases.createCollection(DB_NAME, 'analytics_visits', 'Analytics Visits', [
                Permission.create(Role.any()), // Public Create (Tracking)
                Permission.read(Role.users())  // Admin Read
            ]);
            console.log('✅ Collection "analytics_visits" created.');

            // Attributes
            await databases.createStringAttribute(DB_NAME, 'analytics_visits', 'page', 128, true);
            await databases.createStringAttribute(DB_NAME, 'analytics_visits', 'visitor_id', 64, true);
            await databases.createStringAttribute(DB_NAME, 'analytics_visits', 'screen_size', 32, false);
            await databases.createStringAttribute(DB_NAME, 'analytics_visits', 'user_agent', 256, false);
            console.log('   - Attributes defined for "analytics_visits"');
        } catch (e) {
             console.log('ℹ️  Collection "analytics_visits" issue:', e.message);
        }

        // 4. Create "Settings" Collection
        try {
            await databases.createCollection(DB_NAME, 'site_settings', 'Site Settings', [
                Permission.read(Role.any()),
                Permission.write(Role.users())
            ]);
            console.log('✅ Collection "site_settings" created.');

            // Attributes
            await databases.createStringAttribute(DB_NAME, 'site_settings', 'key', 256, true);
            await databases.createStringAttribute(DB_NAME, 'site_settings', 'value', 1000, true);
            console.log('   - Attributes defined for "site_settings"');
        } catch (e) {
             console.log('ℹ️  Collection "site_settings" issue:', e.message);
        }

        console.log('\n🎉 Setup Complete! Your Appwrite backend is ready.');

    } catch (error) {
        console.error('❌ Fatal Error:', error.message);
    }
}

setup();
