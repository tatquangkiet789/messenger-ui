import { ROUTES } from '@src/constants/routes';
import RequiredAuth from '@src/guards/RequiredAuth';
import AuthLayout from '@src/layouts/AuthLayout/AuthLayout';
import MainLayout from '@src/layouts/MainLayout/MainLayout';
import HomePage from '@src/pages/HomePage/HomePage';
import LoginPage from '@src/pages/LoginPage/LoginPage';
import RegisterPage from '@src/pages/RegisterPage/RegisterPage';
import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const AppRoutes: FC = () => {
    const publicRoutes = [
        { path: ROUTES.LOGIN, page: <LoginPage />, layout: <AuthLayout /> },
        { path: ROUTES.REGISTER, page: <RegisterPage />, layout: <AuthLayout /> },
    ];

    const privateRoutes = [
        { path: ROUTES.HOME, page: <HomePage />, layout: <MainLayout /> },
    ];

    return (
        <BrowserRouter>
            <Routes>
                {/* Private Routes */}
                {privateRoutes.map(({ path, page, layout }, index) => {
                    return (
                        <Route key={index} element={<RequiredAuth />}>
                            <Route element={layout}>
                                <Route path={path} element={page} />
                            </Route>
                        </Route>
                    );
                })}
                {/* Public Routes */}
                {publicRoutes.map(({ path, page, layout }, index) => {
                    return (
                        <Route key={index} element={layout}>
                            <Route path={path} element={page} />
                        </Route>
                    );
                })}
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
