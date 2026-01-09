
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useConfig } from '../../contexts/ConfigContext';
import { LEGAL_INFO } from '../../constants';
// Asegúrate de tener el logo importado o pasarlo como prop. 
// Para portabilidad, importamos desde assets relativos
import logo from '../../assets/logo.png';

export const Footer = () => {
  const { config } = useConfig();
  const { t } = useTranslation();
  
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-white/5 py-24 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <img src={logo} alt="Akamara Logo" className="w-12 h-12 object-contain" />
              <span className="text-2xl font-black uppercase tracking-tighter">{config.site_title || 'Akamara S.U.R.L.'}</span>
            </Link>
            <p className="text-slate-500 max-w-sm text-sm leading-relaxed mb-6 italic">
              "{config.site_slogan || 'Inicio de la creación. Ecosistema de servicios integrales operando bajo licencia mercantil en la República de Cuba.'}"
            </p>
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-amber-500 mb-6">{t('footer.sectors')}</h4>
            <ul className="space-y-4 text-xs text-slate-400 font-medium">
              <Link to="/catalogo"><li className="hover:text-white transition-colors cursor-pointer">{t('footer.links.furniture')}</li></Link>
              <li className="hover:text-white transition-colors cursor-pointer">{t('footer.links.construction')}</li>
              <li className="hover:text-white transition-colors cursor-pointer">{t('footer.links.catering')}</li>
              <li className="hover:text-white transition-colors cursor-pointer">{t('footer.links.transport')}</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-amber-500 mb-6">{t('footer.legal')}</h4>
            <ul className="space-y-4 text-xs text-slate-400 font-medium">
              <li className="hover:text-white transition-colors cursor-pointer">{t('footer.links.file')}</li>
              <li className="hover:text-white transition-colors cursor-pointer flex items-center justify-between">
                <span>NIT: {LEGAL_INFO.nit}</span>
                <Shield size={12} className="text-green-500" />
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">{t('footer.links.gazette')}</li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[9px] font-black uppercase tracking-[0.2em] text-slate-600">
          <p>{t('footer.rights', { year: currentYear, title: config.site_title || 'AKAMARA S.U.R.L.' })}</p>
          <div className="flex space-x-6">
            <Link to="/politicas" className="hover:text-amber-500 transition-colors cursor-pointer">{t('footer.privacy')}</Link>
            <Link to="/politicas" className="hover:text-amber-500 transition-colors cursor-pointer">{t('footer.terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
