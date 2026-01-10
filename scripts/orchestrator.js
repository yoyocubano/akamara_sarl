import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('\x1b[36m%s\x1b[0m', '🚀 INICIANDO ORQUESTACIÓN AUTÓNOMA: WELUX EVENTS');

// CONFIGURACIÓN
const CLIENT_DIR = path.join(__dirname, '../client');
const LOCALES_DIR = path.join(CLIENT_DIR, 'public/locales');

// 1. CHEQUEO DE INTEGRIDAD DE ARCHIVOS CLAVE
console.log('\n🔍 [Fase 1] Verificando Integridad del Sistema...');
const criticalFiles = [
    'src/main.tsx',
    'src/App.tsx',
    'index.html',
    'public/locales/en/translation.json',
    'public/locales/es/translation.json'
];

let missingFiles = 0;
criticalFiles.forEach(file => {
    if (!fs.existsSync(path.join(CLIENT_DIR, file))) {
        console.error(`❌ Faltante Crítico: ${file}`);
        missingFiles++;
    }
});

if (missingFiles > 0) {
    console.error(`💥 ABORTANDO: Faltan ${missingFiles} archivos críticos. Activando protocolo de emergencia...`);
    process.exit(1);
}
console.log('✅ Integridad Estructural: OK');

// 2. AUDITORÍA LIGERA DE I18N (Orquestación de Contexto)
console.log('\n🌍 [Fase 2] Auditando Subsistema de Lenguaje...');
try {
    const es = JSON.parse(fs.readFileSync(path.join(LOCALES_DIR, 'es/translation.json'), 'utf8'));
    const fr = JSON.parse(fs.readFileSync(path.join(LOCALES_DIR, 'fr/translation.json'), 'utf8'));

    // Chequeo de claves críticas recientes
    if (!es.schema || !fr.schema) {
        console.warn('⚠️ ALERTA: Posible falta de Schema SEO en traducciones.');
    } else {
        console.log('✅ Schema SEO detectado en idiomas principales.');
    }
} catch (e) {
    console.error('❌ Error de parsing en JSONs de idioma:', e.message);
    process.exit(1);
}

// 3. CONSTRUCCIÓN Y VERIFICACIÓN (Build)
console.log('\n🏗️  [Fase 3] Ejecutando Build de Producción...');
try {
    // Ejecutamos npm run build dentro de la carpeta client
    execSync('npm run build', { stdio: 'inherit', cwd: CLIENT_DIR });
    console.log('\n🎉 BUILD EXITOSO.');
} catch (e) {
    console.error('\n💥 EL BUILD FALLÓ. Requiere intervención manual.');
    process.exit(1);
}

// 4. CONCLUSIÓN
console.log('\n✨ ORQUESTACIÓN COMPLETADA ✨');
console.log('El sistema Welux Events está listo para despliegue (Deploy).');
console.log('Siguiente paso sugerido: git push (si no se ha hecho)');
