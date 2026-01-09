import { Client, Account, Databases, Storage } from 'appwrite';

export const client = new Client();

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID || '696075130002ba18c0ac';
const ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';

client
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

// Configuration constants
export const APPWRITE_CONFIG = {
    DATABASE_ID: 'main',
    COLLECTIONS: {
        NOVEDADES: 'novedades',
        ANALYTICS: 'analytics_visits',
        SETTINGS: 'site_settings'
    },
    BUCKETS: {
        IMAGES: 'images'
    }
};
