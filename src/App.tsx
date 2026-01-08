import { useState } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, MapPin, Phone, Mail, FileText, ArrowUpRight, Award, Box, Sparkles, Orbit, ArrowRight } from 'lucide-react';
import { DIVISIONS, LEGAL_INFO } from './constants';
import logo from './assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: 'Hub Principal', path: '/' },
    { name: 'Expediente Legal', path: '/legal' },
    { name: 'Mobiliario', path: '/mobiliario' },
    { name: 'Contacto', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-4 group">
              <div className="relative">
                <div className="absolute inset-0 bg-amber-500 blur-md opacity-20 group-hover:opacity-60 transition-opacity duration-500"></div>
                <img src={logo} alt="Akamara Logo" className="relative w-16 h-16 object-contain drop-shadow-2xl transition-transform duration-300 group-hover:scale-105" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tighter text-white uppercase group-hover:text-amber-500 transition-colors duration-300">Akamara</span>
                <span className="text-[9px] uppercase tracking-[0.4em] text-slate-400 font-bold">Inicio de la Creación</span>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-12">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-[10px] uppercase tracking-[0.25em] font-black transition-all duration-300 relative group overflow-hidden ${location.pathname === link.path ? 'text-amber-500' : 'text-slate-400 hover:text-white'
                  }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-[2px] bg-amber-500 transition-transform duration-300 origin-left ${location.pathname === link.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </Link>
            ))}
          </div>

          <div className="flex md:hidden items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-amber-500 transition-colors">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-slate-950/95 backdrop-blur-xl border-t border-white/10 p-4 space-y-4 absolute w-full">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block text-slate-300 text-xs font-bold uppercase tracking-widest py-3 hover:text-amber-500 border-b border-white/5 last:border-0"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

const Hero = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-void pt-20">
    <div className="absolute inset-0 z-0 pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-600/10 rounded-full blur-[80px] animate-pulse will-change-opacity"></div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[60px]"></div>
      <img
        src="https://images.unsplash.com/photo-1464802686167-b939a67e06a1?auto=format&fit=crop&q=80&w=2000"
        className="w-full h-full object-cover opacity-20 mix-blend-screen"
        alt="Cosmic Energy"
      />
    </div>

    <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
      <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8 backdrop-blur-md hover:bg-white/10 transition-colors">
        <Sparkles className="w-4 h-4 text-amber-500 animate-spin-slow" />
        <span className="text-[10px] uppercase tracking-[0.4em] font-black text-slate-300">Antes del tiempo, Akamara</span>
      </div>

      <h1 className="text-6xl md:text-9xl font-black text-white mb-8 leading-[0.9] tracking-tighter">
        El Destello de la <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-white to-amber-700 energy-pulse">
          Creación
        </span>
      </h1>

      <p className="text-lg md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed font-light italic">
        "Akamara nace como un ecosistema multiservicios en Cuba. Desde la fabricación de mobiliario de diseño, hasta soluciones logísticas y constructivas integrales."
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
        <Link to="/servicios" className="group relative px-12 py-5 bg-amber-500 text-slate-950 font-black rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(245,158,11,0.5)] transform-gpu">
          <span className="relative z-10 flex items-center space-x-2">
            <span>Explorar Divisiones</span>
            <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
          </span>
          <div className="absolute inset-0 shimmer opacity-50"></div>
        </Link>
        <Link to="/legal" className="px-12 py-5 bg-white/5 border border-white/10 text-white font-bold rounded-full backdrop-blur-md hover:bg-white/10 transition-all duration-300 flex items-center space-x-2">
          <Shield size={18} />
          <span>Ver Credenciales</span>
        </Link>
      </div>
    </div>
  </section>
);

