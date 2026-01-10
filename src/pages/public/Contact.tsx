
import React, { useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useConfig } from '../../contexts/ConfigContext';
import { LEGAL_INFO } from '../../constants';

export const Contact = () => {
  const { config } = useConfig();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: '', company: '', division: 'Estrategia', message: '', email: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
        // Usar la función serverless de Cloudflare
        const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || 'Error enviando formulario');
        }

        alert('Gracias. Hemos recibido tu mensaje correctamente.');
        setFormData({ name: '', company: '', division: 'Estrategia', message: '', email: '' });
    } catch (error: any) {
        console.error('Submission Error:', error);
        alert(`Hubo un error al enviar: ${error.message}. Por favor intenta contactar directamente por email.`);
    } finally {
        setSending(false);
    }
  };

  return (
    <div className="pt-40 pb-24 bg-void min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-slate-900 border border-white/10 rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row">
          <div className="bg-slate-950 p-12 text-white md:w-2/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5">
              <MapPin size={150} />
            </div>
            <h2 className="text-3xl font-black mb-6 leading-tight">{t('contact_section.title_main')} <span className="text-amber-500">{t('contact_section.title_highlight')}</span>.</h2>
            <p className="text-slate-400 text-sm mb-12 font-light">{t('contact_section.subtitle')}</p>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{t('contact_section.labels.call')}</p>
                  <p className="text-white font-bold">{config.contact_phone}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => window.location.href = `mailto:${config.contact_email}`}>
                <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{t('contact_section.labels.write')}</p>
                  <p className="text-white font-bold">{config.contact_email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{t('contact_section.labels.visit')}</p>
                  <p className="text-white font-bold">{LEGAL_INFO.location}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-12 md:w-3/5 bg-slate-900">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] uppercase font-black tracking-widest text-slate-500 mb-2 block">{t('contact_section.labels.name')}</label>
                  <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} type="text" className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-amber-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-black tracking-widest text-slate-500 mb-2 block">{t('contact_section.labels.company')}</label>
                  <input value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} type="text" className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-amber-500 outline-none transition-all" />
                </div>
              </div>
              <div>
                  <label className="text-[10px] uppercase font-black tracking-widest text-slate-500 mb-2 block">Email</label>
                  <input required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} type="email" className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-amber-500 outline-none transition-all" />
              </div>
              <div>
                <label className="text-[10px] uppercase font-black tracking-widest text-slate-500 mb-2 block">{t('contact_section.labels.division')}</label>
                <select value={formData.division} onChange={e => setFormData({...formData, division: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-amber-500 outline-none transition-all appearance-none cursor-pointer">
                  <option>Estrategia</option>
                  <option>Mobiliario</option>
                  <option>Construcción</option>
                  <option>Logística</option>
                  <option>Gastronomía</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] uppercase font-black tracking-widest text-slate-500 mb-2 block">{t('contact_section.labels.message')}</label>
                <textarea required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} rows={4} className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-amber-500 outline-none transition-all"></textarea>
              </div>
              <button disabled={sending} className="w-full bg-amber-500 text-slate-950 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-amber-400 hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] disabled:opacity-50">
                {sending ? 'Enviando...' : t('contact_section.cta')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
