
const Dashboard = () => {
    return (
        <div>
            <h1 className="text-4xl font-black text-white mb-2">Vista General</h1>
            <p className="text-slate-400">Bienvenido al centro de control de Akamara.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                <div className="bg-slate-900/50 border border-white/5 p-6 rounded-2xl hover:border-amber-500/50 transition-colors group cursor-pointer">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-500">Novedades</h3>
                    <p className="text-sm text-slate-500">Gestiona las noticias y actualizaciones recientes.</p>
                </div>
                <div className="bg-slate-900/50 border border-white/5 p-6 rounded-2xl hover:border-amber-500/50 transition-colors group cursor-pointer">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-500">Mobiliario</h3>
                    <p className="text-sm text-slate-500">Actualiza el catálogo de productos DUJO.</p>
                </div>
                <div className="bg-slate-900/50 border border-white/5 p-6 rounded-2xl hover:border-amber-500/50 transition-colors group cursor-pointer">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-500">Configuración</h3>
                    <p className="text-sm text-slate-500">Ajustes generales de la plataforma.</p>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
