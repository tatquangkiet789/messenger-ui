import { useEffect, useState } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { getCurrentUserByAccessToken } from '@src/redux/reducers/authSlice';
import { STORAGE_KEY } from '@src/constants/constants';

const useAccessToken = () => {
    const [accessToken, setAccessToken] = useState('');

    useEffect(() => {
        setAccessToken(accessToken);
        console.log(accessToken);
    }, [accessToken]);

    return [accessToken, setAccessToken] as const;
};

export default useAccessToken;
