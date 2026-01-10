import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Sparkles, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useConfig } from '../../contexts/ConfigContext';
import { DIVISIONS } from '../../constants';
import { databases, APPWRITE_CONFIG } from '../../lib/appwrite';
import { Query } from 'appwrite';
import { LegalSection } from './Legal';


// --- SUB-COMPONENTS ---

const CinematicSlideshow = () => {
    // We assume the user will place images named slide1.jpg, slide2.jpg, etc.
    // We'll try to load up to 5 slides. If they don't exist, the UI might show broken images
    // depending on browser behavior, but we can't easily file-system check in client-side code
    // without a build step generating a manifest.
    // For simplicity, we define the paths we EXPECT.
    const slides = [
        '/images/mobiliario_slides/slide1.jpg',
        '/images/mobiliario_slides/slide2.jpg',
        '/images/mobiliario_slides/slide3.jpg',
        '/images/mobiliario_slides/slide4.jpg',
        '/images/mobiliario_slides/slide5.jpg'
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000); // Change every 5 seconds
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative w-full h-full overflow-hidden bg-slate-900">
             {/* Fallback pattern if no images loaded yet */}
             <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-700 via-slate-900 to-black"></div>

            {slides.map((slide, index) => (
                <div
                    key={slide}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                >
                    <img
                        src={slide}
                        alt={`Furniture showcase ${index + 1}`}
                        className={`w-full h-full object-cover transform transition-transform duration-[10000ms] ease-linear ${
                            index === currentSlide ? 'scale-110' : 'scale-100'
                        }`}
                        onError={(e) => {
                             // Hide broken image links if file doesn't exist
                             e.currentTarget.style.display = 'none'; 
                        }}
                    />
                     {/* Dark gradient overlay for text readability if needed, though we only have the 'D' */}
                    <div className="absolute inset-0 bg-black/20"></div>
                </div>
            ))}
        </div>
    );
};



