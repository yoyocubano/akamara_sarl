
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Trash2, Save, Image, Loader, Newspaper } from 'lucide-react';

interface Novedad {
    id: number;
    title: string;
    overview: string;
    image_url: string;
    created_at: string;
}

const NovedadesManager = () => {
    const [novedades, setNovedades] = useState<Novedad[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);

    // Form State
    const [title, setTitle] = useState('');
    const [overview, setOverview] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchNovedades();
    }, []);

    const fetchNovedades = async () => {
        try {
            // First check if table exists by selecting 1 item, if error, we might need setup
            const { data, error } = await supabase.from('novedades').select('*').order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching novedades:', error);
                if (error.code === '42P01') { // undefined_table
                    alert("La tabla 'novedades' no existe. Por favor contacta al desarrollador o ejecuta el script SQL.");
                }
            } else {
                setNovedades(data || []);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        const { data, error } = await supabase.from('novedades').insert([
            { title, overview, image_url: imageUrl }
        ]).select();

        if (error) {
            alert('Error al crear: ' + error.message);
        } else {
            setNovedades(prev => [data[0], ...prev]);
            setIsCreating(false);
            setTitle('');
            setOverview('');
            setImageUrl('');
        }
        setSubmitting(false);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('¿Estás seguro de eliminar esta noticia?')) return;

        const { error } = await supabase.from('novedades').delete().eq('id', id);

        if (error) {
            alert('Error al eliminar');
        } else {
            setNovedades(prev => prev.filter(n => n.id !== id));
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8 animate-in fade-in slide-in-from-top-4">
                <div>
                    <h1 className="text-3xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                        <Newspaper className="w-8 h-8 text-amber-500" />
                        Novedades
                    </h1>
                    <p className="text-slate-500 mt-1">Gestiona las noticias visibles en la página principal.</p>
                </div>
                <button
                    onClick={() => setIsCreating(true)}
                    disabled={isCreating}
                    className="bg-amber-600 hover:bg-amber-500 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 font-bold transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Plus className="w-5 h-5" />
                    Nueva Noticia
                </button>
            </div>

            {isCreating && (
                <div className="mb-10 bg-slate-900/50 border border-amber-500/20 p-6 rounded-2xl animate-in zoom-in-95 duration-300">
                    <h3 className="text-white font-bold mb-4 flex items-center gap-2 text-lg">
                        <span className="w-2 h-8 bg-amber-500 rounded-full"></span>
                        Redactando Contenido
                    </h3>
                    <form onSubmit={handleCreate} className="space-y-4">
                        <div>
                            <label className="block text-slate-400 text-xs uppercase tracking-widest font-bold mb-2">Título</label>
                            <input
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-amber-500 transition-colors"
                                placeholder="Ej: Nueva colección Mobiliario 2026"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-slate-400 text-xs uppercase tracking-widest font-bold mb-2">Descripción Corta</label>
                            <textarea
                                value={overview}
                                onChange={e => setOverview(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-amber-500 transition-colors h-24"
                                placeholder="Resumen breve para la tarjeta..."
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-slate-400 text-xs uppercase tracking-widest font-bold mb-2">URL de Imagen</label>
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <Image className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
                                    <input
                                        value={imageUrl}
                                        onChange={e => setImageUrl(e.target.value)}
                                        className="w-full bg-black/40 border border-white/10 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:border-amber-500 transition-colors"
                                        placeholder="https://..."
                                        required
                                    />
                                </div>
                            </div>
                            {imageUrl && (
                                <div className="mt-2 h-32 w-full bg-black/50 rounded-lg overflow-hidden border border-white/5">
                                    <img src={imageUrl} className="w-full h-full object-cover opacity-70" alt="Preview" onError={(e) => (e.target as HTMLImageElement).style.display = 'none'} />
                                </div>
                            )}
                        </div>
                        <div className="flex gap-3 pt-4 border-t border-white/5">
                            <button
                                type="button"
                                onClick={() => setIsCreating(false)}
                                className="px-6 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors font-bold"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="px-8 py-2.5 bg-white text-black rounded-lg hover:bg-amber-500 hover:text-white transition-all font-black flex items-center gap-2"
                            >
                                {submitting ? <Loader className="animate-spin w-4 h-4" /> : <Save className="w-4 h-4" />}
                                Publicar
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader className="w-10 h-10 text-amber-500 animate-spin" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {novedades.length === 0 && !isCreating && (
                        <div className="col-span-full text-center py-20 bg-slate-900/30 rounded-2xl border border-white/5 border-dashed">
                            <Newspaper className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                            <p className="text-slate-500 text-lg">No hay noticias publicadas.</p>
                            <button onClick={() => setIsCreating(true)} className="text-amber-500 hover:underline mt-2 text-sm font-bold">Crear la primera</button>
                        </div>
                    )}

                    {novedades.map((nav) => (
                        <div key={nav.id} className="group bg-slate-900/50 border border-white/5 rounded-xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 flex flex-col">
                            <div className="h-48 overflow-hidden relative">
                                <img src={nav.image_url} alt={nav.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => handleDelete(nav.id)} className="p-2 bg-red-500/90 text-white rounded-lg hover:bg-red-600 shadow-lg backdrop-blur-sm">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <div className="p-5 flex-1 flex flex-col">
                                <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-amber-500 transition-colors">{nav.title}</h3>
                                <p className="text-slate-400 text-sm line-clamp-3 mb-4 flex-1">{nav.overview}</p>
                                <span className="text-[10px] text-slate-600 font-mono uppercase tracking-widest block text-right">
                                    {new Date(nav.created_at).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NovedadesManager;
