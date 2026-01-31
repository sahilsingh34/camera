import React from 'react';
import { useBrand } from '../../context/BrandContext';
import { motion, AnimatePresence } from 'framer-motion';
import { TEXT_REVEAL, TRANSITION } from '../../lib/motion';

export default function Controls() {
    const { models, activeModel, switchModel } = useBrand();

    const currentIndex = models.findIndex(m => m.id === activeModel.id);
    const total = models.length;

    const handleNext = () => {
        const nextIndex = (currentIndex + 1) % total;
        switchModel(models[nextIndex].id);
    };

    const handlePrev = () => {
        const prevIndex = (currentIndex - 1 + total) % total;
        switchModel(models[prevIndex].id);
    };

    return (
        <div className="fixed top-1/2 right-4 md:right-12 z-40 -translate-y-1/2 flex flex-col items-center mix-blend-difference text-white select-none">

            {/* CONTROLS CONTAINER */}
            <div className="flex flex-col items-center gap-6">
                {/* PREV (Top Arrow) */}
                <button
                    onClick={handlePrev}
                    className="group relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition-all duration-300"
                >
                    <span className="sr-only">Previous</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white/60 group-hover:text-white transition-colors rotate-90">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {/* INDEX (Middle) */}
                <div className="relative h-6 w-12 overflow-hidden flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            variants={TEXT_REVEAL}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="absolute inset-0 flex items-center justify-center text-sm font-light tracking-widest text-white/90 font-mono"
                        >
                            0{currentIndex + 1}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* NEXT (Bottom Arrow) */}
                <button
                    onClick={handleNext}
                    className="group relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition-all duration-300"
                >
                    <span className="sr-only">Next</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white/60 group-hover:text-white transition-colors rotate-90">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