const LegalSection = () => (
  <section className="py-32 bg-slate-950 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[100px]"></div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div>
          <div className="inline-flex items-center space-x-2 text-amber-500 mb-6">
            <Orbit className="animate-spin-slow" />
            <span className="text-xs font-black uppercase tracking-[0.3em]">La Alquimia Legal</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
            Transparencia y <br />Solidez <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Jurídica</span>
          </h2>
          <p className="text-slate-400 text-lg mb-10 leading-relaxed">
            Operamos bajo el marco legal de la República de Cuba como Sociedad Unipersonal de Responsabilidad Limitada (S.U.R.L.), garantizando seguridad en cada transacción comercial.
          </p>

          <div className="space-y-6">
            <div className="flex space-x-4 p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-amber-500/30 transition-all group">
              <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center group-hover:bg-amber-500 group-hover:text-slate-900 transition-all text-amber-500">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-lg">Constitución Oficial</h4>
                <p className="text-sm text-slate-500 mt-1">SURL constituida en La Habana el {LEGAL_INFO.founded}.</p>
              </div>
            </div>
            <div className="flex space-x-4 p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-amber-500/30 transition-all group">
              <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center group-hover:bg-amber-500 group-hover:text-slate-900 transition-all text-amber-500">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-lg">NIT: {LEGAL_INFO.nit}</h4>
                <p className="text-sm text-slate-500 mt-1">Registro comercial y fiscal activo certificado.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="relative bg-slate-900/50 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/10 shadow-2xl">
            <div className="absolute -top-10 -right-10 opacity-20">
              <Shield size={200} className="text-amber-500" />
            </div>

            <h3 className="text-2xl font-black text-white mb-6">Misión Corporativa</h3>
            <p className="text-slate-400 italic text-lg leading-relaxed mb-10">
              "Ser el catalizador del desarrollo empresarial en Cuba a través de un ecosistema de servicios integrales que prioriza la calidad artesanal y la eficiencia técnica."
            </p>

            <div className="flex items-center space-x-6 border-t border-white/5 pt-8">
              <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center">
                <Box className="text-amber-500 w-8 h-8" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Estado</p>
                <p className="text-white font-bold text-xl">Activo & Certificado</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const DivisionCard = ({ icon, title, subtitle, desc, image }: { icon: any, title: string, subtitle: string, desc: string, image: string }) => {
  return (
    <div className="group bg-slate-900 border border-white/5 rounded-[2rem] overflow-hidden hover:border-amber-500/50 transition-all duration-500 relative h-[500px] flex flex-col">
      <div className="absolute inset-0 z-0">
        <img src={image} className="w-full h-full object-cover opacity-40 group-hover:opacity-20 group-hover:scale-110 transition-all duration-700" alt={title} />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/0 via-slate-950/80 to-slate-950"></div>
      </div>

      <div className="relative z-10 p-8 h-full flex flex-col">
        <div className="w-16 h-16 bg-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center text-amber-500 mb-6 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
          {icon}
        </div>

        <span className="text-[10px] uppercase tracking-[0.3em] font-black text-amber-500 mb-2">{subtitle}</span>
        <h3 className="text-3xl font-black text-white mb-4 leading-none">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
          {desc}
        </p>

        <div className="mt-auto flex justify-between items-center border-t border-white/10 pt-6">
          <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Explorar División</span>
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:translate-x-2 transition-transform">
            <ArrowUpRight className="text-white w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  )
};

const DivisionExplorer = () => (
  <section className="py-32 bg-void">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-20">
        <h2 className="text-sm font-black text-amber-500 uppercase tracking-[0.6em] mb-4">Los Elementos</h2>
        <h3 className="text-5xl md:text-7xl font-black text-white">Divisiones del <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-700">Hub</span></h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {DIVISIONS.map((div) => (
          <DivisionCard key={div.id} {...div} />
        ))}
      </div>
    </div>
  </section>
);

