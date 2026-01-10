
import { Orbit, Award, FileText, Shield, Box } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LEGAL_INFO } from '../../constants';

export const LegalSection = () => {
    const { t } = useTranslation();
    return (
      <section className="py-32 bg-slate-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[100px]"></div>
  
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 text-amber-500 mb-6">
                <Orbit className="animate-spin-slow" />
                <span className="text-xs font-black uppercase tracking-[0.3em]">{t('legal_section.subtitle')}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
                {t('legal_section.title_main')} <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">{t('legal_section.title_highlight')}</span>
              </h2>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                {t('legal_section.desc')}
              </p>
  
              <div className="space-y-6">
                <div className="flex space-x-4 p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-amber-500/30 transition-all group">
                  <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center group-hover:bg-amber-500 group-hover:text-slate-900 transition-all text-amber-500">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">{t('legal_section.constitution_title')}</h4>
                    <p className="text-sm text-slate-500 mt-1">{t('legal_section.constitution_desc', { founded: LEGAL_INFO.founded })}</p>
                  </div>
                </div>
                <div className="flex space-x-4 p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-amber-500/30 transition-all group">
                  <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center group-hover:bg-amber-500 group-hover:text-slate-900 transition-all text-amber-500">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">NIT: {LEGAL_INFO.nit}</h4>
                    <p className="text-sm text-slate-500 mt-1">{t('legal_section.nit_desc')}</p>
                  </div>
                </div>
              </div>
            </div>
  
            <div className="relative">
              <div className="relative bg-slate-900/50 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/10 shadow-2xl">
                <div className="absolute -top-10 -right-10 opacity-20">
                  <Shield size={200} className="text-amber-500" />
                </div>
  
                <h3 className="text-2xl font-black text-white mb-6">{t('legal_section.mission_title')}</h3>
                <p className="text-slate-400 italic text-lg leading-relaxed mb-10">
                  {t('legal_section.mission_desc')}
                </p>
  
                <div className="flex items-center space-x-6 border-t border-white/5 pt-8">
                  <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center">
                    <Box className="text-amber-500 w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">{t('legal_section.status_label')}</p>
                    <p className="text-white font-bold text-xl">{t('legal_section.status_value')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
