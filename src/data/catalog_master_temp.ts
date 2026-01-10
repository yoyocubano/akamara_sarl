
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
    id: 'silla-akamara-classic-01',
    name_es: 'Silla Akamara "Classic Elegance"',
    name_en: 'Akamara "Classic Elegance" Chair',
    category: 'seats',
    description_es: 'Silla con brazos de diseño atemporal, estructura de madera noble con asiento y respaldo totalmente tapizados.',
    description_en: 'Timeless design armchair with noble wood structure and fully upholstered seat and backrest.',
    details_es: [
      'Dimensiones: 620 x 660 x 825 mm.',
      'Estructura de madera maciza seleccionada.',
      'Tapicería de alta costura personalizable.',
      'Ergonomía superior para comedores de lujo.'
    ],
    details_en: [
      'Dimensions: 620 x 660 x 825 mm.',
      'Selected solid wood structure.',
      'Customizable high-fashion upholstery.',
      'Superior ergonomics for luxury dining.'
    ],
    image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=800',
    type: 'product'
  },
  {
    id: 'butaca-akamara-zenith',
    name_es: 'Butaca Akamara "Zenith"',
    name_en: 'Akamara "Zenith" Armchair',
    category: 'seats',
    description_es: 'Pieza escultural de estructura robusta, diseñada para el descanso profundo en áreas comunes u hoteles.',
    description_en: 'Sculptural piece with a robust structure, designed for deep relaxation in common areas or hotels.',
    details_es: [
      'Dimensiones: 700 x 700 x 760 mm.',
      'Cojín tapizado fijo de alta resiliencia.',
      'Base de madera con acabado protector UV.',
      'Estilo contemporáneo minimalista.'
    ],
    details_en: [
      'Dimensions: 700 x 700 x 760 mm.',
      'Fixed high-resilience upholstered cushion.',
      'Wood base with UV protective finish.',
      'Minimalist contemporary style.'
    ],
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=800',
    type: 'product'
  },
  {
    id: 'sofa-akamara-modular-l',
    name_es: 'Sofá Modular Akamara "Infinity L"',
    name_en: 'Akamara "Infinity L" Modular Sofa',
    category: 'seats',
    description_es: 'Sofá con Chaise Longue de gran formato, ideal para lobbies ejecutivos o salones residenciales de lujo.',
    description_en: 'Large format Chaise Longue sofa, ideal for executive lobbies or luxury residential lounges.',
    details_es: [
      'Dimensiones: 2300 x 1600 x 800 mm.',
      'Estructura interna de madera reforzada.',
      'Tapizado integral en textiles premium.',
      'Configuración modular adaptable.'
    ],
    details_en: [
      'Dimensions: 2300 x 1600 x 800 mm.',
      'Reinforced wood internal structure.',
      'Full upholstery in premium textiles.',
      'Adaptable modular configuration.'
    ],
    image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=800',
    type: 'product'
  },

  // --- SECCIÓN: HABITACIONAL (HABITATIONAL) ---
  {
    id: 'mesita-akamara-nocturne',
    name_es: 'Mesita de Noche Akamara "Nocturne"',
    name_en: 'Akamara "Nocturne" Nightstand',
    category: 'habitational',
    description_es: 'Diseño compacto y funcional con dos gavetas, tiradores metálicos y acabados en madera preciosa.',
    description_en: 'Compact and functional design with two drawers, metal handles, and precious wood finishes.',
    details_es: [
      'Dimensiones: 500 x 450 x 500 mm.',
      'Elaborada en madera y tablero MDF enchapado.',
      'Sistema de deslizamiento suave en gavetas.',
      'Disponible en diversos tintes de madera.'
    ],
    details_en: [
      'Dimensions: 500 x 450 x 500 mm.',
      'Made of wood and veneered MDF board.',
      'Smooth sliding system in drawers.',
      'Available in various wood stains.'
    ],
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=800',
    type: 'product'
  },
  {
    id: 'cabecero-akamara-majestic',
    name_es: 'Cabecero Akamara "Majestic"',
    name_en: 'Akamara "Majestic" Headboard',
    category: 'habitational',
    description_es: 'Cabecero matrimonial de gran impacto visual con paneles contrastantes y ranuras decorativas.',
    description_en: 'High impact matrimonial headboard with contrasting panels and decorative grooves.',
    details_es: [
      'Dimensiones: 2650 x 70 x 900 mm.',
      'Acabados artesanales de alta precisión.',
      'Paneles de MDF con texturas modernas.',
      'Anclaje de seguridad a pared incluido.'
    ],
    details_en: [
      'Dimensions: 2650 x 70 x 900 mm.',
      'High-precision handcrafted finishes.',
      'MDF panels with modern textures.',
      'Wall safety anchors included.'
    ],
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=800',
    type: 'product'
  },

  // --- SECCIÓN: MESAS (TABLES) ---
  {
    id: 'mesa-centro-akamara-orb',
    name_es: 'Mesa de Centro Akamara "Orb"',
    name_en: 'Akamara "Orb" Coffee Table',
    category: 'tables',
    description_es: 'Mesa circular de centro que combina la calidez de la madera con una sofisticada tapa de cristal.',
    description_en: 'Circular coffee table combining the warmth of wood with a sophisticated glass top.',
    details_es: [
      'Dimensiones: Diámetro 900 x 300 mm.',
      'Estructura de madera maciza torneada.',
      'Tapa de cristal templado opcional.',
      'Diseño Zen para espacios de relajación.'
    ],
    details_en: [
      'Dimensions: Diameter 900 x 300 mm.',
      'Turned solid wood structure.',
      'Optional tempered glass top.',
      'Zen design for relaxation spaces.'
    ],
    image: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?q=80&w=800',
    type: 'product'
  },
  {
    id: 'mesa-akamara-imperial-grand',
    name_es: 'Mesa de Comedor Akamara "Imperial Grand"',
    name_en: 'Akamara "Imperial Grand" Dining Table',
    category: 'tables',
    description_es: 'Imponente mesa de comedor con base de diseño dual y superficie de madera tratada para alta duración.',
    description_en: 'Stunning dining table with dual design base and long-lasting treated wood surface.',
    details_es: [
      'Dimensiones: 2200 x 1200 x 745 mm.',
      'Capacidad para 8-10 comensales.',
      'Base de madera y MDF reforzada.',
      'Ideal para residencias diplomáticas y villas.'
    ],
    details_en: [
      'Dimensions: 2200 x 1200 x 745 mm.',
      'Capacity for 8-10 people.',
      'Reinforced wood and MDF base.',
      'Ideal for diplomatic residences and villas.'
    ],
    image: 'https://images.unsplash.com/photo-1577145946469-1c3158b1dd3e?q=80&w=800',
    type: 'product'
  },

  // --- SECCIÓN: EXTERIOR (OUTDOOR) ---
  {
    id: 'tumbona-akamara-oceanic',
    name_es: 'Tumbona Akamara "Oceanic"',
    name_en: 'Akamara "Oceanic" Lounger',
    category: 'outdoor',
    description_es: 'Silla de descanso para exteriores tapizada en polipiel técnica resistente al sol y al salitre.',
    description_en: 'Outdoor lounging chair upholstered in sun and salt-resistant technical poly-leather.',
    details_es: [
      'Dimensiones: 1870 x 760 x 810 mm.',
      'Estructura de madera dura tratada.',
      'Relleno de espuma de celda cerrada (no absorbe agua).',
      'Diseño ergonómico flotante.'
    ],
    details_en: [
      'Dimensions: 1870 x 760 x 810 mm.',
      'Treated hardwood structure.',
      'Closed-cell foam filling (doesn\'t absorb water).',
      'Floating ergonomic design.'
    ],
    image: 'https://images.unsplash.com/photo-1511914265872-c4067ac5f448?q=80&w=800',
    type: 'product'
  },
  {
    id: 'cama-balinesa-akamara-sanctuary',
    name_es: 'Cama Balinesa Akamara "Sanctuary"',
    name_en: 'Akamara "Sanctuary" Balinese Bed',
    category: 'outdoor',
    description_es: 'Estructura monumental para exteriores en madera de teca con cortinas y colchón de alta gama.',
    description_en: 'Monumental outdoor structure in teak wood with curtains and high-end mattress.',
    details_es: [
      'Dimensiones: 2002 x 2002 x 2180 mm.',
      'Madera de teca con acabado en aceite marino.',
      'Tratamiento fungicida e insecticida profesional.',
      'El epítome del lujo para resorts y piscinas.'
    ],
    details_en: [
      'Dimensions: 2002 x 2002 x 2180 mm.',
      'Teak wood with marine oil finish.',
      'Professional fungicide and insecticide treatment.',
      'The epitome of luxury for resorts and pools.'
    ],
    image: 'https://images.unsplash.com/photo-1544161515-4af6b1d82095?q=80&w=800',
    type: 'product'
  },

  // --- SECCIÓN: OFICINA (OFFICE) ---
  {
    id: 'buro-akamara-directivo-nobel',
    name_es: 'Buró Directivo Akamara "Nobel"',
    name_en: 'Akamara "Nobel" Executive Desk',
    category: 'office',
    description_es: 'Escritorio ejecutivo de alta gama con retorno y almacenamiento integrado para profesionales.',
    description_en: 'High-end executive desk with return and integrated storage for professionals.',
    details_es: [
      'Diseño en "L" con pedestal de gavetas.',
      'Pasacables de diseño oculto.',
      'Acabado en madera bitono elegante.',
      'Dimensiones generosas para multitarea.'
    ],
    details_en: [
      ' "L" design with drawer pedestal.',
      'Hidden design cable glands.',
      'Elegant two-tone wood finish.',
      'Generous dimensions for multitasking.'
    ],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800',
    type: 'product'
  },

  // --- SECCIÓN: ESPECIAL (SPECIAL) ---
  {
    id: 'cunita-akamara-dreamer',
    name_es: 'Cuna Akamara "Little Dreamer"',
    name_en: 'Akamara "Little Dreamer" Crib',
    category: 'special',
    description_es: 'Cuna artesanal elaborada en madera de Haya, acabados no tóxicos y baranda plegable de seguridad.',
    description_en: 'Handcrafted crib made of Beech wood, non-toxic finishes, and folding safety railing.',
    details_es: [
      'Dimensiones: 1200 x 600 x 850 mm.',
      'Acabado blanco nitro certificado para bebés.',
      'Sistema de patas con ruedas bloqueables.',
      'Diseño ergonómico para el cuidado del infante.'
    ],
    details_en: [
      'Dimensions: 1200 x 600 x 850 mm.',
      'Certified non-toxic baby white nitro finish.',
      'Lockable wheel leg system.',
      'Ergonomic design for infant care.'
    ],
    image: 'https://images.unsplash.com/photo-1544122159-390dc39989fd?q=80&w=800',
    type: 'product'
  },
  {
    id: 'atril-akamara-orator',
    name_es: 'Atril de Conferencias Akamara "Orator"',
    name_en: 'Akamara "Orator" Conference Lectern',
    category: 'special',
    description_es: 'Atril profesional para eventos y conferencias, con estantes internos y diseño elegante en madera oscura.',
    description_en: 'Professional lectern for events and conferences, with internal shelves and elegant dark wood design.',
    details_es: [
      'Dimensiones: 900 x 500 x 1100 mm.',
      'Puertas en tablero MDF enchapado de alta calidad.',
      'Estantes internos para material de apoyo.',
      'Acabado Roble Oscuro o Caoba Akamara.'
    ],
    details_en: [
      'Dimensions: 900 x 500 x 1100 mm.',
      'High quality veneered MDF board doors.',
      'Internal shelves for support material.',
      'Dark Oak or Akamara Mahogany finish.'
    ],
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800',
    type: 'product'
  },

  // --- SECCIÓN: SERVICIOS (SERVICES) ---
  {
    id: 'servicio-interiorismo-akamara-360',
    name_es: 'Diseño de Interiores Akamara 360°',
    name_en: 'Akamara 360° Interior Design',
    category: 'services',
    description_es: 'Asesoría experta para transformar espacios residenciales y comerciales con el sello Akamara.',
    description_en: 'Expert advice to transform residential and commercial spaces with the Akamara seal.',
    details_es: [
      'Conceptualización y renders 3D.',
      'Selección curada de mobiliario y texturas.',
      'Gestión de proyecto de principio a fin.',
      'Montaje técnico profesional.'
    ],
    details_en: [
      'Conceptualization and 3D renders.',
      'Curated selection of furniture and textures.',
      'End-to-end project management.',
      'Professional technical assembly.'
    ],
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800',
    type: 'service'
  },
  {
    id: 'servicio-logistica-akamara-expedite',
    name_es: 'Logística Akamara Expedite',
    name_en: 'Akamara Expedite Logistics',
    category: 'services',
    description_es: 'Transporte y montaje especializado de mobiliario de lujo en todo el territorio nacional.',
    description_en: 'Specialized transport and assembly of luxury furniture throughout the national territory.',
    details_es: [
      'Flota propia con protección de carga.',
      'Equipo de instaladores maestros.',
      'Entregas garantizadas en plazos récord.',
      'Seguro integral de transporte.'
    ],
    details_en: [
      'Own fleet with cargo protection.',
      'Team of master installers.',
      'Guaranteed record-time deliveries.',
      'Comprehensive transport insurance.'
    ],
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800',
    type: 'service'
  },

  // --- SECCIÓN: TRADICIONAL Y ESPECIALIZADO (TRADITIONAL & SPECIALIZED) ---
  {
    id: 'sillon-akamara-heritage-fumador',
    name_es: 'Sillón de Fumador "Heritage"',
    name_en: '"Heritage" Smoker\'s Lounge Chair',
    category: 'seats',
    description_es: 'Pieza de la línea tradicional Akamara, tallada en madera oscura con tapicería de cuero genuino y rejilla artesanal.',
    description_en: 'Part of the Akamara traditional line, carved in dark wood with genuine leather upholstery and handcrafted cane.',
    details_es: [
      'Estilo colonial cubano refinado.',
      'Madera de Cedro con acabado envejecido.',
      'Rejilla de mimbre natural tejida a mano.',
      'Ergonomía de descanso profundo.'
    ],
    details_en: [
      'Refined Cuban colonial style.',
      'Cedar wood with aged finish.',
      'Hand-woven natural wicker cane.',
      'Deep relaxation ergonomics.'
    ],
    image: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?q=80&w=800',
    type: 'product'
  },
  {
    id: 'pupitre-akamara-scholar-pro',
    name_es: 'Pupitre Ergonómico "Scholar Pro"',
    name_en: '"Scholar Pro" Ergonomic Desk',
    category: 'special',
    description_es: 'Mobiliario escolar de alta resistencia diseñado para uso intensivo en centros educativos modernos.',
    description_en: 'High-resistance school furniture designed for intensive use in modern educational centers.',
    details_es: [
      'Estructura metálica tubular reforzada.',
      'Superficie de laminado de alta presión (HPL).',
      'Asiento y respaldo de madera contrachapada ergonómica.',
      'Garantía de durabilidad de 5 años.'
    ],
    details_en: [
      'Reinforced tubular metal structure.',
      'High-pressure laminate (HPL) surface.',
      'Ergonomic plywood seat and backrest.',
      '5-year durability warranty.'
    ],
    image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=800',
    type: 'product'
  }
];
