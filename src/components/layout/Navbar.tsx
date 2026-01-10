
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useConfig } from '../../contexts/ConfigContext';
import logo from '../../assets/logo.png';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { config } = useConfig();
  const timerRef = useRef<NodeJS.Timeout | null>(null);


  const links = [
    { name: t('nav.hub'), path: '/' },
    { name: t('nav.legal'), path: '/politicas' },
    { name: t('nav.catalogo') || 'Catálogo', path: '/catalogo' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <div 
              className="flex items-center space-x-4 group perspective-[1000px] cursor-pointer select-none"
              onMouseDown={() => {
                timerRef.current = setTimeout(() => {
                  navigate('/admin');
                }, 40000); // 40 seconds magic entry
              }}
              onMouseUp={() => clearTimeout(timerRef.current!)}
              onMouseLeave={() => clearTimeout(timerRef.current!)}
              onTouchStart={() => {
                timerRef.current = setTimeout(() => {
                  navigate('/admin');
                }, 40000);
              }}
              onTouchEnd={() => clearTimeout(timerRef.current!)}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-amber-500 blur-md opacity-20 group-hover:opacity-60 transition-opacity duration-500"></div>
                <img src={logo} alt="Akamara Logo" className="relative w-12 h-12 md:w-16 md:h-16 object-contain drop-shadow-2xl logo-beat transition-all duration-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg md:text-xl font-black tracking-tighter text-white uppercase group-hover:text-amber-500 transition-colors duration-300">{config.site_title || 'Akamara'}</span>
                <span className="text-[8px] md:text-[9px] uppercase tracking-[0.4em] text-slate-400 font-bold">{config.site_slogan || 'Inicio de la Creación'}</span>
              </div>
            </div>
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
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-white hover:text-amber-500 transition-colors p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`md:hidden fixed inset-x-0 top-20 bg-slate-950/95 backdrop-blur-2xl border-b border-white/10 transition-all duration-300 ease-in-out transform origin-top ${isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'} h-screen`}>
        <div className="p-6 space-y-6 flex flex-col items-center pt-12">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block text-slate-300 text-xl font-black uppercase tracking-widest py-3 hover:text-amber-500 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-8 border-t border-white/5 w-full flex justify-center">
             <span className="text-slate-600 text-xs uppercase tracking-widest">Akamara S.U.R.L.</span>
          </div>
        </div>
      </div>
    </nav>
  );
};