const MobiliarioSection = () => (
  <section className="py-32 bg-slate-950 relative border-y border-white/5">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row items-center gap-20">
        <div className="lg:w-1/2">
          <div className="inline-block px-4 py-2 bg-amber-500 text-slate-950 font-black text-[10px] uppercase tracking-[0.2em] rounded mb-8">
            División Premium
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[0.9]">
            Mobiliario <br /><span className="text-slate-700 text-4xl block mt-2 font-light">Espacios que Inspiran</span>
          </h2>
          <p className="text-slate-400 text-lg mb-12 leading-relaxed font-light border-l-2 border-amber-500 pl-6">
            Nuestra división de mobiliario fusiona el confort con el diseño arquitectónico. Creamos piezas que visten vestíbulos de hoteles, espacios residenciales y restaurantes con acabados exclusivos.
          </p>

          <ul className="grid grid-cols-2 gap-y-4 gap-x-8 mb-12">
            {['Interiores', 'Exteriores & Piscina', 'Oficina & Corporativo', 'Acabados a Medida'].map(item => (
              <li key={item} className="flex items-center space-x-3 text-sm text-slate-300">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                <span className="uppercase tracking-wider font-bold text-[10px]">{item}</span>
              </li>
            ))}
          </ul>

          <Link to="/contact" className="inline-flex items-center space-x-4 bg-white/5 hover:bg-white/10 px-8 py-4 rounded-full border border-white/10 transition-colors group">
            <span className="text-white font-bold uppercase tracking-widest text-xs">Solicitar Catálogo PDF</span>
            <ArrowRight className="text-amber-500 w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="lg:w-1/2 relative">
          <div className="absolute inset-0 bg-amber-500/20 blur-[100px] rounded-full opacity-50"></div>
          <div className="relative rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl group">
            <img
              src="https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=1000"
              alt="DUJO Concept"
              className="w-full h-auto transform group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
              <div className="text-white font-black text-9xl opacity-10 absolute bottom-0 right-0 leading-none -mb-10 -mr-10">D</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ContactView = () => (
  <div className="pt-40 pb-24 bg-void min-h-screen">
    <div className="max-w-4xl mx-auto px-4">
      <div className="bg-slate-900 border border-white/10 rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row">
        <div className="bg-slate-950 p-12 text-white md:w-2/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-5">
            <MapPin size={150} />
          </div>
          <h2 className="text-3xl font-black mb-6 leading-tight">Hablemos de su <span className="text-amber-500">Proyecto</span>.</h2>
          <p className="text-slate-400 text-sm mb-12 font-light">Nuestros expertos están listos para asesorarle en cualquiera de nuestras divisiones operativas.</p>

          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                <Phone size={18} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Llámenos</p>
                <p className="text-white font-bold">{LEGAL_INFO.contact.phone}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Escribanos</p>
                <p className="text-white font-bold">{LEGAL_INFO.contact.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Visítenos</p>
                <p className="text-white font-bold">{LEGAL_INFO.location}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-12 md:w-3/5 bg-slate-900">
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] uppercase font-black tracking-widest text-slate-500 mb-2 block">Nombre</label>
                <input type="text" className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-amber-500 outline-none transition-all" />
              </div>
              <div>
                <label className="text-[10px] uppercase font-black tracking-widest text-slate-500 mb-2 block">Empresa</label>
                <input type="text" className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-amber-500 outline-none transition-all" />
              </div>
            </div>
            <div>
              <label className="text-[10px] uppercase font-black tracking-widest text-slate-500 mb-2 block">División de Interés</label>
              <select className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-amber-500 outline-none transition-all appearance-none cursor-pointer">
                <option>Mobiliario (DUJO)</option>
                <option>Construcción</option>
                <option>Logística</option>
                <option>Gastronomía</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] uppercase font-black tracking-widest text-slate-500 mb-2 block">Mensaje</label>
              <textarea rows={4} className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-amber-500 outline-none transition-all"></textarea>
            </div>
            <button className="w-full bg-amber-500 text-slate-950 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-amber-400 hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)]">
              Enviar Propuesta
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
);

const Footer = () => (
  <footer className="bg-slate-950 border-t border-white/5 py-24 text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="flex items-center space-x-3 mb-6">
            <img src={logo} alt="Akamara Logo" className="w-12 h-12 object-contain" />
            <span className="text-2xl font-black uppercase tracking-tighter">Akamara S.U.R.L.</span>
          </Link>
          <p className="text-slate-500 max-w-sm text-sm leading-relaxed mb-6 italic">
            "Inicio de la creación. Ecosistema de servicios integrales operando bajo licencia mercantil en la República de Cuba."
          </p>
        </div>
        <div>
          <h4 className="text-xs font-black uppercase tracking-widest text-amber-500 mb-6">Sectores</h4>
          <ul className="space-y-4 text-xs text-slate-400 font-medium">
            <Link to="/mobiliario"><li className="hover:text-white transition-colors cursor-pointer">Mobiliario de Diseño</li></Link>
            <li className="hover:text-white transition-colors cursor-pointer">Construcción</li>
            <li className="hover:text-white transition-colors cursor-pointer">Catering & Cafetería</li>
            <li className="hover:text-white transition-colors cursor-pointer">Transporte Especializado</li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-black uppercase tracking-widest text-amber-500 mb-6">Legal</h4>
          <ul className="space-y-4 text-xs text-slate-400 font-medium">
            <li className="hover:text-white transition-colors cursor-pointer">Expediente SURL</li>
            <li className="hover:text-white transition-colors cursor-pointer flex items-center justify-between">
              <span>NIT: {LEGAL_INFO.nit}</span>
              <Shield size={12} className="text-green-500" />
            </li>
            <li className="hover:text-white transition-colors cursor-pointer">Gaceta Oficial</li>
          </ul>
        </div>
      </div>
      <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[9px] font-black uppercase tracking-[0.2em] text-slate-600">
        <p>© 2024 AKAMARA S.U.R.L. - LA HABANA, CUBA</p>
        <div className="flex space-x-6">
          <span className="hover:text-amber-500 transition-colors cursor-pointer">Privacidad</span>
          <span className="hover:text-amber-500 transition-colors cursor-pointer">Términos</span>
        </div>
      </div>
    </div>
  </footer>
);

const App = () => {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950 bg-void">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <LegalSection />
                <DivisionExplorer />
                <MobiliarioSection />
              </>
            } />
            <Route path="/legal" element={<LegalSection />} />
            <Route path="/servicios" element={<DivisionExplorer />} />
            <Route path="/contact" element={<ContactView />} />
            <Route path="/mobiliario" element={<MobiliarioSection />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
