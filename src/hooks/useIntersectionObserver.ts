import { useEffect, useRef, useState } from 'react';
import { clearTimeout } from 'timers';

type IntersectionObserverHookParam = {
    hasNextPage: boolean;
    onChange: (data: any) => void;
    isDelay?: boolean;
};

export default function useIntersectionObserver({
    hasNextPage,
    onChange,
    isDelay = false,
}: IntersectionObserverHookParam) {
    const [element, setElement] = useState<HTMLDivElement | null>(null);
    const intersectionObserver = new IntersectionObserver((entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
            onChange((prev: any) => prev + 1);
        }
    });
    const observer = useRef(intersectionObserver);

    useEffect(() => {
        if (!element) return;

        const currentObserver = observer.current;
        let oberserverTimeout: NodeJS.Timeout = null as any;

        if (isDelay) {
            oberserverTimeout = setTimeout(() => {
                console.log(`After 3s`);
                currentObserver.observe(element);
            }, 3000);
        } else {
            console.log(`No delay`);
            currentObserver.observe(element);
        }

        if (!hasNextPage) currentObserver.unobserve(element);

        return () => {
            currentObserver.unobserve(element);
            // if (oberserverTimeout !== null) {
            //     clearTimeout(oberserverTimeout);
            // }
            clearTimeout(oberserverTimeout);
        };
    }, [element, hasNextPage, isDelay]);

    return { setElement };
}
