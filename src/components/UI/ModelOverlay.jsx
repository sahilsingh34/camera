import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useBrand } from '../../context/BrandContext';

export default function ModelOverlay() {
    const { activeModel } = useBrand();
    const { scrollYProgress } = useScroll();

    // Scroll Animations
    const nameOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    // Description: Fade In (0.1) -> Stay -> Fade Out (0.45)
    // CTA: Fade In (0.4) -> Stay -> Fade Out (0.5)
    // Note: Hero is 350vh.

    const descOpacity = useTransform(scrollYProgress, [0.1, 0.2, 0.35, 0.45], [0, 1, 1, 0]);
    const descY = useTransform(scrollYProgress, [0.1, 0.2, 0.35, 0.45], [20, 0, 0, -50]);

    const ctaOpacity = useTransform(scrollYProgress, [0.4, 0.5, 0.55, 0.65], [0, 1, 1, 0]);
    const ctaScale = useTransform(scrollYProgress, [0.4, 0.5], [0.9, 1]);

    return (
        <>
            {/* VERTICAL MODEL NAME - MOVED DOWN */}
            <div className="fixed top-0 bottom-0 left-4 md:left-8 z-30 flex flex-col justify-end pb-32 pointer-events-none mix-blend-difference text-white">
                <motion.h1
                    key={activeModel.id}
                    style={{ opacity: nameOpacity }}
                    initial={{ y: 50 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-[10vh] md:text-[12vh] font-bold tracking-tighter leading-none opacity-20 origin-left -rotate-90 translate-x-[-40%] whitespace-nowrap select-none font-sans"
                >
                    {activeModel.name}
                </motion.h1>
            </div>

            {/* DESCRIPTION - REVEALED ON SCROLL (Bottom Left) */}
            <motion.div
                style={{ opacity: descOpacity, y: descY }}
                className="fixed bottom-24 left-6 md:left-24 z-30 max-w-[80vw] md:max-w-sm pointer-events-none mix-blend-difference text-white"
            >
                <div className="h-[1px] w-12 bg-vantexa-accent mb-3"></div>
                <h3 className="text-xl font-light tracking-[0.2em] uppercase mb-2 text-white/90">
                    {activeModel.subtitle}
                </h3>
                <p className="text-sm text-gray-300 font-light leading-snug">
                    {activeModel.description}
                </p>
            </motion.div>


        </>
    );
}
