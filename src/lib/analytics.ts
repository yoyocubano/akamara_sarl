
import { databases, APPWRITE_CONFIG } from './appwrite';
import { ID } from 'appwrite';

export const trackEvent = async (action: string, metadata: Record<string, any> = {}) => {
    try {
        // We reuse the 'analytics_visits' collection for events, using 'action' as the page identifier prefix
        // or just embedding it. To keep it simple and compatible with current schema:
        // page: "EVENT: <action>"
        // screen_size: JSON stringified metadata if needed, or just standard info
        
        const visitorId = localStorage.getItem('akamara_visitor_id') || 'anonymous';
        
        await databases.createDocument(
            APPWRITE_CONFIG.DATABASE_ID,
            APPWRITE_CONFIG.COLLECTIONS.ANALYTICS,
            ID.unique(),
            {
                page: `EVENT:${action}`,
                visitor_id: visitorId,
                screen_size: JSON.stringify(metadata), // Storing extra data here for now
                user_agent: navigator.userAgent
            }
        );
        console.log(`[Analytics] Tracked event: ${action}`);
    } catch (error) {
        console.warn('[Analytics] Failed to track event:', error);
    }
};
