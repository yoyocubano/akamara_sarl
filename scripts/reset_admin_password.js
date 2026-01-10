import { Client, Users } from 'node-appwrite';

// Configuración directa con la API KEY maestra que encontramos en el .env
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') 
    .setProject('696075130002ba18c0ac')
    .setKey('standard_e42b1929fce28cf33fca686dfc6a1295dd00e9467d80c7ecf7c142556df884bb8a08036d682f9458b1f1c4bd6a3b1ffbcddd1cd896957f73d71a2679930bb066fb48bfbca7844a4c69aa75cfade0bc91b1a05fb175ccff2d13c240e66932590e82ab8448b387c6dace61c6be3a4adab8f104f9f46fb904e85c3c159924c43313');

const users = new Users(client);

async function fixAdmin() {
    console.log("🔍 Buscando usuarios administradores...");
    
    try {
        const list = await users.list();
        // Buscamos a yucolaguilar o similar
        const admin = list.users.find(u => u.email.includes('yucolaguilar') || u.email.includes('welux'));

        if (admin) {
            console.log(`✅ Usuario encontrado: ${admin.email} (ID: ${admin.$id})`);
            console.log("🛠  Reseteando contraseña a 'Akamara2026'...");
            
            await users.updatePassword(admin.$id, 'Akamara2026');
            console.log("🎉 ¡Contraseña actualizada con éxito!");
            console.log("👉 Nueva Credencial: " + admin.email + " / Akamara2026");
        } else {
            console.error("❌ No se encontró ningún usuario admin con email conocido.");
            console.log("Usuarios disponibles:", list.users.map(u => u.email));
        }
    } catch (error) {
        console.error("❌ Error conectando con Appwrite:", error.message);
    }
}

fixAdmin();
