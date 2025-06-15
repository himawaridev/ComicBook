import { useState, useEffect } from 'react';

interface UseLoadingProps {
    initialLoading?: boolean;
    delay?: number;
}

const useLoading = ({ initialLoading = true, delay = 1000 }: UseLoadingProps = {}) => {
    const [isLoading, setIsLoading] = useState<boolean>(initialLoading);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, delay);
        return () => clearTimeout(timer);
    }, [delay]);

    return isLoading;
};

export default useLoading; 