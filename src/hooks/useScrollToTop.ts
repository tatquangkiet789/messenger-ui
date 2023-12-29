import { useEffect, useRef } from 'react';

export default function useScrollToTop(page: number) {
    const elementRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!elementRef.current) return;
        if (page > 1) return;

        elementRef.current.scrollTop = 0;
    }, [page]);

    return { elementRef };
}
