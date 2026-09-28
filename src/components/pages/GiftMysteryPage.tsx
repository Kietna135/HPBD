import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Gift, CheckCircle2, Wand2, Sparkles } from 'lucide-react';
import { MYSTERY_GIFTS, type MysteryGift, RECIPIENT_INFO } from '../../utils/constants';
import { soundManager } from '../../utils/audio';

interface SparklerPoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  size: number;
}

export const GiftMysteryPage: React.FC = () => {
  const [openedGiftIds, setOpenedGiftIds] = useState<number[]>([]);
  const [selectedGift, setSelectedGift] = useState<MysteryGift | null>(null);
  const sparklerCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const sparklerPoints = useRef<SparklerPoint[]>([]);

  // Fireworks Sparkler Canvas logic
  useEffect(() => {
    const canvas = sparklerCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = 320;
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      ctx.fillStyle = 'rgba(18, 7, 38, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = sparklerPoints.current.length - 1; i >= 0; i--) {
        const p = sparklerPoints.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05; // gravity
        p.alpha -= 0.02;

        if (p.alpha <= 0) {
          sparklerPoints.current.splice(i, 1);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.shadowBlur = 10;
          ctx.shadowColor = p.color;
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const addFireworksAt = (x: number, y: number) => {
    soundManager.playSparkle();
    const colors = ['#ff758c', '#ffd700', '#00f2fe', '#fbc2eb', '#ff4b1f', '#ffffff'];
    const burstCount = 35;
    for (let i = 0; i < burstCount; i++) {
      const angle = (Math.PI * 2 * i) / burstCount + (Math.random() - 0.5);
      const speed = Math.random() * 4 + 2;
      sparklerPoints.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        size: Math.random() * 3 + 1.5
      });
    }
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    addFireworksAt(x, y);
  };

  const handleOpenGift = (gift: MysteryGift) => {
    if (!openedGiftIds.includes(gift.id)) {
      setOpenedGiftIds(prev => [...prev, gift.id]);
    }
    setSelectedGift(gift);
    soundManager.playPop();
    soundManager.playSparkle();

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="relative max-w-5xl mx-auto px-4 py-6 md:py-8 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/15 border border-pink-400/30 text-pink-200 text-xs md:text-sm font-medium backdrop-blur-md mb-2">
          <Gift className="w-4 h-4 text-pink-300" />
          <span>Hộp Quà May Mắn & Pháo Hoa</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-wide">
          Quà Tặng Bí Mật Cho <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-amber-200">{RECIPIENT_INFO.shortName}</span>
        </h2>
        <p className="text-pink-200/80 text-xs md:text-sm mt-1">
          Chạm vào từng chiếc hộp quà để mở khóa những điều bất ngờ đặc quyền ngày 28/09!
        </p>
      </div>

      {/* 4 Mystery Gift Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {MYSTERY_GIFTS.map((gift) => {
          const isOpened = openedGiftIds.includes(gift.id);
          return (
            <div
              key={gift.id}
              onClick={() => handleOpenGift(gift)}
              className={`relative cursor-pointer group rounded-3xl p-6 border transition-all duration-500 flex flex-col items-center text-center select-none ${
                isOpened
                  ? 'bg-gradient-to-b from-purple-900/60 to-pink-950/60 border-pink-400/50 shadow-xl shadow-pink-500/10'
                  : 'bg-white/10 hover:bg-white/15 border-white/20 hover:scale-105 shadow-lg'
              }`}
            >
              {/* Gift Box Icon Graphic */}
              <div className="relative w-24 h-24 mb-4 flex items-center justify-center">
                {isOpened ? (
                  <div className="text-5xl animate-bounce">{gift.icon}</div>
                ) : (
                  <div className="relative group-hover:rotate-6 transition-transform">
                    {/* 2D Box Body */}
                    <div
                      className="w-20 h-20 rounded-2xl shadow-xl flex items-center justify-center border-2 border-white/30"
                      style={{ backgroundColor: gift.boxColor }}
                    >
                      {/* Ribbons */}
                      <div
                        className="absolute inset-y-0 w-4 shadow-sm"
                        style={{ backgroundColor: gift.ribbonColor }}
                      />
                      <div
                        className="absolute inset-x-0 h-4 shadow-sm"
                        style={{ backgroundColor: gift.ribbonColor }}
                      />
                      {/* Bow */}
                      <div className="absolute -top-3 w-8 h-8 rounded-full bg-amber-300 border-2 border-white shadow-md flex items-center justify-center text-xs">
                        🎀
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <h3 className="font-serif font-bold text-lg text-white mb-1">
                {gift.title}
              </h3>
              
              <span className="text-xs text-pink-300/80 font-medium">
                {isOpened ? "Đã mở quà ✓" : "Chạm để mở ✨"}
              </span>

              {isOpened && (
                <div className="mt-3 w-full pt-3 border-t border-white/15 text-left">
                  <p className="text-xs font-semibold text-amber-200">
                    {gift.voucher}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Gift Popup Modal / Highlight */}
      {selectedGift && (
        <div className="mb-10 max-w-xl mx-auto bg-gradient-to-br from-pink-900/90 via-purple-900/90 to-indigo-950/90 border-2 border-pink-300/40 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-xl animate-scale-up text-center">
          <div className="text-6xl mb-3 animate-pulse">{selectedGift.icon}</div>
          <div className="inline-flex items-center gap-1.5 text-xs text-pink-300 bg-pink-500/20 px-3 py-1 rounded-full border border-pink-400/30 mb-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Đặc Quyền Sinh Nhật 28/09</span>
          </div>

          <h3 className="text-2xl font-serif font-bold text-amber-200">
            {selectedGift.voucher}
          </h3>
          
          <p className="mt-3 text-sm text-pink-100 font-light leading-relaxed">
            {selectedGift.description}
          </p>

          <div className="mt-4 p-3.5 rounded-2xl bg-black/30 border border-white/10 text-xs text-pink-200/90 italic">
            "{selectedGift.blessing}"
          </div>
        </div>
      )}

      {/* Interactive Fireworks & Sparkler Painting Canvas */}
      <div className="bg-black/30 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-amber-300" />
            <h3 className="text-lg md:text-xl font-serif font-bold text-white">
              Vẽ Pháo Hoa & Tỏa Sáng Bầu Trời 🎆
            </h3>
          </div>
          <span className="text-xs text-pink-300/80">Nhấp hoặc chạm vào khung để bắn pháo hoa</span>
        </div>

        <div className="relative rounded-2xl overflow-hidden border border-pink-300/20 bg-[#0d041a] h-72 cursor-crosshair">
          <canvas
            ref={sparklerCanvasRef}
            onClick={handleCanvasClick}
            className="w-full h-full block"
          />
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none text-xs text-pink-300/60 font-mono flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Chạm bất kỳ đâu để thắp sáng bầu trời sinh nhật của Thụy Vy</span>
          </div>
        </div>
      </div>
    </div>
  );
};
