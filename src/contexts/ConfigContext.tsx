
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface Config {
    contact_phone: string;
    contact_email: string;
    site_title: string;
    site_slogan: string;
}

interface ConfigContextType {
    config: Config;
    loading: boolean;
    refreshConfig: () => Promise<void>;
}

const defaultConfig: Config = {
    contact_phone: '+53 5 8746866',
    contact_email: 'direccion@akamara.cu',
    site_title: 'Akamara S.U.R.L.',
    site_slogan: 'Inicio de la Creación'
};

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [config, setConfig] = useState<Config>(defaultConfig);
    const [loading, setLoading] = useState(true);

    const fetchConfig = async () => {
        try {
            const { data, error } = await supabase.from('site_settings').select('key, value');
            if (error) {
                console.warn('Error fetching config, using defaults:', error.message);
            } else if (data) {
                const newConfig = { ...defaultConfig };
                data.forEach((item: { key: string; value: string }) => {
                    if (item.key in newConfig) {
                        (newConfig as any)[item.key] = item.value;
                    }
                });
                setConfig(newConfig);
            }
        } catch (err) {
            console.error('Unexpected error fetching config:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchConfig();

        // Subscribe to changes
        const channel = supabase
            .channel('site_settings_changes')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'site_settings' }, () => {
                fetchConfig();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
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
