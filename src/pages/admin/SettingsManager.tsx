
import React, { useState, useEffect } from 'react';
import { Settings, Save, Loader, Mail, Phone, Type, Info } from 'lucide-react';
import { databases, APPWRITE_CONFIG } from '../../lib/appwrite';
import { useConfig } from '../../contexts/ConfigContext';

const SettingsManager = () => {
    const { config, refreshConfig } = useConfig();
    const [formData, setFormData] = useState({
        contact_phone: config.contact_phone,
        contact_email: config.contact_email,
        site_title: config.site_title,
        site_slogan: config.site_slogan,
    });
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        setFormData({
            contact_phone: config.contact_phone,
            contact_email: config.contact_email,
            site_title: config.site_title,
            site_slogan: config.site_slogan,
        });
    }, [config]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ type: '', text: '' });

        try {
            const updates = Object.entries(formData);
            
            // Process updates sequentially to handle 'upsert' logic
            for (const [key, value] of updates) {
                try {
                    // Try to create first (using key as ID for easy lookup)
                    await databases.createDocument(
                        APPWRITE_CONFIG.DATABASE_ID,
                        APPWRITE_CONFIG.COLLECTIONS.SETTINGS,
                        key, // Document ID = Setting Key
                        { key, value }
                    );
                } catch (error: any) {
                    // If conflict (409), document exists, so update it
                    if (error.code === 409) {
                        await databases.updateDocument(
                            APPWRITE_CONFIG.DATABASE_ID,
                            APPWRITE_CONFIG.COLLECTIONS.SETTINGS,
                            key,
                            { value }
                        );
                    } else {
                        throw error;
                    }
                }
            }

            await refreshConfig();
            setMessage({ type: 'success', text: 'Configuración guardada correctamente.' });
        } catch (err: any) {
            console.error('Error saving settings:', err);
            setMessage({ type: 'error', text: `Error: ${err.message}` });
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                        <Settings className="w-8 h-8 text-amber-500" />
                        Configuración General
                    </h1>
                    <p className="text-slate-500 mt-1">Gestiona los datos globales del sitio y contacto.</p>
                </div>
            </div>

            <div className="bg-slate-900/50 border border-white/5 p-8 rounded-2xl max-w-2xl">
                <form onSubmit={handleSave} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                        {/* Site Identity */}
                        <div className="space-y-4">
                            <h3 className="text-amber-500 font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                                <Type className="w-4 h-4" />
                                Identidad Visual
                            </h3>
                            <div>
                                <label className="block text-slate-400 text-xs uppercase tracking-widest font-bold mb-2">Título del Sitio</label>
                                <input
                                    name="site_title"
                                    value={String(formData.site_title || '')}
                                    onChange={handleChange}
                                    className="w-full bg-black/40 border border-white/10 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-amber-500 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-slate-400 text-xs uppercase tracking-widest font-bold mb-2">Slogan</label>
                                <input
                                    name="site_slogan"
                                    value={String(formData.site_slogan || '')}
                                    onChange={handleChange}
                                    className="w-full bg-black/40 border border-white/10 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-amber-500 transition-colors"
                                />
                            </div>
                        </div>

                        <hr className="border-white/5" />

                        {/* Contact Info */}
                        <div className="space-y-4">
                            <h3 className="text-amber-500 font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                                <Info className="w-4 h-4" />
                                Datos de Contacto
                            </h3>
                            <div>
                                <label className="block text-slate-400 text-xs uppercase tracking-widest font-bold mb-2">Email de Contacto</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
                                    <input
                                        name="contact_email"
                                        type="email"
                                        value={String(formData.contact_email || '')}
                                        onChange={handleChange}
                                        className="w-full bg-black/40 border border-white/10 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:border-amber-500 transition-colors"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-slate-400 text-xs uppercase tracking-widest font-bold mb-2">Teléfono / WhatsApp</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
                                    <input
                                        value={String(formData.contact_phone || '')}
                                        className="w-full bg-black/40 border border-white/10 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:border-amber-500 transition-colors"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {message.text && (
                        <div className={`p-4 rounded-lg text-sm font-bold ${message.type === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                            {message.text}
                        </div>
                    )}

                    <div className="pt-6">
                        <button
                            type="submit"
                            disabled={saving}
                            className="w-full bg-amber-600 hover:bg-amber-500 text-white px-6 py-4 rounded-xl font-black uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                            {saving ? <Loader className="animate-spin w-5 h-5" /> : <Save className="w-5 h-5" />}
                            Guardar Cambios
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SettingsManager;
