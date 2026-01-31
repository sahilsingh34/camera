import React, { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useBrand } from '../context/BrandContext';
import { useImagePreloader } from '../hooks/useImagePreloader';
import { easeInOutCubic } from '../lib/motion';

export default function Hero() {
    const { activeModel } = useBrand();
    const containerRef = useRef(null);
    const canvasRef = useRef(null);

    const { images, isLoading, progress } = useImagePreloader(activeModel.framePath, activeModel.frameCount);

    const { scrollYProgress } = useScroll({
        target: containerRef, // The tall container
        offset: ["start start", "end end"]
    });

    // Calculate current frame index based on scroll
    const [currentFrameIndex, setCurrentFrameIndex] = useState(0);

    // Draw frame logic
    const renderFrame = (index) => {
        const canvas = canvasRef.current;
        if (!canvas || !images[index]) return;

        const ctx = canvas.getContext('2d');
        const img = images[index];

        // Resize canvas to fullscreen
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Draw image "cover" style
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width / 2) - (img.width / 2) * scale;
        const y = (canvas.height / 2) - (img.height / 2) * scale;

        // Clear and draw
        // ctx.clearRect(0, 0, canvas.width, canvas.height); // Not strictly needed if covering
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    };



    // Update frame on scroll
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        // latest is 0 to 1 (linear scroll progress)
        // Apple-Style Approach: scroll controls progress, not time.
        // frameIndex = ease(scrollProgress) * totalFrames

        // "Complete finishing all frame don't scroll down":
        // Aggressive buffer: Finish at 0.7 (70%).
        // The remaining 30% is a static hold.

        const finishPoint = 0.7;
        const animationProgress = Math.min(latest / finishPoint, 1);

        const easedProgress = easeInOutCubic(animationProgress);
        const totalFrames = activeModel.frameCount - 1;
        const frame = Math.floor(easedProgress * totalFrames);

        // Clamp
        const safeFrame = Math.max(0, Math.min(frame, totalFrames));

        if (safeFrame !== currentFrameIndex) {
            renderFrame(safeFrame);
            setCurrentFrameIndex(safeFrame);
        }
    });

    // Initial draw and resize listener
    useEffect(() => {
        if (!isLoading && images.length > 0) {
            renderFrame(currentFrameIndex);
        }
    }, [isLoading, images, currentFrameIndex]);

    useEffect(() => {
        const handleResize = () => requestAnimationFrame(() => renderFrame(currentFrameIndex));
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [currentFrameIndex, images]);




    return (
        <div ref={containerRef} className="relative h-[400vh] bg-black">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas ref={canvasRef} className="block w-full h-full object-cover" />
            </div>

            {/* Scroll indicator or overlays can go here if fixed, or passed as children */}
        </div>
    );
}
