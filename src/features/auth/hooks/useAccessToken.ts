import { STORAGE_KEY } from '@src/constants/constants';
import { useEffect, useState } from 'react';

const useAccessToken = () => {
    const [accessToken, setAccessToken] = useState('');

    useEffect(() => {
        const storedValue = sessionStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
        if (storedValue) {
            setAccessToken(storedValue);
        }
    }, []);

    const handleSetAccessToken = (value: string) => {
        sessionStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, value);
        setAccessToken(value);
    };

    const handleRemoveAccessToken = () => {
        sessionStorage.removeItem(STORAGE_KEY.ACCESS_TOKEN);
    };

    return { accessToken, handleRemoveAccessToken, handleSetAccessToken };
};

export default useAccessToken;
