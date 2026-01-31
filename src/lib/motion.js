export const EASING = {
    APPLE_PRIMARY: [0.25, 0.1, 0.25, 1],
    MECHANICAL: [0.4, 0.0, 0.2, 1], // For heavy machinery
};

export const TRANSITION = {
    PRIMARY: { duration: 0.8, ease: EASING.APPLE_PRIMARY },
    MECHANICAL: { duration: 1.0, ease: EASING.MECHANICAL },
    UI_HOVER: { duration: 0.3, ease: EASING.MECHANICAL },
};

// Apple Text Reveal Rule: Opacity 0->1, Y +8px->0, 600-800ms
export const TEXT_REVEAL = {
    hidden: { opacity: 0, y: 8 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: EASING.APPLE_PRIMARY,
            delay: delay
        }
    }),
    exit: { opacity: 0, y: -8, transition: { duration: 0.3 } }
};

// Physics-based Scroll Mapping
export const easeInOutCubic = (t) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};
