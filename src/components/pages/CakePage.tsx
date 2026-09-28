import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Wind, Flame, RotateCcw, Heart, Star } from 'lucide-react';
import { RECIPIENT_INFO } from '../../utils/constants';
import { soundManager } from '../../utils/audio';

export const CakePage: React.FC = () => {
  const [candlesLit, setCandlesLit] = useState<boolean[]>([true, true, true]);
  const [hasWished, setHasWished] = useState(false);
  const [customWish, setCustomWish] = useState('');
  const [savedWish, setSavedWish] = useState<string | null>(null);

  const allCandlesOut = candlesLit.every(lit => !lit);

  const triggerGrandConfetti = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 }
    };

    const fire = (particleRatio: number, opts: confetti.Options) => {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    };

    fire(0.25, { spread: 26, startVelocity: 55, colors: ['#ff758c', '#ffd700'] });
    fire(0.2, { spread: 60, colors: ['#ffffff', '#ff7eb3'] });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, colors: ['#a18cd1', '#fbc2eb'] });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  const handleBlowAll = () => {
    soundManager.playBlow();
    setCandlesLit([false, false, false]);
    setHasWished(true);
    if (customWish.trim()) {
      setSavedWish(customWish.trim());
    }

    setTimeout(() => {
      soundManager.playSparkle();
      triggerGrandConfetti();
    }, 300);
  };

  const handleToggleCandle = (index: number) => {
    const updated = [...candlesLit];
    updated[index] = !updated[index];
    setCandlesLit(updated);

    if (!updated[index]) {
      soundManager.playBlow();
    } else {
      soundManager.playSparkle();
    }

    if (updated.every(lit => !lit)) {
      setHasWished(true);
      setTimeout(() => {
        triggerGrandConfetti();
      }, 300);
    }
  };

  const handleRelight = () => {
    soundManager.playSparkle();
    setCandlesLit([true, true, true]);
    setHasWished(false);
  };

  return (
    <div className="relative max-w-4xl mx-auto px-4 py-6 md:py-8 text-center animate-fade-in">
      {/* Header */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/15 border border-pink-400/30 text-pink-200 text-xs md:text-sm font-medium backdrop-blur-md mb-2">
          <Flame className="w-4 h-4 text-amber-300" />
          <span>Nghi Thức Thổi Nến Sinh Nhật 28/09</span>
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white tracking-wide">
          Bánh Sinh Nhật & Điều Ước ✨
        </h2>
        <p className="text-pink-200/80 text-xs md:text-sm mt-1">
          Hãy nhắm mắt lại, ước một điều thật tuyệt vời và thổi tắt những ngọn nến!
        </p>
      </div>

      {/* Wish Input Before Blowing */}
      {!hasWished && (
        <div className="max-w-md mx-auto mb-6 bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-2xl flex items-center gap-2">
          <input
            type="text"
            placeholder="Viết điều ước bí mật của Thụy Vy vào đây..."
            value={customWish}
            onChange={(e) => setCustomWish(e.target.value)}
            className="w-full bg-transparent text-sm text-pink-100 placeholder-pink-300/50 outline-none px-2"
          />
          <Star className="w-5 h-5 text-amber-300 shrink-0 animate-spin" style={{ animationDuration: '6s' }} />
        </div>
      )}

      {/* Interactive 2D Layered Birthday Cake Illustration */}
      <div className="relative w-full max-w-[320px] sm:max-w-[360px] mx-auto my-4 py-6 flex flex-col items-center">
        {/* Glow ambient under cake */}
        <div className="absolute inset-0 bg-pink-500/20 rounded-full blur-2xl -z-10" />

        {/* Candles Group */}
        <div className="flex items-end justify-center gap-6 sm:gap-8 mb-[-4px] z-20">
          {[0, 1, 2].map((idx) => {
            const isLit = candlesLit[idx];
            return (
              <div
                key={idx}
                onClick={() => handleToggleCandle(idx)}
                className="cursor-pointer group flex flex-col items-center transition-transform duration-300 hover:scale-110"
                title={isLit ? "Chạm để thổi tắt ngọn nến này" : "Chạm để thắp lại"}
              >
                {/* Flame */}
                <div className="relative h-9 flex items-center justify-center">
                  {isLit ? (
                    <div className="relative flex flex-col items-center">
                      {/* Outer Flame Glow */}
                      <div className="w-4 h-7 bg-gradient-to-t from-amber-500 via-yellow-300 to-white rounded-full animate-flame-flicker shadow-lg shadow-amber-300/60" />
                      {/* Inner Core */}
                      <div className="absolute bottom-1 w-2 h-3.5 bg-blue-300/70 rounded-full blur-[1px]" />
                    </div>
                  ) : (
                    /* Smoke Particle Effect when blown out */
                    <div className="flex flex-col items-center animate-fade-out opacity-60">
                      <div className="w-1.5 h-6 bg-gradient-to-t from-gray-400 to-transparent rounded-full animate-drift-up" />
                    </div>
                  )}
                </div>

                {/* Candle Stick */}
                <div className="w-4 h-12 bg-gradient-to-r from-amber-200 via-pink-200 to-amber-300 rounded-t-sm shadow-md border-x border-amber-300/60 flex flex-col justify-between py-1">
                  <div className="w-full h-1 bg-pink-400/40" />
                  <div className="w-full h-1 bg-pink-400/40" />
                  <div className="w-full h-1 bg-pink-400/40" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Cake Layer 1 (Top Tier) */}
        <div className="relative w-40 sm:w-44 h-16 bg-gradient-to-b from-pink-200 via-pink-300 to-pink-400 rounded-t-2xl shadow-lg border-2 border-pink-200/60 flex flex-col justify-between overflow-hidden z-10">
          {/* White Cream Frosting Dripping */}
          <div className="flex justify-around items-start">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-6 h-5 bg-white rounded-b-full shadow-inner" />
            ))}
          </div>
          {/* Cherries / Strawberries */}
          <div className="flex justify-center gap-3 pb-1">
            <span className="text-xs">🍓</span>
            <span className="text-xs">✨</span>
            <span className="text-xs">🍓</span>
          </div>
        </div>

        {/* Cake Layer 2 (Middle Tier) */}
        <div className="relative w-56 sm:w-64 h-20 bg-gradient-to-b from-[#ffeaa7] via-[#fab1a0] to-[#e17055] rounded-t-2xl shadow-xl border-2 border-pink-200/50 flex flex-col justify-between overflow-hidden z-8 -mt-1">
          {/* Cream Dripping */}
          <div className="flex justify-around items-start">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-6 h-6 bg-pink-50 rounded-b-full shadow-inner" />
            ))}
          </div>
          {/* Middle Ribbon Banner */}
          <div className="bg-pink-600/40 py-1 text-center font-serif text-white font-bold text-xs tracking-widest drop-shadow-md">
            ✦ THỤY VY • 28/09 ✦
          </div>
        </div>

        {/* Cake Layer 3 (Bottom Tier Base) */}
        <div className="relative w-72 sm:w-80 h-24 bg-gradient-to-b from-pink-300 via-rose-400 to-purple-800 rounded-t-3xl shadow-2xl border-2 border-pink-200/40 flex flex-col justify-between overflow-hidden z-6 -mt-1">
          {/* Cream Swirls */}
          <div className="flex justify-around items-start">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="w-6 h-7 bg-white/90 rounded-b-full shadow-sm" />
            ))}
          </div>
          {/* Pearls & Ornaments */}
          <div className="flex justify-around pb-2 px-3 text-amber-200 text-xs">
            <span>💖</span>
            <span>🌸</span>
            <span>🎂</span>
            <span>🌸</span>
            <span>💖</span>
          </div>
        </div>

        {/* Plate / Cake Stand */}
        <div className="w-80 sm:w-92 h-5 bg-gradient-to-r from-amber-100 via-white to-amber-200 rounded-full shadow-2xl border-2 border-amber-300/70 z-5 -mt-1" />
        <div className="w-32 h-6 bg-gradient-to-b from-amber-200 to-amber-400 rounded-b-xl shadow-lg -mt-1" />
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        {!allCandlesOut ? (
          <button
            onClick={handleBlowAll}
            className="group px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-pink-500 text-white font-bold text-sm md:text-base shadow-lg shadow-rose-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <Wind className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            <span>Thổi Nến & Ước Nguyện 🎂💨</span>
          </button>
        ) : (
          <button
            onClick={handleRelight}
            className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-pink-200 hover:text-white text-xs md:text-sm transition-all flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Thắp Lại Nến 🕯️</span>
          </button>
        )}
      </div>

      {/* Wish Fulfillment Modal Card */}
      {hasWished && (
        <div className="mt-8 max-w-lg mx-auto bg-gradient-to-br from-pink-900/80 via-purple-900/80 to-indigo-950/80 border border-pink-300/40 rounded-3xl p-6 shadow-2xl backdrop-blur-xl animate-scale-up">
          <div className="w-12 h-12 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center mx-auto mb-3">
            <Sparkles className="w-6 h-6 animate-spin" style={{ animationDuration: '5s' }} />
          </div>

          <h3 className="text-xl md:text-2xl font-serif font-bold text-amber-200">
            Điều Ước Của Thụy Vy Đã Được Ghi Nhận! ✨
          </h3>

          <p className="mt-3 text-sm md:text-base text-pink-100 font-light leading-relaxed">
            {savedWish ? (
              <span className="italic font-normal text-amber-100">
                "{savedWish}"
              </span>
            ) : (
              "Vũ trụ đã lắng nghe tâm nguyện sinh nhật của bạn vào ngày 28/09. Tất cả những ước mơ đẹp nhất chắc chắn sẽ thành hiện thực!"
            )}
          </p>

          <div className="mt-4 pt-3 border-t border-pink-400/20 flex items-center justify-center gap-2 text-xs text-pink-300/80 font-mono">
            <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-400" />
            <span>Sinh nhật 28/09 trọn vẹn hạnh phúc • {RECIPIENT_INFO.shortName}</span>
          </div>
        </div>
      )}
    </div>
  );
};
