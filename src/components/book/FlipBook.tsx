import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Sparkles } from 'lucide-react';
import { BookCover } from './BookCover';
import { BookSpread1 } from './BookSpread1';
import { BookSpread2 } from './BookSpread2';
import { BookSpread3 } from './BookSpread3';
import { soundManager } from '../../utils/audio';

export const FlipBook: React.FC = () => {
  const [currentSpread, setCurrentSpread] = useState<number>(0);
  const [isFlipping, setIsFlipping] = useState<boolean>(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next');
  const totalSpreads = 4; // 0: Cover, 1: Spread 1 (Thư & Ảnh), 2: Spread 2 (Bánh & Nến), 3: Spread 3 (Quà, Thiệp & Pháo Hoa)

  const goToSpread = (target: number) => {
    if (target === currentSpread || isFlipping || target < 0 || target >= totalSpreads) return;
    setFlipDirection(target > currentSpread ? 'next' : 'prev');
    setIsFlipping(true);
    soundManager.playPageFlip();

    setTimeout(() => {
      setCurrentSpread(target);
      setIsFlipping(false);
    }, 450);
  };

  const handleNext = () => {
    if (currentSpread < totalSpreads - 1) {
      goToSpread(currentSpread + 1);
    }
  };

  const handlePrev = () => {
    if (currentSpread > 0) {
      goToSpread(currentSpread - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSpread, isFlipping]);

  const renderSpreadContent = (spreadIdx: number) => {
    switch (spreadIdx) {
      case 0:
        return <BookCover onOpen={() => goToSpread(1)} />;
      case 1:
        return <BookSpread1 />;
      case 2:
        return <BookSpread2 />;
      case 3:
        return <BookSpread3 onRestart={() => goToSpread(0)} />;
      default:
        return <BookCover onOpen={() => goToSpread(1)} />;
    }
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-2 sm:px-4 py-2 md:py-4 flex flex-col items-center select-none book-stage">
      {/* 3D Book Body Container */}
      <div className="relative w-full max-w-6xl flex items-center justify-center">
        {/* Previous Page Arrow Button */}
        {currentSpread > 0 && (
          <button
            onClick={handlePrev}
            className="absolute -left-3 sm:-left-6 md:-left-12 lg:-left-16 z-40 p-3 sm:p-4 rounded-full bg-black/70 hover:bg-pink-600 border border-white/30 text-white backdrop-blur-md shadow-2xl hover:scale-110 active:scale-95 transition-all group"
            title="Lật trang trước (←)"
          >
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 group-hover:-translate-x-0.5 transition-transform" />
          </button>
        )}

        {/* 3D Interactive Book Shell */}
        <div
          className={`relative w-full transition-all duration-700 ${
            currentSpread === 0
              ? 'max-w-[440px] sm:max-w-[500px] md:max-w-[540px]'
              : 'max-w-full md:max-w-[1100px] lg:max-w-[1240px]'
          }`}
        >
          {/* Outer Book Glow & Shadow */}
          <div className="absolute -inset-5 bg-gradient-to-r from-purple-600/40 via-pink-500/35 to-amber-400/35 rounded-3xl blur-3xl -z-10" />

          {/* Realistic Hardcover Base Shell */}
          <div className="relative rounded-3xl p-3 sm:p-4 bg-gradient-to-r from-[#240835] via-[#38104a] to-[#240835] shadow-[0_30px_80px_-15px_rgba(0,0,0,0.95)] border-3 border-amber-400/60">
            {/* Book Spine Crease Line (Visible when open) */}
            {currentSpread > 0 && (
              <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-10 bg-gradient-to-r from-black/40 via-black/10 to-black/40 z-30 pointer-events-none rounded-sm book-spine-crease" />
            )}

            {/* Inner Pages Leaf Container with Turning Animation */}
            <div
              className={`relative w-full min-h-[560px] sm:min-h-[600px] md:min-h-[640px] lg:min-h-[670px] rounded-2xl overflow-hidden ${
                currentSpread === 0 ? 'bg-transparent' : 'parchment-texture border border-amber-900/20 shadow-inner'
              } flex transition-transform duration-500 ${
                isFlipping
                  ? flipDirection === 'next'
                    ? 'scale-[0.98] rotate-y-[-8deg]'
                    : 'scale-[0.98] rotate-y-[8deg]'
                  : 'scale-100 rotate-y-0'
              }`}
            >
              {renderSpreadContent(currentSpread)}

              {/* Clickable Page Curl Corner on Bottom Right for Next */}
              {currentSpread < totalSpreads - 1 && currentSpread > 0 && (
                <div
                  onClick={handleNext}
                  className="absolute bottom-3 right-3 text-xs text-amber-900/80 font-mono flex items-center gap-1 cursor-pointer hover:text-amber-950 transition-colors z-30 bg-amber-200/60 px-3 py-1.5 rounded-full border border-amber-300/80 shadow-md hover:scale-105"
                  title="Nhấn để lật trang tiếp theo"
                >
                  <span className="font-medium">Lật trang tiếp</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              )}

              {/* Clickable Page Corner on Bottom Left for Prev */}
              {currentSpread > 1 && (
                <div
                  onClick={handlePrev}
                  className="absolute bottom-3 left-3 text-xs text-amber-900/80 font-mono flex items-center gap-1 cursor-pointer hover:text-amber-950 transition-colors z-30 bg-amber-200/60 px-3 py-1.5 rounded-full border border-amber-300/80 shadow-md hover:scale-105"
                  title="Nhấn để lật trang trước"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="font-medium">Trang trước</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Next Page Arrow Button */}
        {currentSpread < totalSpreads - 1 && (
          <button
            onClick={handleNext}
            className="absolute -right-3 sm:-right-6 md:-right-12 lg:-right-16 z-40 p-3 sm:p-4 rounded-full bg-black/70 hover:bg-pink-600 border border-white/30 text-white backdrop-blur-md shadow-2xl hover:scale-110 active:scale-95 transition-all group"
            title="Lật trang tiếp theo (→)"
          >
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 group-hover:translate-x-0.5 transition-transform" />
          </button>
        )}
      </div>

      {/* Bottom Floating Indicator */}
      <div className="mt-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 border border-white/20 text-pink-200 text-xs font-mono backdrop-blur-md">
          <BookOpen className="w-3.5 h-3.5 text-amber-300" />
          <span>
            {currentSpread === 0
              ? 'Bìa Sách Sinh Nhật'
              : `Mục ${currentSpread} / ${totalSpreads - 1} • Võ Thiện Thụy Vy (28/09)`}
          </span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        </div>
      </div>
    </div>
  );
};
