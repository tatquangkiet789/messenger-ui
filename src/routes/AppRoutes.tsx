import { ROUTES } from '@src/constants/routes';
import RequiredAuth from '@src/guards/RequiredAuth';
import AuthLayout from '@src/layouts/AuthLayout/AuthLayout';
import MainLayout from '@src/layouts/MainLayout/MainLayout';
import NoLayout from '@src/layouts/NoLayout/NoLayout';
import HomePage from '@src/pages/HomePage/HomePage';
import LoginPage from '@src/pages/LoginPage/LoginPage';
import RegisterPage from '@src/pages/RegisterPage/RegisterPage';
import VideoCallPage from '@src/pages/VideoCallPage/VideoCallPage';
import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

type Route = {
    path: string;
    page: JSX.Element;
    layout: JSX.Element;
};

const AppRoutes: FC = () => {
    const publicRoutes: Route[] = [
        { path: ROUTES.LOGIN, page: <LoginPage />, layout: <AuthLayout /> },
        { path: ROUTES.REGISTER, page: <RegisterPage />, layout: <AuthLayout /> },
    ];

    const privateRoutes: Route[] = [
        { path: ROUTES.HOME, page: <HomePage />, layout: <MainLayout /> },
        { path: ROUTES.VIDEO_CALL, page: <VideoCallPage />, layout: <NoLayout /> },
    ];

    return (
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
    );
};

export default AppRoutes;
