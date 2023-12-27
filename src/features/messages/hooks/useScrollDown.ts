import { useEffect, useRef } from 'react';

type ScrollDownHookParam = {
    delay: number;
    scrollDownTrigger: any;
};

export default function useSrcollDown({ delay, scrollDownTrigger }: ScrollDownHookParam) {
    const elementRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (elementRef.current) {
                elementRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }, delay);

        return () => {
            clearTimeout(timeout);
        };
    }, [scrollDownTrigger, delay]);

    return elementRef;
}
