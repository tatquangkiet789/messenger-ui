import { ROUTES } from '@src/constants/routes';
import RequiredAuth from '@src/guards/RequiredAuth';
import { AuthLayout, HeaderLayout, MainLayout, NoLayout } from '@src/layouts';
import {
    FriendPage,
    HomePage,
    LoginPage,
    MessagePage,
    PostDetailPage,
    RegisterPage,
    UserDetail,
    VideoCallPage,
    WatchPage,
} from '@src/pages';
import { Route, Routes } from 'react-router-dom';

type Route = {
    path: string;
    page: JSX.Element;
    layout: JSX.Element;
};

export default function AppRoutes() {
    const publicRoutes: Route[] = [
        { path: ROUTES.LOGIN, page: <LoginPage />, layout: <AuthLayout /> },
        { path: ROUTES.REGISTER, page: <RegisterPage />, layout: <AuthLayout /> },

        { path: ROUTES.HOME, page: <HomePage />, layout: <MainLayout /> },
        { path: ROUTES.WATCH, page: <WatchPage />, layout: <MainLayout /> },
        { path: ROUTES.USER_DETAIL, page: <UserDetail />, layout: <MainLayout /> },
        { path: ROUTES.POST_DETAIL, page: <PostDetailPage />, layout: <NoLayout /> },
    ];

    const privateRoutes: Route[] = [
        { path: ROUTES.MESSAGE, page: <MessagePage />, layout: <HeaderLayout /> },
        { path: ROUTES.VIDEO_CALL, page: <VideoCallPage />, layout: <NoLayout /> },
        { path: ROUTES.FRIEND, page: <FriendPage />, layout: <MainLayout /> },
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
}
