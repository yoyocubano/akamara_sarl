
import { Client, Databases, ID, Permission, Role } from 'node-appwrite';
import fs from 'fs';
import path from 'path';

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

async function seed() {
    console.log('🌱 Starting Knowledge Injection...');

    // 1. Create "Knowledge Base" Collection
    const KB_COLLECTION = 'knowledge_base';
    try {
        await databases.createCollection(DB_NAME, KB_COLLECTION, 'Knowledge Base', [
            Permission.read(Role.any()), 
            Permission.write(Role.users())
        ]);
        console.log(`✅ Collection "${KB_COLLECTION}" created.`);
        
        // Attributes
        await databases.createStringAttribute(DB_NAME, KB_COLLECTION, 'key', 256, true);
        await databases.createStringAttribute(DB_NAME, KB_COLLECTION, 'content', 5000, true);
        await databases.createStringAttribute(DB_NAME, KB_COLLECTION, 'category', 64, false);
        console.log('   - Attributes defined.');
        
        // Wait for attributes to be ready (naive wait)
        console.log('   - Waiting for attributes...');
        await new Promise(resolve => setTimeout(resolve, 3000));
    } catch (e) {
        console.log(`ℹ️  Collection "${KB_COLLECTION}" might exist:`, e.message);
    }

    // 2. Read Manifesto and Parse
    try {
        const manifestoPath = path.join(process.cwd(), 'MANIFESTO_AKAMARA.md');
        const manifestoContent = fs.readFileSync(manifestoPath, 'utf-8');
        
        // Simple chunking by headers
        const sections = manifestoContent.split(/^## /gm).filter(s => s.trim().length > 0);
        
        console.log(`📖 Found ${sections.length} sections in Manifesto.`);

        for (const section of sections) {
            const lines = section.trim().split('\n');
            const title = lines[0].replace(/[^a-zA-Z0-9\s]/g, '').trim(); // Clean title
            const body = lines.slice(1).join('\n').trim();
            
            if (title && body) {
                // Check if exists/overwrite logic could be added, but appending for now or ignoring duplicates by key is hard without search.
                // We'll just Create unique documents for now.
                try {
                    await databases.createDocument(
                        DB_NAME, 
                        KB_COLLECTION, 
                        ID.unique(), 
                        {
                            key: `manifesto_${title.toLowerCase().replace(/\s+/g, '_')}`,
                            content: body,
                            category: 'manifesto'
                        }
                    );
                    console.log(`   + Injected: ${title}`);
                } catch (err) {
                     console.log(`   - Skipped/Error ${title}:`, err.message);
                }
            }
        }
    } catch (e) {
        console.error('❌ Error reading/parsing Manifesto:', e.message);
    }

    // 3. Inject System Prompt into Site Settings
    const SETTINGS_COLLECTION = 'site_settings';
    const PROMPT_KEY = 'chatbot_system_prompt';
    
    // We construct the prompt based on the Manifesto content strictly
    const systemPromptValue = `
Eres Ori IA / Yunior GPT, asistente de Akamara S.U.R.L.
Responde basándote en:
- Akamara es un Ecosistema de Creación inspirado en los Orishas (Estrategia/Orunmila, Diseño/Yemayá, Construcción/Shangó, Gastronomía/Olokun, Logística/Eshú).
- Eres profesional pero con "tumbao" si usas la personalidad de Yunior.
- Prioriza dirigir al usuario a una de las 5 divisiones.
- No inventes precios ni fechas de entrega.
    `.trim();

    try {
        // Try to update if exists, or create
        // Since we can't query easily by 'key' without index in this script context efficiently, we'll try to list and filter or just create.
        // Let's list settings to see if it exists.
        /* 
           NOTE: In a real script we would check existence. 
           For robustness, we try to create a doc with a deterministic ID if possible? 
           Appwrite IDs are manual-able. Let's use 'setting_system_prompt'. 
        */
       try {
           await databases.createDocument(
               DB_NAME,
               SETTINGS_COLLECTION,
               'setting_system_prompt', // Deterministic ID
               {
                   key: PROMPT_KEY,
                   value: systemPromptValue
               }
           );
           console.log('✅ System Prompt injected into Site Settings.');
       } catch (createErr) {
           // If exists, update
           await databases.updateDocument(
               DB_NAME,
               SETTINGS_COLLECTION,
               'setting_system_prompt',
               {
                   value: systemPromptValue
               }
           );
           console.log('🔄 System Prompt updated in Site Settings.');
       }

    } catch (e) {
        console.log('❌ Error injecting system prompt:', e.message);
    }

    console.log('🎉 Knowledge Injection Complete.');
}

seed();
