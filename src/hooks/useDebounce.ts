import { useEffect, useState } from 'react';

const useDebounce = (initValue: string, delay: number) => {
    const [value, setValue] = useState(initValue);

    useEffect(() => {
        const handler = setTimeout(() => {
            setValue(initValue.trim());
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [initValue, delay]);

    return value;
};

export default useDebounce;
