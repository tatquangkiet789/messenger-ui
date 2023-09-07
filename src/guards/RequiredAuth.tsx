import { STORAGE_KEY } from '@src/constants/constants';
import { ROUTES } from '@src/constants/routes';
import SOCKET_EVENT from '@src/constants/socket';
import { useAppDispatch } from '@src/hooks/useAppDispatch';
import { useAppSelector } from '@src/hooks/useAppSelector';
import socketClient from '@src/lib/socketClient';
import { getCurrentUserByAccessToken } from '@src/redux/reducers/authSlice';
import { FC, Fragment, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const RequiredAuth: FC = () => {
    const { currentUser } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const accessToken = sessionStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);

    useEffect(() => {
        if (!accessToken) return;
        if (currentUser) return;

        dispatch(getCurrentUserByAccessToken(accessToken));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken, currentUser]);

    useEffect(() => {
        if (!currentUser) return;

        socketClient.emit(SOCKET_EVENT.NEW_USER, currentUser.username);
    }, [currentUser]);

    return (
        <Fragment>
            {!accessToken && !currentUser ? (
                <Navigate to={ROUTES.LOGIN} replace />
            ) : (
                <Outlet />
            )}
        </Fragment>
    );
};

export default RequiredAuth;
