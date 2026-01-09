
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
  // SEATS
  {
    id: 'butaca-contemporanea',
    name_es: 'Butaca Contemporánea "Línea Akamara"',
    name_en: 'Contemporary Armchair "Akamara Line"',
    category: 'seats',
    description_es: 'Diseño de líneas limpias y formas orgánicas, ideal para lobbies corporativos y hoteles de negocios.',
    description_en: 'Clean lines and organic shapes, ideal for corporate lobbies and business hotels.',
    image: 'https://images.unsplash.com/photo-1598191330641-69955e8848f0?q=80&w=800',
    type: 'product'
  },
  {
    id: 'sofa-modular-shango',
    name_es: 'Sofá Modular "Shangó"',
    name_en: '"Shangó" Modular Sofa',
    category: 'seats',
    description_es: 'Sofá de alto confort con estructura robusta de madera preciosa y tapicería premium.',
    description_en: 'High comfort sofa with robust precious wood structure and premium upholstery.',
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=800',
    type: 'product'
  },
  // OUTDOOR
  {
    id: 'tumbona-teca-olokun',
    name_es: 'Tumbona de Teca "Olokun"',
    name_en: '"Olokun" Teak Sun Lounger',
    category: 'outdoor',
    description_es: 'Fabricada en madera de Teca certificada, resistente a la intemperie y salinidad.',
    description_en: 'Made of certified Teak wood, weather and salinity resistant.',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d59735288?q=80&w=800',
    type: 'product'
  },
  // OFFICE
  {
    id: 'buro-ejecutivo-tablero',
    name_es: 'Buró Ejecutivo "El Tablero"',
    name_en: '"The Board" Executive Desk',
    category: 'office',
    description_es: 'Mueble de dirección con acabados bicolor y gestión de cables integrada.',
    description_en: 'Management furniture with bicolor finishes and integrated cable management.',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800',
    type: 'product'
  },
  // SERVICES
  {
    id: 'servicio-diseno-interiores',
    name_es: 'Diseño de Interiores 360',
    name_en: '360 Interior Design',
    category: 'services',
    description_es: 'Estrategia integral de diseño para hoteles, restaurantes y residencias de lujo.',
    description_en: 'Integral design strategy for hotels, restaurants, and luxury residences.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800',
    type: 'service'
  },
  {
    id: 'servicio-logistica-camino',
    name_es: 'Gestión Logística "El Camino"',
    name_en: '"The Path" Logistics Management',
    category: 'services',
    description_es: 'Transporte especializado y logística de abastecimiento para proyectos constructivos.',
    description_en: 'Specialized transport and supply logistics for construction projects.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800',
    type: 'service'
  }
];
