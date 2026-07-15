// src/components/ProtectedRoute.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const navigate = useNavigate();

    useEffect(() => {
        const isAdmin = localStorage.getItem('adminAuth');
        if (!isAdmin) {
            navigate('/admin/login');
        }
    }, [navigate]);

    return <>{children}</>;
};

export default ProtectedRoute;