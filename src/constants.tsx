import { Armchair, Hammer, ChefHat, Truck, Sparkles } from 'lucide-react';

export const COLORS = {
    amber: {
        500: '#f59e0b',
        600: '#d97706',
    },
    slate: {
        300: '#cbd5e1',
        400: '#94a3b8',
        900: '#0f172a',
        950: '#020617',
    }
};

export const LEGAL_INFO = {
    name: "Akamara S.U.R.L.",
    nit: "50004324225",
    founded: "Octubre 2024",
    location: "La Habana, Cuba",
    gaceta: "GOC-2024-EX88",
    contact: {
        phone: "+53 5 8746866",
        email: "direccion@akamara.cu",
        person: "Jose Miguel Romero"
    }
};

export const DIVISIONS = [
    {
        id: 'estrategia',
        title: 'divisions.estrategia.title',
        subtitle: 'divisions.estrategia.subtitle',
        desc: 'divisions.estrategia.desc',
        icon: <Sparkles size={32} />,
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop', // Abstract Tech/Strategy
        orisha: 'Orunmila',
        color: 'from-green-500/20 to-yellow-500/20'
    },
    {
        id: 'mobiliario',
        title: 'divisions.mobiliario.title',
        subtitle: 'divisions.mobiliario.subtitle',
        desc: 'divisions.mobiliario.desc',
        icon: <Armchair size={32} />,
        image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=2670&auto=format&fit=crop', // Modern Interior
        orisha: 'Yemaya',
        color: 'from-blue-500/20 to-cyan-500/20'
    },
    {
        id: 'construccion',
        title: 'divisions.construccion.title',
        subtitle: 'divisions.construccion.subtitle',
        desc: 'divisions.construccion.desc',
        icon: <Hammer size={32} />,
        image: 'https://images.unsplash.com/photo-1531834685032-c34bf0d84c7c?q=80&w=2597&auto=format&fit=crop', // Construction/Architecture
        orisha: 'Shango',
        color: 'from-red-500/20 to-orange-500/20'
    },
    {
        id: 'gastronomia',
        title: 'divisions.gastronomia.title',
        subtitle: 'divisions.gastronomia.subtitle',
        desc: 'divisions.gastronomia.desc',
        icon: <ChefHat size={32} />,
        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2670&auto=format&fit=crop', // Elegant Food
        orisha: 'Olokun',
        color: 'from-blue-900/40 to-indigo-900/40'
    },
    {
        id: 'logistica',
        title: 'divisions.logistica.title',
        subtitle: 'divisions.logistica.subtitle',
        desc: 'divisions.logistica.desc',
        icon: <Truck size={32} />,
        image: 'https://images.unsplash.com/photo-1494412574643-353ec4f00dce?q=80&w=2574&auto=format&fit=crop', // Logistics/Airport
        orisha: 'Eshu',
        color: 'from-red-600/20 to-black/20'
    }
];
