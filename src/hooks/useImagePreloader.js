import { useState, useEffect } from 'react';

export const useImagePreloader = (basePath, frameCount) => {
    const [images, setImages] = useState([]);
    const [loadedCount, setLoadedCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        setLoadedCount(0);
        const imgArray = [];
        let loaded = 0;

        const onImageLoad = () => {
            loaded++;
            setLoadedCount(loaded);
            if (loaded === frameCount) {
                setIsLoading(false);
            }
        };

        for (let i = 0; i < frameCount; i++) {
            const img = new Image();
            // Zero padding for 3 digits: 000, 001, ...
            const filename = i.toString().padStart(3, '0') + '.webp';
            img.src = `${basePath}/${filename}`;
            img.onload = onImageLoad;
            imgArray.push(img);
        }

        setImages(imgArray);

        // Cleanup if unmounted? Usually fine for images to keep loading/cache
        return () => {
            // clean up listeners if needed
            imgArray.forEach(img => img.onload = null);
        };

    }, [basePath, frameCount]);

    return { images, loadedCount, isLoading, progress: loadedCount / frameCount };
};
