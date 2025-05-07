import { useEffect, useState } from 'react';

const useIsLargeScreen = () => {
    const [isLarge, setIsLarge] = useState<Boolean>(false);

    useEffect(() => {
        const handleResize = () => {
            setIsLarge(window.innerWidth >= 1024);
        };

        handleResize(); // set initial
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return isLarge;
};

export default useIsLargeScreen;