import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, ArrowRight, Star } from 'lucide-react';
import { RECIPIENT_INFO } from '../../utils/constants';
import { soundManager } from '../../utils/audio';

interface IntroPageProps {
  onOpenCard: () => void;
}

export const IntroPage: React.FC<IntroPageProps> = ({ onOpenCard }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const constellationCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // 2D Constellation Canvas Animation
  useEffect(() => {
    const canvas = constellationCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    const stars: { x: number; y: number; vx: number; vy: number; radius: number; alpha: number }[] = [];
    const count = 45;

    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.7 + 0.3
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Connect near stars
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.strokeStyle = `rgba(255, 192, 203, ${(1 - dist / 130) * 0.25})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw star points
      for (const s of stars) {
        s.x += s.vx;
        s.y += s.vy;

        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;

        ctx.fillStyle = `rgba(255, 235, 180, ${s.alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animId);
  }, []);

  const handleOpenEnvelope = () => {
    if (isOpen) {
      onOpenCard();
      return;
    }
    setIsOpen(true);
    soundManager.playPop();
    soundManager.playSparkle();
    soundManager.startHappyBirthdayMelody();

    // Trigger celebration confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff758c', '#ff7eb3', '#ffd700', '#ffffff', '#a18cd1']
    });

    setTimeout(() => {
      onOpenCard();
    }, 1400);
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-8 select-none">
      {/* 2D Constellation background */}
      <canvas ref={constellationCanvasRef} className="absolute inset-0 pointer-events-none -z-10" />

      {/* Header Tagline & Birthday Date */}
      <div className="text-center mb-6 md:mb-8 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/20 border border-pink-400/40 text-pink-200 text-xs md:text-sm font-medium backdrop-blur-md mb-3 shadow-glow">
          <Star className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Special Birthday Celebration • {RECIPIENT_INFO.birthDay}</span>
          <Star className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
        </div>

        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-rose-300 to-amber-200 font-serif drop-shadow-md tracking-wide">
          {RECIPIENT_INFO.fullName}
        </h1>
        
        <p className="mt-2 text-sm md:text-base text-pink-100/80 italic font-light max-w-md mx-auto">
          Một bức thư bất ngờ và tràn ngập phép màu đang chờ bạn mở ra...
        </p>
      </div>

      {/* 2D / 3D Interactive Glowing Envelope */}
      <div
        className="relative w-full max-w-[340px] sm:max-w-[420px] aspect-[4/3] cursor-pointer group my-2 transition-transform duration-500 hover:scale-[1.02]"
        onClick={handleOpenEnvelope}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Glowing Aura Ring behind envelope */}
        <div className="absolute -inset-2 bg-gradient-to-r from-pink-500 via-purple-500 to-amber-400 rounded-3xl blur-xl opacity-50 group-hover:opacity-85 transition duration-500 animate-pulse" />

        {/* Envelope Body Container */}
        <div className="relative w-full h-full bg-gradient-to-br from-[#2a133d] to-[#1c0b29] border-2 border-pink-300/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col justify-end p-5">
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-3 left-3 text-pink-300/60 text-xs font-serif">✦ 28.09 ✦</div>
          <div className="absolute top-3 right-3 text-pink-300/60 text-xs font-serif">✦ SPECIAL ✦</div>

          {/* Envelope Top Flap */}
          <div
            className={`absolute top-0 left-0 right-0 h-[52%] bg-gradient-to-b from-[#3d1a59] to-[#2b1240] border-b border-pink-400/30 origin-top transition-transform duration-700 ease-out z-20 ${
              isOpen ? '-rotate-x-180 -translate-y-full opacity-0' : 'rotate-x-0'
            }`}
            style={{
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)'
            }}
          />

          {/* Inner Secret Letter Card emerging upon opening */}
          <div
            className={`absolute left-4 right-4 bg-gradient-to-br from-pink-50 to-white text-gray-800 rounded-xl p-3 sm:p-4 shadow-xl border border-pink-200 transition-all duration-700 ease-out z-10 flex flex-col items-center text-center ${
              isOpen
                ? 'bottom-8 scale-105 opacity-100 shadow-pink-500/50'
                : isHovered
                ? 'bottom-4 opacity-90'
                : 'bottom-2 opacity-70'
            }`}
          >
            <div className="relative mb-1">
              <img
                src="/thuy-vy.png"
                alt="Võ Thiện Thụy Vy"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover object-top border-2 border-pink-400 shadow-md ring-2 ring-amber-300/60"
              />
              <span className="absolute -top-1 -right-1 text-xs">👑</span>
            </div>
            <h3 className="font-serif font-bold text-sm sm:text-base text-rose-600">
              Happy Birthday, Thụy Vy! 🎂
            </h3>
            <p className="text-[11px] sm:text-xs text-gray-600 line-clamp-2 mt-0.5 italic">
              "{RECIPIENT_INFO.mainQuote}"
            </p>
          </div>

          {/* Envelope Front Pocket Base */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[65%] bg-gradient-to-t from-[#250d38] via-[#33144d] to-transparent z-15 pointer-events-none"
            style={{
              clipPath: 'polygon(0 100%, 100% 100%, 100% 25%, 50% 75%, 0 25%)'
            }}
          />

          {/* Golden Wax Seal with "TV" monogram */}
          <div
            className={`absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-500 ${
              isOpen ? 'scale-150 opacity-0' : 'scale-100 hover:scale-110'
            }`}
          >
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-rose-600 shadow-lg flex items-center justify-center border-2 border-amber-200 text-white font-serif font-bold text-lg md:text-xl tracking-wider ring-4 ring-pink-400/30">
              <span className="drop-shadow-sm font-['Alex_Brush'] text-2xl md:text-3xl">TV</span>
            </div>
            {/* Pulsing ring */}
            <div className="absolute inset-0 rounded-full bg-amber-400/40 animate-ping pointer-events-none -z-10" />
          </div>

          {/* Ribbon & Hint text */}
          <div className="relative z-25 text-center mt-auto pb-2">
            <p className="text-xs text-pink-200/90 font-medium flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '3s' }} />
              <span>Chạm để mở phong thư sinh nhật</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '3s' }} />
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action Button */}
      <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
        <button
          onClick={handleOpenEnvelope}
          className="group relative px-7 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-semibold text-sm md:text-base shadow-xl shadow-pink-500/30 hover:shadow-pink-500/60 hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <Heart className="w-4 h-4 text-pink-200 fill-pink-200 group-hover:scale-125 transition-transform" />
          <span>{isOpen ? "Đang mở thiệp..." : "Khám Phá Thiệp Sinh Nhật ✨"}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Bottom Floating Date Badge */}
      <div className="mt-6 text-xs text-pink-300/60 font-mono flex items-center gap-2">
        <span>✦</span>
        <span>28 . 09 • HAPPY BIRTHDAY • THỤY VY</span>
        <span>✦</span>
      </div>
    </div>
  );
};
