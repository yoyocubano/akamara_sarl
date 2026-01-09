
import React, { createContext, useContext, useEffect, useState } from 'react';
import { databases, APPWRITE_CONFIG } from '../lib/appwrite';

interface Config {
    [key: string]: string | number | boolean;
}

interface ConfigContextType {
    config: Config;
    loading: boolean;
    refreshConfig: () => Promise<void>;
}

const defaultConfig: Config = {
    site_name: 'Akamara S.U.R.L.',
    maintenance_mode: false,
    contact_email: 'contacto@akamara.cu',
    phone_number: '+53 52849673',
};

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [config, setConfig] = useState<Config>(defaultConfig);
    const [loading, setLoading] = useState(true);

    const fetchConfig = async () => {
        try {
            const { documents } = await databases.listDocuments(
                APPWRITE_CONFIG.DATABASE_ID,
                APPWRITE_CONFIG.COLLECTIONS.SETTINGS
            );
            
            if (documents.length > 0) {
                const newConfig = { ...defaultConfig };
                documents.forEach((item: any) => {
                    if (item.key in newConfig) {
                        (newConfig as any)[item.key] = item.value;
                    }
                });
                setConfig(newConfig);
            }
        } catch (err) {
            console.warn('Error fetching config, using defaults:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchConfig();
        // Appwrite Realtime could be added here later
    }, []);

    return (
        <ConfigContext.Provider value={{ config, loading, refreshConfig: fetchConfig }}>
            {children}
        </ConfigContext.Provider>
    );
};

export const useConfig = () => {
    const context = useContext(ConfigContext);
    if (context === undefined) {
        throw new Error('useConfig must be used within a ConfigProvider');
    }
    return context;
};
