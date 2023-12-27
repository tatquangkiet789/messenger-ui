import { ROUTES } from '@src/constants/routes';
import RequiredAuth from '@src/guards/RequiredAuth';
import { AuthLayout, MainLayout } from '@src/layouts';
import { default as HeaderOnlyLayout } from '@src/layouts/MainLayout/MainLayout';
import NoLayout from '@src/layouts/NoLayout/NoLayout';
import { HomePage, LoginPage, RegisterPage } from '@src/pages';
import { default as MessagePage } from '@src/pages/HomePage/HomePage';
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
        { path: ROUTES.HOME, page: <HomePage />, layout: <MainLayout /> },
    ];

    const privateRoutes: Route[] = [
        { path: ROUTES.MESSAGE, page: <MessagePage />, layout: <HeaderOnlyLayout /> },
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
