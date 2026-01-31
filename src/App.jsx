import React from 'react';
import { BrandProvider, useBrand } from './context/BrandContext';
import { useImagePreloader } from './hooks/useImagePreloader';
import Hero from './components/Hero';
import ModelOverlay from './components/UI/ModelOverlay';
import Controls from './components/UI/Controls';
import Navbar from './components/UI/Navbar';
import ContentSections from './components/ContentSections';
import Footer from './components/Footer';
import SmoothScroll from './components/SmoothScroll';
import LoadingScreen from './components/UI/LoadingScreen';

const MainLayout = () => {
  const { activeModel } = useBrand();
  const { progress, isLoading } = useImagePreloader(activeModel.framePath, activeModel.frameCount);

  return (
    <main className="w-full bg-black min-h-screen text-white font-sans selection:bg-vantexa-accent selection:text-black">
      <LoadingScreen progress={progress} isLoading={isLoading} />
      <Navbar />

      <div className="relative z-10">
        <ModelOverlay />
        <Controls />
        <Hero />
      </div>

      <ContentSections />
      <Footer />
    </main>
  );
};

function App() {
  return (
    <BrandProvider>
      <SmoothScroll>
        <MainLayout />
      </SmoothScroll>
    </BrandProvider>
  );
}

export default App;
