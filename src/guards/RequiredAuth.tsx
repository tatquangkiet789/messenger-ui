import { STORAGE_KEY } from '@src/constants/constants';
import { ROUTES } from '@src/constants/routes';
import SOCKET_EVENT from '@src/constants/socket';
import { getCurrentUserByAccessToken } from '@src/features/auth/services/authThunk';
import { useAppDispatch, useAppSelector } from '@src/hooks/useRedux';
import socketClient from '@src/lib/socketClient';
import { FC, Fragment, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const RequiredAuth: FC = () => {
    const { currentUser } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const accessToken = sessionStorage.getItem(STORAGE_KEY.ACCESS_TOKEN)!;

    // useEffect(() => {
    //     if (!accessToken) return;
    //     if (currentUser) return;

    //     dispatch(getCurrentUserByAccessToken());
    // }, [accessToken, currentUser, dispatch]);

    // useEffect(() => {
    //     if (!currentUser) return;

    //     socketClient.emit(SOCKET_EVENT.NEW_USER, currentUser.id);
    // }, [currentUser]);

    return (
        <Fragment>
            {!accessToken && !currentUser ? <Navigate to={ROUTES.LOGIN} replace /> : <Outlet />}
        </Fragment>
    );
};

export default RequiredAuth;
