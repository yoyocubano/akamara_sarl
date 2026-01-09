
export interface CatalogItem {
  id: string;
  name_es: string;
  name_en: string;
  category: 'seats' | 'tables' | 'habitational' | 'outdoor' | 'office' | 'special' | 'services';
  description_es: string;
  description_en: string;
  price_info?: string;
  image: string;
  type: 'product' | 'service';
}

export const CATALOG_DATA: CatalogItem[] = [
  // ASIENTOS (SEATS)
  {
    id: 'butaca-akamara-premium',
    name_es: 'Butaca Ejecutiva "Akamara Premium"',
    name_en: 'Executive Armchair "Akamara Premium"',
    category: 'seats',
    description_es: 'Butaca ergonómica de alto confort, tapizada en piel sintética de alta resistencia con base de madera de cedro barnizada. Ideal para oficinas de alta dirección.',
    description_en: 'High-comfort ergonomic armchair, upholstered in high-resistance synthetic leather with a varnished cedar wood base. Ideal for executive offices.',
    image: 'https://images.unsplash.com/photo-1598191330641-69955e8848f0?q=80&w=800',
    type: 'product'
  },
  {
    id: 'sofa-modular-shango-xl',
    name_es: 'Sofá Modular "Shangó XL"',
    name_en: '"Shangó XL" Modular Sofa',
    category: 'seats',
    description_es: 'Sistema modular de 4 plazas reconfigurable según el espacio. Estructura de pino tratado y cojines de espuma de alta densidad.',
    description_en: '4-seater modular system reconfigurable according to space. Treated pine structure and high-density foam cushions.',
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=800',
    type: 'product'
  },
  {
    id: 'silla-comedor-dujo-reborn',
    name_es: 'Silla de Comedor "Dujo Reborn"',
    name_en: '"Dujo Reborn" Dining Chair',
    category: 'seats',
    description_es: 'Diseño clásico renovado con líneas minimalistas. Estructura ligera y resistente, perfecta para entornos gastronómicos.',
    description_en: 'Renewed classic design with minimalist lines. Light and resistant structure, perfect for gastronomic environments.',
    image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=800',
    type: 'product'
  },

  // MESAS (TABLES)
  {
    id: 'mesa-centro-raices',
    name_es: 'Mesa de Centro "Raíces"',
    name_en: '"Roots" Coffee Table',
    category: 'tables',
    description_es: 'Mesa tallada en una sola pieza de madera de caoba recuperada. Una joya artesanal que aporta calidez y carácter a cualquier estancia.',
    description_en: 'Table carved from a single piece of reclaimed mahogany wood. An artisanal jewel that brings warmth and character to any room.',
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=800',
    type: 'product'
  },
  {
    id: 'buro-productividad-plus',
    name_es: 'Buró de Oficina "Productividad Plus"',
    name_en: '"Productivity Plus" Office Desk',
    category: 'office',
    description_es: 'Escritorio con superficie amplia y acabado anti-rayaduras. Incluye cajonera lateral y pasacables ocultos para un espacio ordenado.',
    description_en: 'Desk with a wide surface and anti-scratch finish. Includes side drawers and hidden cable management for a tidy space.',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800',
    type: 'product'
  },

  // HABITACIONAL (HABITATIONAL)
  {
    id: 'cama-descanso-real-king',
    name_es: 'Cama "Descanso Real" King Size',
    name_en: 'King Size "Royal Rest" Bed',
    category: 'habitational',
    description_es: 'Base de cama con cabecero tapizado y estructura reforzada. Inspirada en la sobriedad europea pero adaptada al clima tropical.',
    description_en: 'Bed base with upholstered headboard and reinforced structure. Inspired by European sobriety but adapted to the tropical climate.',
    image: 'https://images.unsplash.com/photo-1505693419148-ad30b0a2305a?q=80&w=800',
    type: 'product'
  },

  // EXTERIOR (OUTDOOR)
  {
    id: 'juego-terraza-brisa-marina',
    name_es: 'Juego de Terraza "Brisa Marina"',
    name_en: '"Sea Breeze" Terrace Set',
    category: 'outdoor',
    description_es: 'Conjunto de mesa y 4 sillas en aluminio y ratán sintético. Totalmente resistente a la salinidad y los rayos UV.',
    description_en: 'Table and 4 chairs set in aluminum and synthetic rattan. Fully resistant to salinity and UV rays.',
    image: 'https://images.unsplash.com/photo-1531834685032-c34bf0d84c7c?q=80&w=800',
    type: 'product'
  },
  {
    id: 'tumbona-teca-olokun-2026',
    name_es: 'Tumbona Ergonómica "Olokun"',
    name_en: '"Olokun" Ergonomic Sun Lounger',
    category: 'outdoor',
    description_es: 'Tumbona de teca con 5 posiciones de reclinado. Incluye colchoneta impermeable de fácil limpieza.',
    description_en: 'Teak sun lounger with 5 reclining positions. Includes easy-to-clean waterproof mattress.',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d59735288?q=80&w=800',
    type: 'product'
  },

  // ESPECIALES (SPECIAL)
  {
    id: 'barra-bar-social',
    name_es: 'Barra de Bar "Encuentro Social"',
    name_en: '"Social Encounter" Bar Counter',
    category: 'special',
    description_es: 'Diseñada para espacios de entretenimiento. Incluye nichos para botellas, soporte para copas y acabado ultra-brillante.',
    description_en: 'Designed for entertainment spaces. Includes bottle niches, glass holders, and an ultra-glossy finish.',
    image: 'https://images.unsplash.com/photo-1544644131-0cc7981518f0?q=80&w=800',
    type: 'product'
  },

  // SERVICIOS (SERVICES)
  {
    id: 'servicio-diseno-interior-360',
    name_es: 'Diseño de Interiores Integral 360',
    name_en: 'Comprehensive 360 Interior Design',
    category: 'services',
    description_es: 'Asesoría experta desde el concepto hasta la ejecución. Renderizado 3D, selección de materiales y gestión de espacios comerciales.',
    description_en: 'Expert advice from concept to execution. 3D rendering, material selection, and commercial space management.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800',
    type: 'service'
  },
  {
    id: 'servicio-montaje-especializado',
    name_es: 'Montaje e Instalación Profesional',
    name_en: 'Professional Assembly and Installation',
    category: 'services',
    description_es: 'Personal técnico calificado para el armado de mobiliario complejo en hoteles y sedes corporativas en toda Cuba.',
    description_en: 'Qualified technical personnel for assembling complex furniture in hotels and corporate offices throughout Cuba.',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800',
    type: 'service'
  },
  {
    id: 'servicio-restauracion-patrimonio',
    name_es: 'Restauración de Mobiliario Patrimonial',
    name_en: 'Restoration of Heritage Furniture',
    category: 'services',
    description_es: 'Servicio exclusivo de recuperación de piezas clásicas, utilizando técnicas tradicionales y materiales auténticos.',
    description_en: 'Exclusive restoration service for classic pieces, using traditional techniques and authentic materials.',
    image: 'https://images.unsplash.com/photo-1581781870027-04212e231e96?q=80&w=800',
    type: 'service'
  },
  {
    id: 'servicio-logistica-akamara-express',
    name_es: 'Logística y Transporte "Akamara Express"',
    name_en: '"Akamara Express" Logistics and Transport',
    category: 'services',
    description_es: 'Flota especializada para el traslado de mercancías delicadas con cobertura nacional y rastreo en tiempo real.',
    description_en: 'Specialized fleet for the transfer of delicate goods with national coverage and real-time tracking.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800',
    type: 'service'
  }
];
