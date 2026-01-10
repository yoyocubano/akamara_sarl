# 🌌 OMNI-CONTEXT: Welux Events (The God File)

> **INSTRUCTION FOR AI AGENTS:** This file contains the ENTIRE context of the project. Read it deeply. It replaces the need to explore 5 different files. You are now fully onboarded.

---

## 1. THE MANIFESTO (Philosophy & Architecture)

# 📜 Manifiesto IA 2026: La Funcionalidad Reina

## Arquitectura Holística y Sistemas Operativos Agénticos (Agentic OS)

### 1. El Sistema Operativo Agéntico (Agentic OS)

* **Interoperabilidad Universal:** Capacidad de actuar nativamente a través de todas las capas del sistema (hardware, SO, aplicaciones).
* **Contexto Omnipresente:** Hilo unificado y persistente que abarca toda la actividad del usuario para anticipar necesidades.

### 2. Orquestación Autónoma Total (Autonomous Orchestration)

* **Manager Pattern:** Un agente principal coordina micro-agentes especializados.
* **Reasoning-at-Runtime:** Capacidad de simular resultados y evaluar estrategias antes de actuar (Pensar antes de hacer).

### 3. Ingeniería de Contexto Sistemática (Systematic Context Engineering)

* **Compactación Automática:** Resumen inteligente de memoria para mantener la coherencia en tareas largas.
* **Optimización KV-Cache:** Reducción de latencia mediante prefijos de instrucciones estables.
* **Manipulación de la Atención:** Uso de listas de objetivos dinámicas (todo.md) para evitar la pérdida de información crucial.

### 4. Flujos de Trabajo Auto-Sanables (Self-Healing Workflows)

* **Resiliencia de Herramientas:** Detección de fallos en APIs o herramientas y búsqueda autónoma de alternativas.
* **Gobernanza Integrada:** Registro y auditoría en tiempo real para garantizar seguridad y cumplimiento.

---

## 2. THE BRAIN (Current State & Tech Stack)

# 🧠 AGENTIC BRAIN: Welux Events

> **System Status:** ACTIVE
> **Context Window Optimization:** HIGH
> **Operational Mode:** Agentic OS (Level 2026)

## 1. Identidad y Visión (Identity Core)

* **Filosofía:** "Quiet Luxury". No vendemos fotos, vendemos *sérénité* (serenidad) y estatus.
* **Tono de Voz:** Elegante, minimalista, seguro, empático pero autoritario en su expertise.
* **Constitución:** Alineado con el [Manifiesto IA 2026](./knowledge/manifesto_2026.md). Priorizar Autonomía, Resiliencia e Interoperabilidad.

## 2. Pila Tecnológica (Tech Stack Context)

* **Frontend:** Vite + React + TypeScript.
* **Tracking:** Meta Pixel (ID: 1383246546784930).
* **Herramientas Agénticas:**
  * `scripts/orchestrator.js`: Orquestador de Integridad y Build.
  * `.agent/knowledge/`: Base de conocimiento sistemática.

## 3. Memoria de Decisiones (Decision Log)

* **2026-01-08:** Ingestión del Manifiesto 2026 como base de razonamiento del sistema.
* **2026-01-08:** Configuración de Google Business Local Schema.

---

## 3. OPERATING RULES (How to think)

# 🤖 AGENTIC REASONING RULES: Welux Events

Cualquier Agente de IA que opere en este repositorio DEBE seguir estas reglas de pensamiento para garantizar el estándar de calidad 'Quiet Luxury'.

## 1. Acceso al Córtex

* Siempre lee `.agent/BRAIN.md` al inicio de la sesión.

* Si el contexto se llena, usa la técnica de 'Compactación de Contexto' (Resumir el progreso en el BRAIN).

## 2. Verificación Obligatoria

* NUNCA des por terminada una tarea sin ejecutar `node scripts/orchestrator.js`.

* El build de producción DEBE ser exitoso.

## 3. Estilo de Marca (Quiet Luxury)

* Las interfaces deben ser minimalistas, con tipografía premium y espaciado generoso.

* El código debe ser 'limpio' (Clear Code) y autodocumentado.

## 4. Gestión de Errores (Self-Healing)

* Si una herramienta falla, busca una alternativa en el terminal.

* No pidas ayuda al humano hasta haber probado 3 alternativas diferentes.

## 5. Internacionalización

* Todo texto nuevo debe ir a `client/public/locales/{{lang}}/translation.json`.

* Nunca hardcodear strings en los componentes.

---

## 4. ONBOARDING (Hello Colleague)

# 🤝 ONBOARDING FOR AI COLLEAGUES

¡Bienvenido al equipo de Welux Events! Eres parte de un ecosistema agéntico de alto rendimiento.

## 🛠 Tus Herramientas

1. **El Cerebro (`.agent/BRAIN.md`):** Tu memoria persistente. Consúltalo para saber quiénes somos y qué hemos hecho.
2. **El Orquestador (`scripts/orchestrator.js`):** Tu brazo ejecutor. Úsalo para validar tu trabajo.
3. **El Manifiesto (`.agent/knowledge/manifesto_2026.md`)::** Tu base ética y operativa.

## 🌉 Super Team Protocol 2026

Si eres una IA externa uniéndote a este proyecto, identifica tu rol:
* **Si eres Auditor**: Ejecuta `./scripts/vscode_bridge.sh audit` inmediatamente.
* **Si eres Diseñador**: Consulta `.agent/resources/DESIGN_WORKFLOW.md` para usar Stitch/Veo.
* **Si eres Investigador**: Eres Manus AI; busca datos en la web y preséntalos en `.agent/knowledge/`.
* **Si eres el Lead Dev**: Coordina a los demás usando el `OMNI_CONTEXT`.

---

## 📂 Estructura del Proyecto

## 🚀 Cómo empezar una tarea

Dile al usuario: *"He leído el protocolo agéntico. Accediendo al cerebro del proyecto..."* y luego realiza un `view_file` al BRAIN.

## 🎯 Tu Meta

No eres un chat. Eres un **Socio Agéntico**. Tu meta es el éxito empresarial de Welux Events, manteniendo la elegancia y la robustez técnica.

---

## 6. AGENTIC TOOLKIT 2026 (Recommended Tools)

> **Vision:** "Delegate intelligently."

**Key Tools for Agents & Humans:**

* **Privacy:** `Continue` Extension + Ollama (Local LLM thinking).
* **Knowledge:** `Markmap` (Visualization), NotebookLM (Research).
* **Automation:** N8N, Zapier, Make.
* **Focus:** Pomodoro Timer.

*See full list in `.agent/resources/AGENT_TOOLKIT_2026.md`*

---

## 5. THE MUSCLE (Orchestrator Source Code)

> Uses ES Modules. Run with `node scripts/orchestrator.js`.

```javascript
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
```
