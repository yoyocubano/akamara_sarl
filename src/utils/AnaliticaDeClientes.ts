
/**
 * 🕵️‍♂️ HERRAMIENTA: ANALÍTICA DE CLIENTES
 * ---------------------------------------
 * Esta utilidad gestiona el rastreo de visitantes de forma anónima pero persistente.
 * Ideal para saber "quién" vuelve a visitar la página sin pedir login.
 * 
 * USO EN OTROS PROYECTOS:
 * 1. Copiar este archivo.
 * 2. Asegurar que existe la colección 'analytics_visits' en la base de datos.
 * 3. Importar y llamar a trackVisit() en el componente principal (App.tsx o Layout).
 */

import { databases, APPWRITE_CONFIG } from '../lib/appwrite';
import { ID } from 'appwrite';

const STORAGE_KEY = 'client_analytics_id';

export const AnaliticaDeClientes = {
    /**
     * Obtiene o genera un ID único para el visitante actual.
     * Persiste en localStorage.
     */
    getVisitorId: () => {
        try {
            let id = localStorage.getItem(STORAGE_KEY);
            if (!id) {
                // Generar un ID aleatorio robusto
                id = 'vis_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
                localStorage.setItem(STORAGE_KEY, id);
            }
            return id;
        } catch (e) {
            return 'anonymous_' + Date.now();
        }
    },

    /**
     * Registra una visita en la base de datos.
     * @param path Ruta actual (ej: /contacto)
     */
    trackVisit: async (path: string) => {
        const visitorId = AnaliticaDeClientes.getVisitorId();
        
        // Datos del entorno
        const payload = {
            visitor_id: visitorId,
            page: path,
            screen_size: `${window.innerWidth}x${window.innerHeight}`,
            user_agent: navigator.userAgent?.substring(0, 250) || 'unknown'
        };

        console.log('📊 Analítica de Clientes: Registrando visita...', payload.page);

        try {
            await databases.createDocument(
                APPWRITE_CONFIG.DATABASE_ID,
                APPWRITE_CONFIG.COLLECTIONS.ANALYTICS,
                ID.unique(),
                payload
            );
        } catch (error) {
            // Fallo silencioso para no molestar al usuario
            console.warn('⚠️ Error registrando analítica:', error);
        }
    }
};
