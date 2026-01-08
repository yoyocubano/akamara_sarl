
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Sparkles } from 'lucide-react';
import Login from '../../pages/Login';

const ProtectedRoute = () => {
    const [session, setSession] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoading(false);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-void flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-amber-500 animate-spin" />
            </div>
        );
    }

    if (!session) {
        return <Login />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
