import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

export default function Navbar() {
    const [hidden, setHidden] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious();
        if (latest > previous && latest > 50) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    return (
        <motion.nav
            variants={{
                visible: { y: 0, opacity: 1 },
                hidden: { y: -20, opacity: 0 },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.4 }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-8 pointer-events-none"
        >
            {/* Brand - treated as design object, very subtle */}
            <div className="pointer-events-auto">
                <span className="text-sm font-bold tracking-[0.3em] text-white/50 mix-blend-difference uppercase font-sans">
                    VANTEXA
                </span>
            </div>

            {/* Minimal Links */}
            <div className="flex gap-8 pointer-events-auto mix-blend-difference">
                <a href="#" className="text-[10px] uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors">Menu</a>
            </div>
        </motion.nav>
    );
}
