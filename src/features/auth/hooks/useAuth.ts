import { useAppDispatch, useAppSelector } from '@src/hooks';
import { Login, LoginResponse } from '../models/auth';
import { getCurrentUserByAccessToken, login } from '../services/authThunk';
import useAccessToken from './useAccessToken';
import { useEffect } from 'react';

export default function useAuth() {
    const { accessToken, handleSetAccessToken, handleRemoveAccessToken } = useAccessToken();

    const { currentUser, isLoading } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const isAuthenticated = Boolean(currentUser);

    useEffect(() => {
        if (!accessToken) return;
        if (currentUser) return;

        dispatch(getCurrentUserByAccessToken());
    }, [accessToken, currentUser, dispatch]);

    async function handleLogin(param: Login) {
        handleRemoveAccessToken();
        await dispatch(login(param))
            .unwrap()
            .then((data: LoginResponse) => handleSetAccessToken(data.accessToken));
    }

    return { currentUser, handleLogin, isLoading, isAuthenticated };
}
