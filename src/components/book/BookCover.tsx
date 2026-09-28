import React, { useRef, useEffect } from 'react';
import { Star, Sparkles, BookOpen, Heart } from 'lucide-react';
import { RECIPIENT_INFO } from '../../utils/constants';
import { soundManager } from '../../utils/audio';

interface BookCoverProps {
  onOpen: () => void;
}

export const BookCover: React.FC<BookCoverProps> = ({ onOpen }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const width = (canvas.width = canvas.parentElement?.clientWidth || 360);
    const height = (canvas.height = canvas.parentElement?.clientHeight || 480);

    const stars: { x: number; y: number; vx: number; vy: number; radius: number; alpha: number }[] = [];
    for (let i = 0; i < 35; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.7 + 0.3
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Connect stars
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) {
            ctx.strokeStyle = `rgba(255, 215, 0, ${(1 - dist / 80) * 0.25})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.stroke();
          }
        }
      }

      for (const s of stars) {
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;

        ctx.fillStyle = `rgba(255, 240, 180, ${s.alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animId);
  }, []);

  const handleClick = () => {
    soundManager.playSparkle();
    soundManager.playPageFlip();
    soundManager.startHappyBirthdayMelody();
    onOpen();
  };

  return (
    <div
      onClick={handleClick}
      className="relative w-full h-full min-h-[560px] sm:min-h-[600px] md:min-h-[640px] lg:min-h-[670px] rounded-2xl bg-gradient-to-br from-[#2e0e41] via-[#1c082b] to-[#45103a] border-3 border-amber-400/70 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.85)] p-6 sm:p-8 md:p-10 flex flex-col justify-between items-center text-center cursor-pointer group select-none overflow-hidden"
    >
      {/* 2D Canvas Starry Constellation on Cover */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* Ornate Gold Filigree Corners */}
      <div className="absolute top-3 left-3 text-amber-300/80 text-xl font-serif">╔══ ✦</div>
      <div className="absolute top-3 right-3 text-amber-300/80 text-xl font-serif">✦ ══╗</div>
      <div className="absolute bottom-3 left-3 text-amber-300/80 text-xl font-serif">╚══ ✦</div>
      <div className="absolute bottom-3 right-3 text-amber-300/80 text-xl font-serif">✦ ══╝</div>

      {/* Ribbon Bookmark */}
      <div className="absolute top-0 right-10 w-6 h-20 bg-gradient-to-b from-rose-500 to-pink-600 shadow-md flex flex-col justify-end items-center pb-1 rounded-b-sm border-x border-pink-400/40">
        <Sparkles className="w-3.5 h-3.5 text-amber-200" />
      </div>

      {/* Top Badge */}
      <div className="relative z-10 pt-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-200 text-xs sm:text-sm font-mono tracking-widest backdrop-blur-md shadow-lg">
          <Star className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
          <span>SPECIAL EDITION • {RECIPIENT_INFO.birthDay}</span>
          <Star className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
        </div>
      </div>

      {/* Centerpiece Book Emblem */}
      <div className="relative z-10 my-auto py-4 flex flex-col items-center">
        {/* Glowing Photo Badge in Gold Frame */}
        <div className="relative w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 mb-5 group-hover:scale-105 transition-transform duration-500">
          <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-amber-400 via-pink-500 to-amber-300 blur-md opacity-75 animate-pulse" />
          <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-amber-300 shadow-2xl p-1 bg-gradient-to-b from-amber-200 to-pink-300">
            <img
              src="/thuy-vy.png"
              alt="Thụy Vy"
              className="w-full h-full object-cover object-top rounded-full"
            />
          </div>
          {/* Royal Crown */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-3xl sm:text-4xl filter drop-shadow">
            👑
          </div>
        </div>

        {/* Embossed Title: Just THỤY VY */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-extrabold gold-foil tracking-widest uppercase drop-shadow-xl">
          {RECIPIENT_INFO.shortName}
        </h1>

        <div className="h-0.5 w-44 bg-gradient-to-r from-transparent via-amber-300 to-transparent my-3.5" />

        <h2 className="text-base sm:text-lg md:text-xl font-serif italic text-pink-200/90 font-light">
          Cuốn Sách Sinh Nhật Phép Màu ✨
        </h2>
      </div>

      {/* Wax Seal / Tap to Open Button */}
      <div className="relative z-10 pb-2 flex flex-col items-center gap-2.5">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-rose-600 border-2 border-amber-200 shadow-xl flex items-center justify-center text-white font-['Alex_Brush'] text-2xl group-hover:scale-110 transition-transform ring-4 ring-pink-500/30">
          TV
        </div>

        <div className="flex items-center gap-1.5 text-xs sm:text-sm text-amber-200/90 font-medium group-hover:text-amber-100 transition-colors">
          <BookOpen className="w-4 h-4" />
          <span>Chạm vào đây để lật mở trang sách</span>
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 animate-ping" style={{ animationDuration: '2s' }} />
        </div>
      </div>
    </div>
  );
};
