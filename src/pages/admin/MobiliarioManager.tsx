
import { useState, useEffect } from 'react';
import { databases, APPWRITE_CONFIG } from '../../lib/appwrite';
import { ID, Query } from 'appwrite';
import { Plus, Trash2, Edit2, X, Image as ImageIcon, Search } from 'lucide-react';


export default function MobiliarioManager() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);
    
    // Form State
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: 'Interior',
        image_url: '',
        active: true
    });

    const categories = ['Interior', 'Exterior', 'Oficina', 'Proyectos'];

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await databases.listDocuments(
                APPWRITE_CONFIG.DATABASE_ID,
                APPWRITE_CONFIG.COLLECTIONS.MOBILIARIO,
                [Query.orderDesc('$createdAt')]
            );
            setItems(response.documents);
        } catch (error) {
            console.error('Error fetching mobiliario:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (editing) {
                await databases.updateDocument(
                    APPWRITE_CONFIG.DATABASE_ID,
                    APPWRITE_CONFIG.COLLECTIONS.MOBILIARIO,
                    editing,
                    formData
                );
            } else {
                await databases.createDocument(
                    APPWRITE_CONFIG.DATABASE_ID,
                    APPWRITE_CONFIG.COLLECTIONS.MOBILIARIO,
                    ID.unique(),
                    formData
                );
            }
            setShowForm(false);
            setEditing(null);
            setFormData({ name: '', description: '', category: 'Interior', image_url: '', active: true });
            fetchItems();
        } catch (error) {
            console.error('Error saving item:', error);
            alert('Error al guardar. Verifica los permisos.');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (item: any) => {
        setEditing(item.$id);
        setFormData({
            name: item.name,
            description: item.description || '',
            category: item.category,
            image_url: item.image_url,
            active: item.active
        });
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('¿Seguro que deseas eliminar este ítem?')) return;
        try {
            await databases.deleteDocument(
                APPWRITE_CONFIG.DATABASE_ID,
                APPWRITE_CONFIG.COLLECTIONS.MOBILIARIO,
                id
            );
            setItems(items.filter(i => i.$id !== id));
        } catch (error) {
            console.error('Error deleting:', error);
        }
    };

    return (
        <div className="space-y-8 p-6 text-slate-300">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-black text-white">Gestión de Mobiliario</h2>
                    <p className="text-slate-500">Administra el catálogo de productos visible en la web.</p>
                </div>
                <button 
                    onClick={() => {
                        setEditing(null);
                        setFormData({ name: '', description: '', category: 'Interior', image_url: '', active: true });
                        setShowForm(true);
                    }}
                    className="bg-amber-500 text-slate-950 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-amber-400 transition-colors"
                >
                    <Plus size={20} />
                    Nuevo Producto
                </button>
            </div>

            {/* Form Overlay */}
            {showForm && (
                <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 max-w-2xl w-full shadow-2xl relative">
                        <button 
                            onClick={() => setShowForm(false)}
                            className="absolute top-4 right-4 text-slate-500 hover:text-white"
                        >
                            <X size={24} />
                        </button>
                        
                        <h3 className="text-2xl font-bold text-white mb-6">
                            {editing ? 'Editar Producto' : 'Nuevo Producto'}
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs uppercase font-bold text-slate-500 mb-2">Nombre</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={formData.name}
                                        onChange={e => setFormData({...formData, name: e.target.value})}
                                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-amber-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase font-bold text-slate-500 mb-2">Categoría</label>
                                    <select 
                                        value={formData.category}
                                        onChange={e => setFormData({...formData, category: e.target.value})}
                                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-amber-500 outline-none appearance-none"
                                    >
                                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs uppercase font-bold text-slate-500 mb-2">URL de Imagen</label>
                                <div className="flex gap-4">
                                    <div className="relative flex-1">
                                        <ImageIcon className="absolute left-3 top-3 text-slate-500 w-5 h-5" />
                                        <input 
                                            type="url" 
                                            required
                                            value={formData.image_url}
                                            onChange={e => setFormData({...formData, image_url: e.target.value})}
                                            placeholder="https://images.unsplash.com/..."
                                            className="w-full bg-slate-950 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:border-amber-500 outline-none"
                                        />
                                    </div>
                                    <a 
                                        href="https://unsplash.com" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="px-4 py-3 bg-white/5 rounded-xl hover:bg-white/10 text-slate-400 transition-colors"
                                    >
                                        <Search size={20} />
                                    </a>
                                </div>
                                {formData.image_url && (
                                    <div className="mt-4 h-40 rounded-xl overflow-hidden border border-white/10">
                                        <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" />
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs uppercase font-bold text-slate-500 mb-2">Descripción</label>
                                <textarea 
                                    rows={3}
                                    value={formData.description}
                                    onChange={e => setFormData({...formData, description: e.target.value})}
                                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-amber-500 outline-none"
                                />
                            </div>

                            <div className="flex items-center gap-4">
                                <input 
                                    type="checkbox"
                                    checked={formData.active}
                                    onChange={e => setFormData({...formData, active: e.target.checked})}
                                    className="w-5 h-5 accent-amber-500"
                                />
                                <span className="text-sm font-bold">Producto Activo (Visible)</span>
                            </div>

                            <button 
                                type="submit"
                                disabled={loading}
                                className="w-full bg-amber-500 text-slate-950 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-amber-400 transition-colors disabled:opacity-50"
                            >
                                {loading ? 'Guardando...' : 'Guardar Producto'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {items.map(item => (
                    <div key={item.$id} className="group bg-slate-900 border border-white/5 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all">
                        <div className="aspect-square relative overflow-hidden">
                            <img src={item.image_url} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                <button onClick={() => handleEdit(item)} className="p-3 bg-white/10 rounded-full hover:bg-white/20 text-white transition-colors">
                                    <Edit2 size={20} />
                                </button>
                                <button onClick={() => handleDelete(item.$id)} className="p-3 bg-red-500/20 rounded-full hover:bg-red-500/40 text-red-500 transition-colors">
                                    <Trash2 size={20} />
                                </button>
                            </div>
                            <div className="absolute top-4 right-4 bg-slate-950/80 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                                {item.category}
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-lg font-bold text-white mb-2">{item.name}</h3>
                            <p className="text-sm text-slate-500 line-clamp-2">{item.description}</p>
                            <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center text-xs">
                                <span className={item.active ? 'text-green-500' : 'text-red-500'}>
                                    {item.active ? '● Activo' : '● Inactivo'}
                                </span>
                                <span className="text-slate-600 font-mono">ID: {item.$id.substring(0,6)}...</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {items.length === 0 && !loading && (
                <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-3xl">
                    <p className="text-slate-500">No hay productos en el catálogo.</p>
                </div>
            )}
        </div>
    );
}

// Helper prop fix for button
declare module 'react' {
    interface ButtonHTMLAttributes<T> extends React.HTMLAttributes<T> {
        onPress?: () => void;
    }
}
