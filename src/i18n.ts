
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
                    },
                    divisions: {
                        estrategia: {
                            title: 'Estrategia',
                            subtitle: 'Orula / El Tablero',
                            desc: 'Consultoría estratégica y gestión de proyectos. El oráculo de Akamara para decisiones inteligentes y éxito sostenible.',
                            fullTitle: 'Estrategia y Consultoría Inteligente',
                            vision: 'La sabiduría de Orunmila guía cada decisión comercial, transformando la incertidumbre en destinos claros y prósperos.',
                            cta: 'Consultar el Oráculo Akamara',
                            points: {
                                0: 'Análisis de Mercado 360',
                                1: 'Optimización de Procesos SURL',
                                2: 'Gestión de Proyectos VIP',
                                3: 'Consultoría en Inversión Extranjera'
                            }
                        },
                        mobiliario: {
                            title: 'Mobiliario',
                            subtitle: 'Yemayá / La Forma',
                            desc: 'Diseño y fabricación de mobiliario de alto estándar. Maderas preciosas y acabados de lujo para espacios que fluyen como el mar.',
                            fullTitle: 'Mobiliario de Diseño y Confort',
                            vision: 'Como el abrazo de Yemayá, nuestros espacios fluyen con elegancia y serenidad, creando hogares y hoteles de ensueño.',
                            cta: 'Crear mi Espacio Ideal',
                            points: {
                                0: 'Mobiliario Contract (Hotelería)',
                                1: 'Línea Residencial de Lujo',
                                2: 'Diseño de Interiores Personalizado',
                                3: 'Carpintería de Maderas Preciosas'
                            }
                        },
                        construccion: {
                            title: 'Construcción',
                            subtitle: 'Shangó / Fuerza',
                            desc: 'Ejecución de obra civil y terminaciones con solidez estructural. Energía creativa y poder de realización.',
                            fullTitle: 'Construcción Civil e Ingeniería',
                            vision: 'La fuerza imparable de Shangó se materializa en estructuras sólidas, combinando la potencia de la obra con la belleza del rayo.',
                            cta: 'Iniciar mi Obra Maestra',
                            points: {
                                0: 'Mantenimiento Integral de Inmuebles',
                                1: 'Remodelación de Espacios Comerciales',
                                2: 'Infraestructura de Energía Renovables',
                                3: 'Brigadas Especialistas en Acabados'
                            }
                        },
                        gastronomia: {
                            title: 'Gastronomía',
                            subtitle: 'Olokun / Profundidad',
                            desc: 'Alimentación institucional y eventos. Tesoros culinarios desde las profundidades del sabor y la calidad.',
                            fullTitle: 'Gastronomía y Catering de Autor',
                            vision: 'Desde la profundidad de los secretos de Olokun, emergen banquetes que nutren el alma y elevan cualquier celebración.',
                            cta: 'Degustar la Excelencia',
                            points: {
                                0: 'Catering para Eventos Corporativos',
                                1: 'Servicio de Comedor Institucional',
                                2: 'Suministros Alimenticios de Calidad',
                                3: 'Gestión de Banquetes y Protocolo'
                            }
                        },
                        logistica: {
                            title: 'Logística',
                            subtitle: 'Eshú / El Camino',
                            desc: 'Flota especializada y logística 360. Abriendo caminos y asegurando que cada carga llegue a su destino con precisión.',
                            fullTitle: 'Logística y Transporte Nacional',
                            vision: 'Eshú abre los caminos y asegura que cada recurso fluya sin obstáculos a través de la geografía cubana.',
                            cta: 'Abrir nuevos Caminos',
                            points: {
                                0: 'Transporte de Carga Especializada',
                                1: 'Gestión de Almacenes y Distribución',
                                2: 'Mensajería y Envíos Express',
                                3: 'Logística de Abastecimiento Crítico'
                            }
                        }
                    },
                    division_explorer: {
                        subtitle: 'Los Elementos',
                        title: 'Divisiones del Hub'
                    },
                    legal_section: {
                        subtitle: 'La Alquimia Legal',
                        title_main: 'Transparencia y',
                        title_highlight: 'Solidez Jurídica',
                        desc: 'Operamos bajo el marco legal de la República de Cuba como Sociedad Unipersonal de Responsabilidad Limitada (S.U.R.L.), garantizando seguridad en cada transacción comercial.',
                        constitution_title: 'Constitución Oficial',
                        constitution_desc: 'SURL constituida en La Habana el {{founded}}.',
                        nit_desc: 'Registro comercial y fiscal activo certificado.',
                        mission_title: 'Misión Corporativa',
                        mission_desc: '"Ser el catalizador del desarrollo empresarial en Cuba a través de un ecosistema de servicios integrales que prioriza la calidad artesanal y la eficiencia técnica."',
                        status_label: 'Estado',
                        status_value: 'Activo & Certificado'
                    },
                    furniture_section: {
                        badge: 'División Premium',
                        title_main: 'Mobiliario',
                        title_sub: 'Espacios que Inspiran',
                        desc: 'Nuestra división de mobiliario fusiona el confort con el diseño arquitectónico. Creamos piezas que visten vestíbulos de hoteles, espacios residenciales y restaurantes con acabados exclusivos.',
                        list: {
                            0: 'Interiores',
                            1: 'Exteriores & Piscina',
                            2: 'Oficina & Corporativo',
                            3: 'Acabados a Medida'
                        },
                        cta: 'Solicitar Catálogo PDF'
                    },
                    contact_section: {
                        title_main: 'Hablemos de su',
                        title_highlight: 'Proyecto',
                        subtitle: 'Nuestros expertos están listos para asesorarle en cualquiera de nuestras divisiones operativas.',
                        labels: {
                            call: 'Llámenos',
                            write: 'Escribanos',
                            visit: 'Visítenos',
                            name: 'Nombre',
                            company: 'Empresa',
                            division: 'División de Interés',
                            message: 'Mensaje'
                        },
                        cta: 'Enviar Propuesta'
                    },
                    footer: {
                        sectors: 'Sectores',
                        legal: 'Legal',
                        privacy: 'Privacidad',
                        terms: 'Términos',
                        rights: '© {{year}} {{title}} - LA HABANA, CUBA',
                        links: {
                            furniture: 'Mobiliario de Diseño',
                            construction: 'Construcción',
                            catering: 'Catering & Cafetería',
                            transport: 'Transporte Especializado',
                            file: 'Expediente SURL',
                            gazette: 'Gaceta Oficial'
                        }
                    },
                    policies: {
                        title: 'Términos Legales y Privacidad',
                        last_update: 'Última actualización: Enero 2026',
                        back: 'Volver al Inicio',
                        legal_info: {
                            title: '1. Información Legal y Corporativa',
                            intro: 'En cumplimiento de las normativas vigentes en la <strong>República de Cuba</strong> para los nuevos actores económicos, se informa a los usuarios que este sitio web es propiedad y está operado por:',
                            labels: {
                                reason: 'Razón Social:',
                                form: 'Forma Jurídica:',
                                nit: 'NIT:',
                                address: 'Domicilio Social:',
                                framework: 'Marco Regulatorio:'
                            },
                            values: {
                                form: 'Sociedad Unipersonal de Responsabilidad Limitada (S.U.R.L.)',
                                framework: 'Decreto-Ley 46/2021 sobre las Micro, Pequeñas y Medianas Empresas.'
                            },
                            closing: 'La actividad comercial de <strong>AKAMARA S.U.R.L.</strong> se rige estrictamente por la Constitución de la República de Cuba y las leyes complementarias que ordenan el ejercicio del trabajo por cuenta propia y las formas de gestión no estatal.'
                        },
                        privacy: {
                            title: '2. Política de Privacidad y Tratamiento de Datos',
                            intro: '<strong>AKAMARA S.U.R.L.</strong> se compromete a la protección y confidencialidad absoluta de los datos proporcionados por sus clientes y usuarios.',
                            points: {
                                confidentiality: {
                                    title: 'Confidencialidad:',
                                    desc: 'Los datos personales (nombre, correo, teléfono) recolectados a través de formularios de contacto o el chat inteligente serán utilizados <strong>exclusivamente</strong> para fines de comunicación comercial y prestación de servicios.'
                                },
                                no_transfer: {
                                    title: 'No Cesión:',
                                    desc: 'Bajo ninguna circunstancia vendemos, alquilamos o cedemos datos de clientes a terceros, salvo requerimiento expreso de las autoridades legales y judiciales competentes de la República de Cuba.'
                                },
                                security: {
                                    title: 'Seguridad Digital:',
                                    desc: 'Implementamos medidas de seguridad técnicas (cifrado SSL, bases de datos seguras) para evitar el acceso no autorizado, la pérdida o alteración de sus datos.'
                                }
                            }
                        },
                        disclaimer: {
                            title: '3. Exención de Responsabilidad (Disclaimer)',
                            intro: 'AL UTILIZAR ESTE SITIO WEB Y NUESTROS SERVICIOS DIGITALES, USTED ACEPTA LAS SIGUIENTES CONDICIONES:',
                            points: {
                                accuracy: {
                                    title: '3.1 Exactitud de la Información:',
                                    desc: 'Aunque nos esforzamos por mantener la información actualizada, los detalles técnicos, precios y disponibilidad de servicios pueden variar sin previo aviso debido a la dinámica del mercado cubano. Las imágenes son con fines ilustrativos.'
                                },
                                technical: {
                                    title: '3.2 Fallos Técnicos:',
                                    desc: '<strong>AKAMARA S.U.R.L.</strong> no se hace responsable por daños, perjuicios o pérdidas derivadas de fallos en el sistema, servidor o internet, ni por virus informáticos que pudieran infectar el equipo del usuario como consecuencia del acceso o uso del sitio.'
                                },
                                ai: {
                                    title: '3.3 Uso del Chatbot (IA):',
                                    desc: 'Las respuestas proporcionadas por nuestro asistente virtual ("Ori IA" o "Yunior GPT") son generadas por inteligencia artificial. Si bien están entrenadas para ser precisas, no constituyen asesoramiento legal o contractual vinculante. Verifique siempre la información crítica con nuestro personal humano.'
                                },
                                external: {
                                    title: '3.4 Enlaces Externos:',
                                    desc: 'No nos hacemos responsables por el contenido, políticas o prácticas de sitios web de terceros enlazados desde nuestra plataforma.'
                                }
                            }
                        },
                        ip: {
                            title: '4. Propiedad Intelectual',
                            desc: 'Todo el contenido de este sitio (logotipos, textos, diseños, código fuente) es propiedad exclusiva de <strong>AKAMARA S.U.R.L.</strong> o cuenta con las licencias de uso correspondientes. Queda prohibida su reproducción total o parcial sin autorización expresa por escrito.'
                        }
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
                    },
                    divisions: {
                        estrategia: {
                            title: 'Strategy',
                            subtitle: 'Orula / The Board',
                            desc: 'Strategic consulting and project management. Akamara\'s oracle for smart decisions and sustainable success.',
                            fullTitle: 'Smart Strategy & Consulting',
                            vision: 'Orunmila\'s wisdom guides every commercial decision, transforming uncertainty into clear and prosperous destinations.',
                            cta: 'Consult the Akamara Oracle',
                            points: {
                                0: '360 Market Analysis',
                                1: 'SURL Process Optimization',
                                2: 'VIP Project Management',
                                3: 'Foreign Investment Consulting'
                            }
                        },
                        mobiliario: {
                            title: 'Furniture',
                            subtitle: 'Yemayá / The Form',
                            desc: 'Design and manufacture of high-standard furniture. Precious woods and luxury finishes for spaces that flow like the sea.',
                            fullTitle: 'Design & Comfort Furniture',
                            vision: 'Like Yemayá\'s embrace, our spaces flow with elegance and serenity, creating dream homes and hotels.',
                            cta: 'Create my Ideal Space',
                            points: {
                                0: 'Contract Furniture (Hospitality)',
                                1: 'Luxury Residential Line',
                                2: 'Custom Interior Design',
                                3: 'Precious Woods Carpentry'
                            }
                        },
                        construccion: {
                            title: 'Construction',
                            subtitle: 'Shangó / Strength',
                            desc: 'Civil work execution and finishes with structural solidity. Creative energy and power of realization.',
                            fullTitle: 'Civil Construction & Engineering',
                            vision: 'Shangó\'s unstoppable force materializes in solid structures, combining the power of the work with the beauty of lightning.',
                            cta: 'Start my Masterpiece',
                            points: {
                                0: 'Comprehensive Property Maintenance',
                                1: 'Commercial Space Remodeling',
                                2: 'Renewable Energy Infrastructure',
                                3: 'Specialist Finishing Brigades'
                            }
                        },
                        gastronomia: {
                            title: 'Gastronomy',
                            subtitle: 'Olokun / Depth',
                            desc: 'Institutional food and events. Culinary treasures from the depths of flavor and quality.',
                            fullTitle: 'Signature Gastronomy & Catering',
                            vision: 'From the depths of Olokun\'s secrets emerge banquets that nourish the soul and elevate any celebration.',
                            cta: 'Taste Excellence',
                            points: {
                                0: 'Corporate Event Catering',
                                1: 'Institutional Dining Service',
                                2: 'Quality Food Supplies',
                                3: 'Banquet & Protocol Management'
                            }
                        },
                        logistica: {
                            title: 'Logistics',
                            subtitle: 'Eshú / The Path',
                            desc: 'Specialized fleet and 360 logistics. Opening paths and ensuring every cargo reaches its destination with precision.',
                            fullTitle: 'National Logistics & Transport',
                            vision: 'Eshú opens the paths and ensures each resource flows without obstacles across Cuban geography.',
                            cta: 'Open New Paths',
                            points: {
                                0: 'Specialized Cargo Transport',
                                1: 'Warehouse & Distribution Management',
                                2: 'Express Messaging & Shipping',
                                3: 'Critical Supply Logistics'
                            }
                        }
                    },
                    division_explorer: {
                        subtitle: 'The Elements',
                        title: 'Hub Divisions'
                    },
                    legal_section: {
                        subtitle: 'Legal Alchemy',
                        title_main: 'Transparency and',
                        title_highlight: 'Legal Solidity',
                        desc: 'We operate under the legal framework of the Republic of Cuba as a Single-Member Limited Liability Company (S.U.R.L.), guaranteeing security in every commercial transaction.',
                        constitution_title: 'Official Constitution',
                        constitution_desc: 'SURL constituted in Havana on {{founded}}.',
                        nit_desc: 'Active and certified commercial and tax registration.',
                        mission_title: 'Corporate Mission',
                        mission_desc: '"To be the catalyst for business development in Cuba through an ecosystem of comprehensive services that prioritizes artisanal quality and technical efficiency."',
                        status_label: 'Status',
                        status_value: 'Active & Certified'
                    },
                    furniture_section: {
                        badge: 'Premium Division',
                        title_main: 'Furniture',
                        title_sub: 'Spaces that Inspire',
                        desc: 'Our furniture division fuses comfort with architectural design. We create pieces that dress hotel lobbies, residential spaces, and restaurants with exclusive finishes.',
                        list: {
                            0: 'Interiors',
                            1: 'Exteriors & Pool',
                            2: 'Office & Corporate',
                            3: 'Custom Finishes'
                        },
                        cta: 'Request PDF Catalog'
                    },
                    contact_section: {
                        title_main: 'Let\'s talk about your',
                        title_highlight: 'Project',
                        subtitle: 'Our experts are ready to advise you on any of our operating divisions.',
                        labels: {
                            call: 'Call Us',
                            write: 'Write Us',
                            visit: 'Visit Us',
                            name: 'Name',
                            company: 'Company',
                            division: 'Division of Interest',
                            message: 'Message'
                        },
                        cta: 'Send Proposal'
                    },
                    footer: {
                        sectors: 'Sectors',
                        legal: 'Legal',
                        privacy: 'Privacy',
                        terms: 'Terms',
                        rights: '© {{year}} {{title}} - HAVANA, CUBA',
                        links: {
                            furniture: 'Designer Furniture',
                            construction: 'Construction',
                            catering: 'Catering & Cafeteria',
                            transport: 'Specialized Transport',
                            file: 'SURL File',
                            gazette: 'Official Gazette'
                        }
                    },
                    policies: {
                        title: 'Legal Terms & Privacy',
                        last_update: 'Last Updated: January 2026',
                        back: 'Back to Home',
                        legal_info: {
                            title: '1. Legal & Corporate Information',
                            intro: 'In compliance with current regulations in the <strong>Republic of Cuba</strong> for new economic actors, users are informed that this website is owned and operated by:',
                            labels: {
                                reason: 'Company Name:',
                                form: 'Legal Form:',
                                nit: 'Tax ID (NIT):',
                                address: 'Registered Address:',
                                framework: 'Regulatory Framework:'
                            },
                            values: {
                                form: 'Single-Member Limited Liability Company (S.U.R.L.)',
                                framework: 'Decree-Law 46/2021 on Micro, Small, and Medium Enterprises.'
                            },
                            closing: 'The commercial activity of <strong>AKAMARA S.U.R.L.</strong> is strictly governed by the Constitution of the Republic of Cuba and complementary laws regulating self-employment and non-state management forms.'
                        },
                        privacy: {
                            title: '2. Privacy Policy & Data Treatment',
                            intro: '<strong>AKAMARA S.U.R.L.</strong> is committed to the protection and absolute confidentiality of data provided by its clients and users.',
                            points: {
                                confidentiality: {
                                    title: 'Confidentiality:',
                                    desc: 'Personal data (name, email, phone) collected through contact forms or the smart chat will be used <strong>exclusively</strong> for commercial communication and service provision purposes.'
                                },
                                no_transfer: {
                                    title: 'Non-Transfer:',
                                    desc: 'Under no circumstances do we sell, rent, or transfer client data to third parties, except upon express requirement by competent legal and judicial authorities of the Republic of Cuba.'
                                },
                                security: {
                                    title: 'Digital Security:',
                                    desc: 'We implement technical security measures (SSL encryption, secure databases) to prevent unauthorized access, loss, or alteration of your data.'
                                }
                            }
                        },
                        disclaimer: {
                            title: '3. Disclaimer of Liability',
                            intro: 'BY USING THIS WEBSITE AND OUR DIGITAL SERVICES, YOU ACCEPT THE FOLLOWING CONDITIONS:',
                            points: {
                                accuracy: {
                                    title: '3.1 Information Accuracy:',
                                    desc: 'Although we strive to keep information updated, technical details, prices, and service availability may vary without prior notice due to the dynamics of the Cuban market. Images are for illustrative purposes.'
                                },
                                technical: {
                                    title: '3.2 Technical Failures:',
                                    desc: '<strong>AKAMARA S.U.R.L.</strong> is not responsible for damages, losses, or harm derived from system, server, or internet failures, nor for computer viruses that may infect the user\'s equipment as a result of accessing or using the site.'
                                },
                                ai: {
                                    title: '3.3 Use of Chatbot (AI):',
                                    desc: 'Responses provided by our virtual assistant ("Ori AI" or "Yunior GPT") are generated by artificial intelligence. While trained to be accurate, they do not constitute binding legal or contractual advice. Always verify critical information with our human staff.'
                                },
                                external: {
                                    title: '3.4 External Links:',
                                    desc: 'We are not responsible for the content, policies, or practices of third-party websites linked from our platform.'
                                }
                            }
                        },
                        ip: {
                            title: '4. Intellectual Property',
                            desc: 'All content on this site (logos, texts, designs, source code) is the exclusive property of <strong>AKAMARA S.U.R.L.</strong> or has the corresponding use licenses. Total or partial reproduction regarding this content is prohibited without express written authorization.'
                        }
                    }
                }
            }
        }
    });

export default i18n;
