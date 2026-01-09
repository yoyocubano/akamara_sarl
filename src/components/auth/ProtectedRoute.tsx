import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { account } from '../../lib/appwrite';
import { Sparkles } from 'lucide-react';
import Login from '../../pages/Login';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const checkSession = async () => {
            try {
                await account.get();
                setAuthenticated(true);
            } catch (error) {
                setAuthenticated(false);
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

    const hasMagicAccess = sessionStorage.getItem('magic_access') === 'true';

    if (!session && !hasMagicAccess) {
        return <Login />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
