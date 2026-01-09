
import { useEffect } from 'react';
import { Routes, Route, useLocation, Outlet } from 'react-router-dom';
import { ConfigProvider } from './contexts/ConfigContext';

// Pages & Components
import Login from './pages/Login';
import AdminLayout from './layouts/AdminLayout';
import StatusDashboard from './pages/admin/StatusDashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Policies from './pages/Policies';
import MobiliarioManager from './pages/admin/MobiliarioManager';
import MessagesManager from './pages/admin/MessagesManager';
import NovedadesManager from './pages/admin/NovedadesManager';
import SettingsManager from './pages/admin/SettingsManager';
import DivisionDetail from './pages/divisions/DivisionDetail';

// New Atomic Components
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/public/Home';
import { Contact } from './pages/public/Contact';
import { Catalog } from './pages/public/Catalog';
import { DivisionExplorer } from './pages/public/Home'; // Re-export if needed or import from Home
import { MobiliarioSection } from './pages/public/Home'; // Re-export if needed

import { WhatsAppButton } from './components/WhatsAppButton';
import OriChatBot from './components/OriChatBot';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { SEO } from './components/SEO';
import { AnaliticaDeClientes } from './utils/AnaliticaDeClientes';

import './i18n';

// --- MAIN LAYOUT (Wrapper) ---
const PublicLayout = () => (
  <div className="min-h-screen flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950 bg-void">
    <Navbar />
    <main className="flex-grow">
      <Outlet />
    </main>
    <OriChatBot />
    <WhatsAppButton />
    <LanguageSwitcher />
    <Footer />
  </div>
);

const App = () => {
  const location = useLocation();

  // --- ANALYTICS & MAGIC LOGIN LISTENER ---
  useEffect(() => {
    // 1. Rastrear visita
    AnaliticaDeClientes.trackVisit(location.pathname + location.search);
  }, [location]);

  useEffect(() => {
    // 2. Escuchar Combo de Teclas Admin (Ctrl/Meta + L) - Backdoor Desktop
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        sessionStorage.setItem('magic_access', 'true');
        window.location.hash = '/admin';
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <ConfigProvider>
      <SEO />
      <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/legal" element={<Home />} /> {/* Temporary: LegalSection is in Home */}
            <Route path="/politicas" element={<Policies />} />
            <Route path="/servicios" element={<DivisionExplorer />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/catalogo" element={<Catalog />} />
            <Route path="/division/:id" element={<DivisionDetail />} />
          </Route>

          {/* Auth Route */}
          <Route path="/login" element={<Login />} />

          {/* Protected Admin Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<StatusDashboard />} />
              <Route path="novedades" element={<NovedadesManager />} />
              <Route path="mobiliario" element={<MobiliarioManager />} />
              <Route path="mensajes" element={<MessagesManager />} />
              <Route path="config" element={<SettingsManager />} />
            </Route>
          </Route>
        </Routes>
    </ConfigProvider>
  );
};

export default App;
