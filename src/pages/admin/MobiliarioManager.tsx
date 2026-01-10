
import { useState, useEffect } from 'react';

// ... (existing imports, add storage)
import { databases, storage, APPWRITE_CONFIG } from '../../lib/appwrite';
import { ID, Query } from 'appwrite';
import { Plus, Trash2, Edit2, X, Image as ImageIcon, Search, MonitorPlay } from 'lucide-react';

export default function MobiliarioManager() {
    const [view, setView] = useState<'products' | 'presentation'>('products');
    const [items, setItems] = useState<any[]>([]);
    const [slides, setSlides] = useState<any[]>([]);
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
        if (view === 'products') fetchItems();
        if (view === 'presentation') fetchSlides();
    }, [view]);

    const fetchItems = async () => {
        setLoading(true);
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

    const fetchSlides = async () => {
        setLoading(true);
        try {
            // Fetch files from the 'images' bucket. 
            // Ideally we'd filter by some tag, but metadata listing in Appwrite Client SDK is limited.
            // We'll list all and maybe user has to just manage 'presentation' images here manually.
            const response = await storage.listFiles(APPWRITE_CONFIG.BUCKETS.IMAGES);
            // Optional: Filter if we have a naming convention, e.g. 'slide_'
            // For now, list all images in bucket
            setSlides(response.files);
        } catch (error) {
            console.error('Error fetching slides:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUploadSlide = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];
        setLoading(true);
        try {
            // Upload file
            await storage.createFile(
                APPWRITE_CONFIG.BUCKETS.IMAGES,
                ID.unique(),
                file
            );
            fetchSlides();
        } catch (error) {
            console.error('Error uploading slide:', error);
            alert('Fallo al subir imagen: ' + (error as any).message);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteSlide = async (fileId: string) => {
        if (!confirm('¿Eliminar esta imagen de la presentación?')) return;
        try {
            await storage.deleteFile(APPWRITE_CONFIG.BUCKETS.IMAGES, fileId);
            setSlides(slides.filter(s => s.$id !== fileId));
        } catch (error) {
            console.error('Error deleting slide:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        // ... (existing handleSubmit)
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

    // ... (existing handleEdit, handleDelete, etc - keep them)
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
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h2 className="text-3xl font-black text-white">Gestión de Mobiliario</h2>
                    <p className="text-slate-500">Administra catálogo y presentaciones.</p>
                </div>
                
                {/* View Toggles */}
                <div className="flex bg-slate-900 p-1 rounded-xl border border-white/10">
                    <button 
                        onClick={() => setView('products')}
                        className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${view === 'products' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
                    >
                        Catálogo
                    </button>
                    <button 
                         onClick={() => setView('presentation')}
                         className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${view === 'presentation' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
                    >
                        <MonitorPlay size={14} />
                        Presentación (Slides)
                    </button>
                </div>

                {view === 'products' && (
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
                )}
                 {view === 'presentation' && (
                    <div className="relative overflow-hidden group">
                        <input 
                            type="file" 
                            accept="image/*"
                            onChange={handleUploadSlide}
                            className="absolute inset-0 opacity-0 cursor-pointer z-10"
                            disabled={loading}
                        />
                        <button className="bg-white text-slate-950 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-200 transition-colors">
                            <Plus size={20} />
                            {loading ? 'Subiendo...' : 'Subir Slide'}
                        </button>
                    </div>
                )}
            </div>

            {/* PRODUCT VIEW */}
            {view === 'products' && (
                <>
                {/* Form Overlay (Existing) */}
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
                </>
            )}

            {/* PRESENTATION VIEW */}
            {view === 'presentation' && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {slides.map(file => {
                        // Construct preview URL
                        const bucketId = APPWRITE_CONFIG.BUCKETS.IMAGES;
                        const fileId = file.$id;
                        // We use the endpoint pattern: ENDPOINT/storage/buckets/BUCKET/files/FILE/view?project=PROJECT&mode=admin
                        // But easier to use storage.getFileView(bucket, fileId) to get the url
                        const previewUrl = storage.getFileView(bucketId, fileId).href;

                        return (
                             <div key={fileId} className="group relative bg-slate-900 rounded-2xl overflow-hidden aspect-video border border-white/5 hover:border-amber-500/50 transition-all">
                                <img src={previewUrl} className="w-full h-full object-cover" alt={file.name} />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button 
                                        onClick={() => handleDeleteSlide(fileId)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold text-xs"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-[10px] text-slate-300 truncate">
                                    {file.name}
                                </div>
                             </div>
                        )
                    })}
                     {slides.length === 0 && !loading && (
                        <div className="col-span-full text-center py-20 border-2 border-dashed border-white/5 rounded-3xl">
                            <p className="text-slate-500">No hay imágenes en la presentación. Sube algunas.</p>
                        </div>
                    )}
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
