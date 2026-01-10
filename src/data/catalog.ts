
export interface CatalogItem {
  id: string;
  name_es: string;
  name_en: string;
  category: 'seats' | 'tables' | 'habitational' | 'outdoor' | 'office' | 'special' | 'services';
  description_es: string;
  description_en: string;
  details_es: string[];
  details_en: string[];
  price_info?: string;
  image: string;
  type: 'product' | 'service';
}

export const CATALOG_DATA: CatalogItem[] = [
  // --- SECCIÓN: ASIENTOS (SEATS) ---
  {
    id: 'butaca-premium-akamara',
    name_es: 'Butaca Ejecutiva "Akamara Premium"',
    name_en: 'Executive Armchair "Akamara Premium"',
    category: 'seats',
    description_es: 'Butaca de alto confort fabricada con maderas preciosas y tapicería náutica de alta resistencia.',
    description_en: 'High-comfort armchair made with precious woods and high-resistance nautical upholstery.',
    details_es: [
      'Estructura de Caoba o Cedro certificada.',
      'Tapicería ergonómica con espuma de alta densidad.',
      'Acabado en barniz poliuretano mate o brillante.',
      'Ideal para despachos directivos y salas VIP.'
    ],
    details_en: [
      'Certified Mahogany or Cedar structure.',
      'Ergonomic upholstery with high-density foam.',
      'Matte or glossy polyurethane varnish finish.',
      'Ideal for executive offices and VIP lounges.'
    ],
    image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=800',
    type: 'product'
  },
  {
    id: 'sofa-modular-shango',
    name_es: 'Sofá Modular "Shangó"',
    name_en: '"Shangó" Modular Sofa',
    category: 'seats',
    description_es: 'Sistema de asientos modulares reconfigurables para espacios de alto tráfico y recepciones.',
    description_en: 'Reconfigurable modular seating system for high-traffic areas and receptions.',
    details_es: [
      'Módulos independientes combinables.',
      'Tejidos técnicos antimanchas y retardantes al fuego.',
      'Base reforzada de acero o madera.',
      'Disponible en múltiples colores corporativos.'
    ],
    details_en: [
      'Combinable independent modules.',
      'Stain-resistant and fire-retardant technical fabrics.',
      'Reinforced steel or wood base.',
      'Available in multiple corporate colors.'
    ],
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800',
    type: 'product'
  },

  // --- SECCIÓN: MESAS (TABLES) ---
  {
    id: 'mesa-conferencia-imperial',
    name_es: 'Mesa de Juntas "Imperial"',
    name_en: '"Imperial" Conference Table',
    category: 'tables',
    description_es: 'Superficie imponente para salas de conferencias con gestión de cables integrada.',
    description_en: 'Stunning surface for conference rooms with integrated cable management.',
    details_es: [
      'Capacidad para 10-16 personas.',
      'Superficie tratada contra rayaduras y calor.',
      'Cajas de conectividad multimedia ocultas.',
      'Diseño minimalista con bases estructurales ocultas.'
    ],
    details_en: [
      'Capacity for 10-16 people.',
      'Scratch and heat resistant treated surface.',
      'Hidden multimedia connectivity boxes.',
      'Minimalist design with hidden structural bases.'
    ],
    image: 'https://images.unsplash.com/photo-1542744094-3a5fc78d2243?q=80&w=800',
    type: 'product'
  },
  {
    id: 'escritorio-direccion-noble',
    name_es: 'Escritorio de Dirección "Noble"',
    name_en: '"Noble" Executive Desk',
    category: 'office',
    description_es: 'Mueble de mando con acabados en piel sintética y madera maciza, diseñado para la excelencia directiva.',
    description_en: 'Command furniture with synthetic leather finishes and solid wood, designed for executive excellence.',
    details_es: [
      'Cajonera lateral con cierre de seguridad.',
      'Zona de trabajo con inserción de piel.',
      'Pasacables de aluminio cepillado.',
      'Dimensiones personalizables según espacio.'
    ],
    details_en: [
      'Lateral drawer unit with safety lock.',
      'Work area with leather insertion.',
      'Brushed aluminum cable glands.',
      'Customizable dimensions according to space.'
    ],
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=800',
    type: 'product'
  },

  // --- SECCIÓN: HABITACIONAL (HABITATIONAL) ---
  {
    id: 'cama-dujo-king',
    name_es: 'Cama King Size "Dujo Reborn"',
    name_en: 'King Size "Dujo Reborn" Bed',
    category: 'habitational',
    description_es: 'Juego de habitación de lujo que evoca la herencia artesanal con tecnología moderna.',
    description_en: 'Luxury bedroom set evoking artisanal heritage with modern technology.',
    details_es: [
      'Cabecero artesanal tallado.',
      'Sistema de iluminación LED indirecta integrada.',
      'Mesitas de noche flotantes coordinadas.',
      'Soporte ortopédico reforzado.'
    ],
    details_en: [
      'Artisanal carved headboard.',
      'Integrated indirect LED lighting system.',
      'Coordinated floating nightstands.',
      'Reinforced orthopedic support.'
    ],
    image: 'https://images.unsplash.com/photo-1505693314120-0d443867821c?q=80&w=800',
    type: 'product'
  },

  // --- SECCIÓN: EXTERIOR (OUTDOOR) ---
  {
    id: 'tumbona-horizonte-teal',
    name_es: 'Tumbona Ergonómica "Horizonte"',
    name_en: '"Horizonte" Ergonomic Lounger',
    category: 'outdoor',
    description_es: 'Resistente al salitre y rayos UV, ideal para hoteles de playa y piscinas privadas.',
    description_en: 'Salt-spray and UV resistant, ideal for beach hotels and private pools.',
    details_es: [
      'Estructura de aluminio anodizado.',
      'Malla técnica transpirable de alta durabilidad.',
      'Respaldo ajustable en 5 posiciones.',
      'Ruedas discretas para fácil desplazamiento.'
    ],
    details_en: [
      'Anodized aluminum structure.',
      'High-durability breathable technical mesh.',
      'Adjustable backrest in 5 positions.',
      'Discreet wheels for easy movement.'
    ],
    image: 'https://images.unsplash.com/photo-1511914265872-c4067ac5f448?q=80&w=800',
    type: 'product'
  },

  // --- SECCIÓN: SERVICIOS (SERVICES) ---
  {
    id: 'servicio-interiorismo-360',
    name_es: 'Interiorismo y Proyectos Llave en Mano',
    name_en: 'Interior Design & Turnkey Projects',
    category: 'services',
    description_es: 'Solución integral desde la concepción del diseño hasta el montaje final del espacio.',
    description_en: 'Integral solution from design conception to final space assembly.',
    details_es: [
      'Levantamiento arquitectónico y modelado 3D.',
      'Selección de paleta de colores y materiales.',
      'Fabricación personalizada de todo el mobiliario.',
      'Instalación técnica por personal especializado.'
    ],
    details_en: [
      'Architectural survey and 3D modeling.',
      'Color palette and materials selection.',
      'Custom manufacturing of all furniture.',
      'Technical installation by specialized personnel.'
    ],
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800',
    type: 'service'
  },
  {
    id: 'servicio-logistica-camino',
    name_es: 'Logística y Distribución Nacional',
    name_en: 'National Logistics & Distribution',
    category: 'services',
    description_es: 'Gestión eficiente para el transporte de carga pesada y delicada en todo el territorio.',
    description_en: 'Efficient management for the transport of heavy and delicate cargo throughout the territory.',
    details_es: [
      'Flota moderna con sistema de monitoreo.',
      'Personal experto en manipulación de mobiliario.',
      'Seguro de carga contra todo riesgo.',
      'Entregas programadas JIT (Just-In-Time).'
    ],
    details_en: [
      'Modern fleet with monitoring system.',
      'Expert personnel in furniture handling.',
      'All-risk cargo insurance.',
      'Scheduled JIT (Just-In-Time) deliveries.'
    ],
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800',
    type: 'service'
  },
  {
    id: 'servicio-consultoria-estrategica',
    name_es: 'Consultoría y Gestión de Proyectos',
    name_en: 'Consulting & Project Management',
    category: 'services',
    description_es: 'Asesoría especializada para empresas que inician operaciones o expanden en Cuba.',
    description_en: 'Specialized advice for companies starting operations or expanding in Cuba.',
    details_es: [
      'Análisis de factibilidad económica.',
      'Gestión de licencias y cumplimiento legal.',
      'Optimización de la cadena de suministro.',
      'Supervisión técnica de obras civiles.'
    ],
    details_en: [
      'Economic feasibility analysis.',
      'Licensing and legal compliance management.',
      'Supply chain optimization.',
      'Technical supervision of civil works.'
    ],
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800',
    type: 'service'
  },
  {
    id: 'servicio-construccion-remodelacion',
    name_es: 'Construcción y Remodelación Especializada',
    name_en: 'Specialized Construction & Remodeling',
    category: 'services',
    description_es: 'Ejecución de obras de ingeniería civil con acabados de alto estándar para el sector turístico.',
    description_en: 'Execution of civil engineering works with high-standard finishes for the tourism sector.',
    details_es: [
      'Remodelación de locales comerciales y oficinas.',
      'Instalaciones eléctricas e hidráulicas industriales.',
      'Mantenimiento preventivo y correctivo de inmuebles.',
      'Garantía estructural por 10 años.'
    ],
    details_en: [
      'Remodeling of commercial premises and offices.',
      'Industrial electrical and hydraulic installations.',
      'Preventive and corrective property maintenance.',
      '10-year structural warranty.'
    ],
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=800',
    type: 'service'
  },
  {
    id: 'servicio-gastronomia-akamara',
    name_es: 'Catering de Alta Gama y Eventos',
    name_en: 'High-End Catering & Events',
    category: 'services',
    description_es: 'Experiencias culinarias personalizadas con productos locales de primera calidad.',
    description_en: 'Personalized culinary experiences with premium local products.',
    details_es: [
      'Diseño de menú de autor bilingüe.',
      'Personal de servicio uniformado y multilingüe.',
      'Equipamiento gastronómico profesional de alta gama.',
      'Gestión de maridajes y coctelería premium.'
    ],
    details_en: [
      'Bilingual signature menu design.',
      'Uniformed and multilingual service staff.',
      'High-end professional gastronomic equipment.',
      'Management of pairings and premium cocktails.'
    ],
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800',
    type: 'service'
  },
  {
    id: 'cocina-minimalista-lux',
    name_es: 'Cocina Integral "Minimalist Lux"',
    name_en: '"Minimalist Lux" Fitted Kitchen',
    category: 'habitational',
    description_es: 'Mobiliario de cocina con sistemas de cierre suave y acabados ultra-mate antihuellas.',
    description_en: 'Kitchen furniture with soft-close systems and anti-fingerprint ultra-matte finishes.',
    details_es: [
      'Herrajes europeos de alta resistencia.',
      'Encimeras de piedra natural o compacta.',
      'Integración oculta de electrodomésticos.',
      'Iluminación LED sensorial inteligente.'
    ],
    details_en: [
      'High-resistance European hardware.',
      'Natural or compact stone countertops.',
      'Hidden appliance integration.',
      'Smart sensory LED lighting.'
    ],
    image: 'https://images.unsplash.com/photo-1556911223-44704237cdd6?q=80&w=800',
    type: 'product'
  },
  {
    id: 'mostrador-recepcion-zen',
    name_es: 'Mostrador de Recepción "Zen"',
    name_en: '"Zen" Reception Desk',
    category: 'office',
    description_es: 'Primera impresión imponente para hoteles y centros corporativos con iluminación frontal.',
    description_en: 'Stunning first impression for hotels and corporate centers with front lighting.',
    details_es: [
      'Doble nivel de atención (cliente/administrativo).',
      'Acabado en Corian o madera natural.',
      'Gestión oculta de cables y periféricos.',
      'Iluminación perimetral cálida regulada.'
    ],
    details_en: [
      'Double level of service (customer/administrative).',
      'Finished in Corian or natural wood.',
      'Hidden management of cables and peripherals.',
      'Regulated warm perimeter lighting.'
    ],
    image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=800',
    type: 'product'
  }
];
