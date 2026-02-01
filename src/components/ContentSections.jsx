import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { EASING } from '../lib/motion';

const ParallaxSection = ({ title, children, subtitle, index }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // SMOOTHING: Add spring physics to the raw scroll input
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Scale: Starts small, grows to full, then stays or slighty zooms
    // Opacity: Fades in, then out
    const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1, 0.9]);
    //   const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 1]); // Keep visible longer
    const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const y = useTransform(smoothProgress, [0, 1], [50, -50]);

    return (
        <section ref={ref} className="min-h-[60vh] md:min-h-[80vh] flex items-center justify-center py-20 relative overflow-hidden">
            <motion.div
                style={{ scale, opacity, y }}
                className="max-w-4xl mx-auto px-6 md:px-12 text-center"
            >
                <div className="text-xs font-bold tracking-[0.4em] text-vantexa-accent mb-8 uppercase opacity-60">
                    0{index} — {subtitle}
                </div>
                <h2 className="text-4xl md:text-7xl font-light tracking-tighter mb-8 text-white leading-tight">
                    {title}
                </h2>
                <div className="text-base md:text-xl text-gray-400 font-light leading-normal px-4 md:px-12 border-l border-white/10 mx-auto max-w-2xl text-left md:text-center">
                    {children}
                </div>
            </motion.div>
        </section>
    );
};

export default function ContentSections() {
    return (
        <div className="bg-black relative z-20 pb-32">

            {/* 01 PHILOSOPHY */}
            <ParallaxSection index={1} subtitle="Global Shutter" title={<span>Speed, <br /> Redefined</span>}>
                The world's first full-frame global shutter image sensor. No rolling shutter distortion. No blackout. Just pure, unadulterated speed.
            </ParallaxSection>

            {/* 02 ENGINEERING */}
            <ParallaxSection index={2} subtitle="Processing" title={<span>BIONZ XR <br /> AI Force</span>}>
                Powered by the BIONZ XR™ processing engine and a dedicated AI processing unit. Real-time recognition AF with human pose estimation.
            </ParallaxSection>

            {/* 03 OPTICS */}
            <ParallaxSection index={3} subtitle="Optics" title={<span>E-Mount <br /> Legacy</span>}>
                Seamless compatibility with the legendary G Master™ series. Resolving power that matches the 120fps burst capabilities of the body.
            </ParallaxSection>

            {/* 04 MATERIALS */}
            <ParallaxSection index={4} subtitle="Build" title={<span>Magnesium <br /> Armor</span>}>
                A rigid magnesium alloy chassis designed for professional durability. Advanced heat dissipation allows for continuous 4K 120p recording.
            </ParallaxSection>

            {/* FINAL CTA */}
            <section className="min-h-[50vh] flex flex-col items-center justify-center py-32 border-t border-white/5">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: EASING.APPLE_PRIMARY }}
                    className="text-center"
                >
                    <div className="text-4xl text-white font-light mb-2">$5,999</div>
                    <div className="text-xs text-vantexa-accent tracking-widest uppercase mb-12">Available Now</div>

                    <button className="px-12 py-4 bg-white text-black text-xs font-bold tracking-[0.2em] uppercase hover:bg-gray-200 transition-colors duration-300 rounded-full">
                        Order Body
                    </button>
                    <p className="mt-6 text-[10px] text-gray-600 tracking-widest uppercase">
                        Shipment estimates: 2-3 Weeks
                    </p>
                </motion.div>
            </section>

        </div>
    );
}
