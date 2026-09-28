import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Share2, Sparkles, RotateCcw, Check, Cake, Stars } from 'lucide-react';
import { RECIPIENT_INFO } from '../../utils/constants';
import { soundManager } from '../../utils/audio';

interface FinalLetterPageProps {
  onRestart: () => void;
}

interface Balloon {
  id: number;
  color: string;
  left: number;
  popped: boolean;
  size: number;
  speed: number;
}

export const FinalLetterPage: React.FC<FinalLetterPageProps> = ({ onRestart }) => {
  const [copied, setCopied] = useState(false);
  const [balloons, setBalloons] = useState<Balloon[]>([
    { id: 1, color: '#ff758c', left: 15, popped: false, size: 48, speed: 6 },
    { id: 2, color: '#ffd700', left: 35, popped: false, size: 54, speed: 7 },
    { id: 3, color: '#00f2fe', left: 55, popped: false, size: 50, speed: 5.5 },
    { id: 4, color: '#fbc2eb', left: 75, popped: false, size: 56, speed: 6.5 },
    { id: 5, color: '#43e97b', left: 88, popped: false, size: 46, speed: 8 },
  ]);

  const handlePopBalloon = (id: number, e: React.MouseEvent) => {
    soundManager.playPop();
    setBalloons(prev =>
      prev.map(b => (b.id === id ? { ...b, popped: true } : b))
    );

    const rect = e.currentTarget.getBoundingClientRect();
    confetti({
      particleCount: 20,
      spread: 40,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight
      }
    });
  };

  const handleShare = () => {
    soundManager.playSparkle();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleTriggerGrandFinale = () => {
    soundManager.playSparkle();
    const end = Date.now() + 2.5 * 1000;

    const interval: number = window.setInterval(() => {
      if (Date.now() > end) {
        return clearInterval(interval);
      }
      confetti({
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: { x: Math.random(), y: Math.random() - 0.2 }
      });
    }, 250);
  };

  return (
    <div className="relative max-w-4xl mx-auto px-4 py-8 md:py-12 animate-fade-in text-center">
      {/* Floating Interactive Balloons */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
        {balloons.map(b => !b.popped && (
          <div
            key={b.id}
            onClick={(e) => handlePopBalloon(b.id, e)}
            className="absolute pointer-events-auto cursor-pointer animate-float-slow group"
            style={{
              left: `${b.left}%`,
              bottom: '-80px',
              animationDuration: `${b.speed + 4}s`
            }}
            title="Chạm để nổ bóng bay 🎈"
          >
            <div
              className="rounded-full shadow-lg relative transition-transform group-hover:scale-110"
              style={{
                width: `${b.size}px`,
                height: `${b.size * 1.25}px`,
                backgroundColor: b.color,
                boxShadow: `0 8px 25px ${b.color}66`
              }}
            >
              {/* Highlight shine */}
              <div className="absolute top-2 left-2 w-3 h-4 bg-white/40 rounded-full rotate-45" />
              {/* String */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-white/40" />
            </div>
          </div>
        ))}
      </div>

      {/* Main Card Container */}
      <div className="relative bg-gradient-to-br from-[#2a133f]/90 via-[#1f0b30]/95 to-[#38154e]/90 border-2 border-pink-300/30 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-xl mb-8">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-amber-400 flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-pink-500/40">
          <Cake className="w-8 h-8" />
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/20 border border-pink-400/40 text-pink-200 text-xs md:text-sm font-medium mb-3">
          <Stars className="w-4 h-4 text-amber-300" />
          <span>28.09 • Happy Birthday</span>
        </div>

        <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-rose-300 to-amber-200 mb-4">
          Happy Birthday, {RECIPIENT_INFO.fullName}!
        </h2>

        {/* Polaroid Memory Photo Frame */}
        <div className="relative my-6 inline-block group">
          <div className="absolute -inset-2 bg-gradient-to-r from-pink-500 via-amber-300 to-rose-400 rounded-3xl blur-md opacity-50 group-hover:opacity-80 transition duration-500" />
          
          <div className="relative bg-white p-3.5 pb-6 rounded-2xl shadow-2xl rotate-[-2deg] group-hover:rotate-0 transition-transform duration-500 border border-pink-100 max-w-[260px] sm:max-w-[290px] mx-auto text-gray-800">
            {/* Washi Tape */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-pink-300/60 backdrop-blur-sm border-t border-b border-pink-400/40 rotate-2 shadow-sm" />

            <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-pink-50 border border-gray-200 shadow-inner">
              <img
                src="/thuy-vy.png"
                alt="Võ Thiện Thụy Vy"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            <div className="mt-3 text-center">
              <p className="font-['Alex_Brush'] text-2xl text-rose-600">
                Thụy Vy • 28/09
              </p>
              <p className="text-[10px] text-gray-500 font-mono tracking-widest mt-0.5">
                ✦ SPECIAL BIRTHDAY GIRL ✦
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-xl mx-auto my-4 p-4 rounded-2xl bg-white/5 border border-white/10">
          <p className="text-lg md:text-2xl font-serif italic text-pink-100 leading-relaxed font-light">
            "{RECIPIENT_INFO.mainQuote}"
          </p>
        </div>

        <p className="text-pink-100/90 text-sm md:text-base max-w-xl mx-auto leading-relaxed font-light">
          Cảm ơn bạn đã luôn là một mảnh ghép rực rỡ, mang lại niềm vui và sự ấm áp cho mọi người. Chúc Thụy Vy tuổi mới ngập tràn tiếng cười, hạnh phúc và vạn sự như ý! 🌸✨
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:gap-4">
          <button
            onClick={handleTriggerGrandFinale}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-400 text-white font-bold text-sm md:text-base shadow-xl shadow-pink-500/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5 text-amber-200 animate-spin" style={{ animationDuration: '4s' }} />
            <span>Pháo Hoa Chúc Mừng 🎆</span>
          </button>

          <button
            onClick={handleShare}
            className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-pink-100 font-medium text-sm md:text-base transition-all flex items-center gap-2"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Share2 className="w-4 h-4" />}
            <span>{copied ? "Đã sao chép liên kết! ✓" : "Chia Sẻ Thiệp 🔗"}</span>
          </button>

          <button
            onClick={onRestart}
            className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-pink-200 hover:text-white font-medium text-sm md:text-base transition-all flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Mở Lại Từ Đầu ↺</span>
          </button>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="text-xs text-pink-300/70 flex items-center justify-center gap-2 font-mono">
        <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
        <span>Made with love for Võ Thiện Thụy Vy • 28/09</span>
        <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
      </div>
    </div>
  );
};