export const Hero = () => {
    const { t } = useTranslation();
    const { config } = useConfig();
  
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-void pt-20">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[800px] h-[500px] md:h-[800px] bg-amber-600/10 rounded-full blur-[80px] animate-pulse will-change-opacity"></div>
          <div className="absolute top-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-blue-600/5 rounded-full blur-[60px]"></div>
          <img
            src="https://images.unsplash.com/photo-1464802686167-b939a67e06a1?auto=format&fit=crop&q=80&w=2000"
            className="w-full h-full object-cover opacity-20 mix-blend-screen"
            alt="Cosmic Energy"
            loading="eager"
          />
        </div>
  
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8 backdrop-blur-md hover:bg-white/10 transition-colors">
            <Sparkles className="w-4 h-4 text-amber-500 animate-spin-slow" />
            <span className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-black text-slate-300">{t('hero.subtitle')}</span>
          </div>
  
          <h1 className="text-5xl sm:text-6xl md:text-9xl font-black text-white mb-8 leading-[0.9] tracking-tighter">
            {config.site_title || 'Akamara'} <br />
            <span className="text-comet">
              {t('hero.creacion')}
            </span>
          </h1>
  
          <p className="text-base sm:text-lg md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed font-light italic px-4">
            "{t('hero.desc')}"
          </p>
  
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full px-4">
            <Link to="/catalogo" className="w-full sm:w-auto group relative px-8 md:px-12 py-4 md:py-5 bg-amber-500 text-slate-950 font-black rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(245,158,11,0.5)] transform-gpu flex justify-center items-center">
              <span className="relative z-10 flex items-center space-x-2">
                <span>{t('nav.catalogo')}</span>
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 shimmer opacity-50"></div>
            </Link>
            <Link to="/politicas" className="w-full sm:w-auto px-8 md:px-12 py-4 md:py-5 bg-white/5 border border-white/10 text-white font-bold rounded-full backdrop-blur-md hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-2">
              <Shield size={18} />
              <span>{t('hero.button_legal')}</span>
            </Link>
          </div>
        </div>
      </section>
    );
  };


  
  const DivisionCard = ({ id, icon, title, subtitle, desc, image, color }: { id: string, icon: any, title: string, subtitle: string, desc: string, image: string, color: string }) => {
    const { t } = useTranslation();
    return (
      <Link to={`/division/${id}`} className="group bg-slate-900 border border-white/5 rounded-[2rem] overflow-hidden hover:border-amber-500/50 transition-all duration-500 relative h-[500px] flex flex-col">
        <div className="absolute inset-0 z-0">
          <img src={image} className="w-full h-full object-cover opacity-40 group-hover:opacity-20 group-hover:scale-110 transition-all duration-700" alt={t(title)} />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/0 via-slate-950/80 to-slate-950"></div>
          <div className={`absolute inset-0 bg-gradient-to-tr ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
        </div>
  
        <div className="relative z-10 p-8 h-full flex flex-col">
          <div className="w-16 h-16 bg-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center text-amber-500 mb-6 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
            {icon}
          </div>
  
          <span className="text-[10px] uppercase tracking-[0.3em] font-black text-amber-500 mb-2">{t(subtitle)}</span>
          <h3 className="text-3xl font-black text-white mb-4 leading-none">{t(title)}</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
            {t(desc)}
          </p>
  
          <div className="mt-auto flex justify-between items-center border-t border-white/10 pt-6">
            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Explorar División</span>
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:translate-x-2 transition-transform">
              <ArrowUpRight className="text-white w-5 h-5" />
            </div>
          </div>
        </div>
      </Link>
    )
  };
  
  export const DivisionExplorer = () => {
    const { t } = useTranslation();
    return (
      <section className="py-32 bg-void" id="servicios">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-sm font-black text-amber-500 uppercase tracking-[0.6em] mb-4">{t('division_explorer.subtitle')}</h2>
            <h3 className="text-5xl md:text-7xl font-black text-white">{t('division_explorer.title').split(' ')[0]} <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-700">{t('division_explorer.title').split(' ').slice(1).join(' ')}</span></h3>
          </div>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {DIVISIONS.map((div) => (
              <DivisionCard key={div.id} {...div} />
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export const MobiliarioSection = () => {
    const { t } = useTranslation();
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchItems = async () => {
          try {
              const response = await databases.listDocuments(
                  APPWRITE_CONFIG.DATABASE_ID,
                  APPWRITE_CONFIG.COLLECTIONS.MOBILIARIO,
                  [Query.equal('active', true), Query.orderDesc('$createdAt'), Query.limit(4)]
              );
              setItems(response.documents);
          } catch (error) {
              console.error('Error loading mobile:', error);
          } finally {
              setLoading(false);
          }
      };
      fetchItems();
    }, []);
  
    return (
      <section className="py-32 bg-slate-950 relative border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2">
              <div className="inline-block px-4 py-2 bg-amber-500 text-slate-950 font-black text-[10px] uppercase tracking-[0.2em] rounded mb-8">
                {t('furniture_section.badge')}
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[0.9]">
                {t('furniture_section.title_main')} <br /><span className="text-slate-700 text-4xl block mt-2 font-light">{t('furniture_section.title_sub')}</span>
              </h2>
              <p className="text-slate-400 text-lg mb-12 leading-relaxed font-light border-l-2 border-amber-500 pl-6">
                {t('furniture_section.desc')}
              </p>
  
              {items.length > 0 ? (
                  <ul className="grid grid-cols-2 gap-4 mb-12">
                  {items.map(item => (
                      <li key={item.$id} className="flex items-center space-x-3 text-sm text-slate-300 group">
                      <img src={item.image_url} alt={item.name} className="w-10 h-10 rounded-lg object-cover border border-white/10 group-hover:border-amber-500 transition-colors" />
                      <div>
                          <span className="uppercase tracking-wider font-bold text-[10px] block text-white">{item.name}</span>
                          <span className="text-[9px] text-amber-500">{item.category}</span>
                      </div>
                      </li>
                  ))}
                  </ul>
              ) : (
                  <div className="mb-12 p-4 bg-white/5 rounded-xl border border-white/5 text-xs text-slate-500 italic">
                      {loading ? 'Cargando catálogo...' : 'Catálogo actualizándose...'}
                  </div>
              )}
  
              <Link to="/catalogo" className="inline-flex items-center space-x-4 bg-white/5 hover:bg-white/10 px-8 py-4 rounded-full border border-white/10 transition-colors group">
                <span className="text-white font-bold uppercase tracking-widest text-xs">{t('furniture_section.cta')}</span>
                <ArrowRight className="text-amber-500 w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
  


            <div className="lg:w-1/2 relative">
              <div className="absolute inset-0 bg-amber-500/20 blur-[100px] rounded-full opacity-50"></div>
              <div className="relative rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl group min-h-[600px] h-[600px]">
                <CinematicSlideshow />
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-20">
                  <div className="text-white font-black text-9xl opacity-10 absolute bottom-0 right-0 leading-none -mb-10 -mr-10">D</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  // --- MAIN HOME COMPONENT ---

  export const Home = () => {
    return (
        <>
            <Hero />
            <LegalSection />
            <DivisionExplorer />
            <MobiliarioSection />
        </>
    );
  };
