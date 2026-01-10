import { Client, Users, ID } from 'node-appwrite';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') 
    .setProject('696075130002ba18c0ac')
    .setKey('standard_e42b1929fce28cf33fca686dfc6a1295dd00e9467d80c7ecf7c142556df884bb8a08036d682f9458b1f1c4bd6a3b1ffbcddd1cd896957f73d71a2679930bb066fb48bfbca7844a4c69aa75cfade0bc91b1a05fb175ccff2d13c240e66932590e82ab8448b387c6dace61c6be3a4adab8f104f9f46fb904e85c3c159924c43313');

const users = new Users(client);

async function createOriginalAdmin() {
    const email = 'admin@akamara.cu';
    const password = 'akamara2026';
    const name = 'Admin Akamara Main';

    console.log(`🔨 Configurando usuario Maestro: ${email}...`);

    try {
        const result = await users.create(ID.unique(), email, undefined, password, name);
        console.log("✅ Usuario CREADO exitosamente!");
    } catch (error) {
        if (error.code === 409) {
            console.log("⚠️ El usuario ya existe. Actualizando contraseña...");
            const list = await users.list();
            const existing = list.users.find(u => u.email === email);
            if (existing) {
                await users.updatePassword(existing.$id, password);
                console.log("✅ Contraseña actualizada a 'akamara2026'.");
            }
        } else {
            console.error("❌ Error:", error);
        }
    }
}

createOriginalAdmin();
