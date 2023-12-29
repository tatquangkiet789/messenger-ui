import { ROUTES } from '@src/constants/routes';
import useAuth from '@src/features/auth/hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

export default function RequiredAuth() {
    const { isAuthenticated } = useAuth();
    console.log(`RequiredAuth - isAuthenticated: `, isAuthenticated);

    return <>{isAuthenticated ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace />}</>;
}
