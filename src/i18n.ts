
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
                        subtitle: 'Antes del tiempo, Akamara',
                        creacion: 'Creación',
                        desc: 'Akamara nace como un ecosistema multiservicios en Cuba. Desde la fabricación de mobiliario de diseño, hasta soluciones logísticas y constructivas integrales.',
                        button_explore: 'Explorar Divisiones',
                        button_legal: 'Ver Credenciales'
                    }
                }
            },
            en: {
                translation: {
                    nav: {
                        hub: 'Main Hub',
                        legal: 'Legal Documents',
                        furniture: 'Furniture',
                        contact: 'Contact'
                    },
                    hero: {
                        title: 'Akamara',
                        subtitle: 'Before time, Akamara',
                        creacion: 'Creation',
                        desc: 'Akamara is born as a multi-service ecosystem in Cuba. From professional furniture manufacturing to integral logistics and construction solutions.',
                        button_explore: 'Explore Divisions',
                        button_legal: 'Legal Credentials'
                    }
                }
            }
        }
    });

export default i18n;
