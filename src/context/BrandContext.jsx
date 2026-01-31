import React, { createContext, useContext, useState } from 'react';

const ModelData = {
    'model-01': {
        id: 'model-01',
        name: 'VANTEXA MK-I',
        subtitle: 'PRECISION OPTICS',
        description: 'A masterpiece of mechanical separation and optical purity. Engineered for the uncompromising observer.',
        accentColor: '#d4af37', // Gold
        framePath: '/frames/frame 1',
        frameCount: 168,
    },
    'model-02': {
        id: 'model-02',
        name: 'SONY ALPHA 9 III',
        subtitle: 'GLOBAL SHUTTER',
        description: 'Exmor RS™ full-frame sensor. 120fps blackout-free shooting. 1/80000s shutter speed. Zero distortion.',
        accentColor: '#a0a0a0', // Silver/Chrome
        framePath: '/frames/frame 2',
        frameCount: 168,
    }
};

const BrandContext = createContext();

export const BrandProvider = ({ children }) => {
    const [activeModelId, setActiveModelId] = useState('model-01');

    const activeModel = ModelData[activeModelId];

    const switchModel = (id) => {
        if (ModelData[id]) setActiveModelId(id);
    };

    return (
        <BrandContext.Provider value={{ activeModel, switchModel, models: Object.values(ModelData) }}>
            {children}
        </BrandContext.Provider>
    );
};

export const useBrand = () => useContext(BrandContext);
