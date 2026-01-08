
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        fallbackLng: 'es',
        interpolation: {
            escapeValue: false,
        },
        resources: {
            es: {
                translation: {
                    nav: {
                        hub: 'Hub Principal',
                        legal: 'Expediente Legal',
                        furniture: 'Mobiliario',
                        contact: 'Contacto'
                    },
                    hero: {
                        title: 'Akamara',
                        subtitle: 'Inicio de la Creación',
                        desc: 'Donde la materia prima encuentra su propósito divino.'
                    }
                }
            },
            en: {
                translation: {
                    nav: {
                        hub: 'Main Hub',
                        legal: 'Legal File',
                        furniture: 'Furniture',
                        contact: 'Contact'
                    },
                    hero: {
                        title: 'Akamara',
                        subtitle: 'Genesis of Creation',
                        desc: 'Where raw matter finds its divine purpose.'
                    }
                }
            }
        }
    });

export default i18n;
