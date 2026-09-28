import React from 'react';
import { BackgroundEffects } from './components/BackgroundEffects';
import { AudioController } from './components/AudioController';
import { FlipBook } from './components/book/FlipBook';

export const App: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden text-pink-50 selection:bg-pink-500 selection:text-white pb-8">
      {/* 2D Canvas Starfield & Aurora Ambient Background */}
      <BackgroundEffects />

      {/* Floating Audio Controller */}
      <AudioController />

      {/* Centerpiece 3D Interactive Storybook */}
      <main className="relative z-10 w-full flex-grow flex items-center justify-center py-6 sm:py-10">
        <FlipBook />
      </main>
    </div>
  );
};

export default App;
