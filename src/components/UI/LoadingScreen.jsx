import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EASING } from '../../lib/motion';

export default function LoadingScreen({ progress, isLoading }) {
    const [show, setShow] = useState(true);

    useEffect(() => {
        if (isLoading) {
            setShow(true);
        }
        if (!isLoading && progress === 1) {
            // Small pause before disappearing adds luxury pacing
            const timer = setTimeout(() => setShow(false), 500);
            return () => clearTimeout(timer);
        }
    }, [isLoading, progress]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.8, ease: EASING.APPLE_PRIMARY } }}
                    transition={{ duration: 0.5, ease: EASING.APPLE_PRIMARY }}
                    className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center pointer-events-none"
                >
                    {/* WORDMARK */}
                    <div className="mb-8 overflow-hidden">
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: EASING.APPLE_PRIMARY }}
                            className="text-2xl font-bold tracking-[0.4em] text-white uppercase font-sans"
                        >
                            Vantexa
                        </motion.h1>
                    </div>

                    {/* PROGRESS BAR - THIN, LINEAR */}
                    <div className="w-64 h-[1px] bg-white/20 overflow-hidden relative">
                        <motion.div
                            className="h-full bg-white absolute top-0 left-0"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress * 100}%` }}
                            transition={{ ease: "linear", duration: 0.1 }}
                        />
                    </div>

                    <div className="mt-4 text-[10px] tracking-widest text-white/40 font-mono">
                        INITIALIZING SYSTEM / {Math.round(progress * 100)}%
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
