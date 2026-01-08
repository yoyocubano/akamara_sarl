
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'es' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <button
            onClick={toggleLanguage}
            className="fixed bottom-6 right-24 z-50 flex items-center gap-2 px-4 py-3 bg-slate-900/80 backdrop-blur border border-white/10 text-white rounded-full hover:bg-slate-800 transition-all font-bold uppercase text-xs"
        >
            <Globe className="w-4 h-4 text-amber-500" />
            {i18n.language === 'en' ? 'ES' : 'EN'}
        </button>
    );
};
