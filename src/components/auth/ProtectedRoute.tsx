
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { account } from '../../lib/appwrite';
import { Sparkles } from 'lucide-react';

const ProtectedRoute = () => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkSession = async () => {
            try {
                await account.get();
                setIsAuthenticated(true);
            } catch (error) {
                const hasMagicAccess = sessionStorage.getItem('magic_access') === 'true';
                if (!hasMagicAccess) {
                   // Redirect will be handled by the render logic or here
                   setIsAuthenticated(false);
                } else {
                    setIsAuthenticated(true);
                }
            } finally {
                setLoading(false);
            }
        };

        checkSession();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-void flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-amber-500 animate-spin" />
            </div>
        );
    }

    if (!isAuthenticated) {
        // Simple redirect
        window.location.hash = '#/login';
        return null;
    }

    return <Outlet />;
};

export default ProtectedRoute;
