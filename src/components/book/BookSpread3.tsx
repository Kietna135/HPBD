import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, RotateCw, Sun, Smile, Crown, Gift, Heart, CheckCircle2, Wand2, Share2, Check, RotateCcw } from 'lucide-react';
import { MEMORY_CARDS, type MemoryCard, MYSTERY_GIFTS, type MysteryGift, RECIPIENT_INFO } from '../../utils/constants';
import { soundManager } from '../../utils/audio';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  size: number;
  decay: number;
}

interface Rocket {
  x: number;
  y: number;
  targetY: number;
  vx: number;
  vy: number;
  color: string;
  exploded: boolean;
}

interface BookSpread3Props {
  onRestart: () => void;
}

export const BookSpread3: React.FC<BookSpread3Props> = ({ onRestart }) => {
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [openedGiftIds, setOpenedGiftIds] = useState<number[]>([]);
  const [selectedGift, setSelectedGift] = useState<MysteryGift | null>(null);
  const [copied, setCopied] = useState(false);
  const fireworksCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Automatic Fireworks Simulation
  useEffect(() => {
    const canvas = fireworksCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let autoLaunchTimer: number;

    const resize = () => {
      if (!canvas || !canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth || 340;
      canvas.height = 155;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: Particle[] = [];
    const rockets: Rocket[] = [];
    const colorPalette = [
      '#ff758c', '#ffd700', '#00f2fe', '#fbc2eb', '#ff4b1f', '#43e97b', '#f6d365', '#ffffff'
    ];

    const createExplosion = (x: number, y: number, color: string) => {
      const particleCount = Math.floor(Math.random() * 20) + 28;
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
        const speed = Math.random() * 3.8 + 1.2;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color,
          alpha: 1,
          size: Math.random() * 2.4 + 1.2,
          decay: Math.random() * 0.02 + 0.014
        });
      }
    };

    const launchRocket = (startX?: number, targetAltitude?: number, customColor?: string) => {
      const x = startX !== undefined ? startX : Math.random() * (canvas.width - 40) + 20;
      const targetY = targetAltitude !== undefined ? targetAltitude : Math.random() * (canvas.height * 0.55) + 15;
      const color = customColor || colorPalette[Math.floor(Math.random() * colorPalette.length)];

      rockets.push({
        x,
        y: canvas.height,
        targetY,
        vx: (Math.random() - 0.5) * 0.8,
        vy: -(Math.random() * 2.5 + 4.5),
        color,
        exploded: false
      });
    };

    // Auto-launch rockets continuously
    const scheduleAutoLaunch = () => {
      launchRocket();
      const nextDelay = Math.random() * 400 + 380;
      autoLaunchTimer = window.setTimeout(scheduleAutoLaunch, nextDelay);
    };

    launchRocket(canvas.width * 0.3, 30);
    launchRocket(canvas.width * 0.7, 40);
    scheduleAutoLaunch();

    const render = () => {
      ctx.fillStyle = 'rgba(10, 3, 22, 0.28)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.x += r.vx;
        r.y += r.vy;

        ctx.beginPath();
        ctx.arc(r.x, r.y, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = r.color;
        ctx.shadowBlur = 7;
        ctx.shadowColor = r.color;
        ctx.fill();

        if (r.y <= r.targetY || r.vy >= 0) {
          createExplosion(r.x, r.y, r.color);
          rockets.splice(i, 1);
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05;
        p.vx *= 0.98;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.shadowBlur = 8;
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
      clearTimeout(autoLaunchTimer);
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleCanvasClick = () => {
    soundManager.playSparkle();
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  const handleToggleFlip = (id: number) => {
    soundManager.playSparkle();
    setFlippedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
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

  const handleShare = () => {
    soundManager.playSparkle();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleGrandFinale = () => {
    soundManager.playSparkle();
    confetti({
      particleCount: 140,
      spread: 100,
      origin: { y: 0.5 }
    });
  };

  const renderIcon = (name: string) => {
    switch (name) {
      case 'Sun': return <Sun className="w-5 h-5" />;
      case 'Heart': return <Heart className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'Gift': return <Gift className="w-5 h-5" />;
      case 'Smile': return <Smile className="w-5 h-5" />;
      case 'Crown': return <Crown className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <div className="w-full h-full flex flex-col md:flex-row text-gray-800">
      {/* LEFT PAGE (Trang 5): 6 Thiệp chúc phúc lớn */}
      <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-9 flex flex-col justify-between relative border-b md:border-b-0 md:border-r border-amber-900/10 page-left-shadow">
        <div className="w-full flex justify-between items-center text-xs font-mono text-amber-900/65 pb-2 border-b border-amber-900/15">
          <span>✦ TRANG 5 ✦</span>
          <span>THIỆP PHƯỚC LÀNH</span>
        </div>

        <div className="my-1">
          <h3 className="font-serif font-bold text-lg sm:text-xl text-rose-800 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span>6 Điều Ước Cho {RECIPIENT_INFO.shortName} ✨</span>
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mt-0.5">Chạm vào từng tấm thiệp nhỏ để lật xem thông điệp</p>
        </div>

        {/* 6 Miniature Flip Cards Grid - Expanded Proportions */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 my-auto">
          {MEMORY_CARDS.slice(0, 6).map((card: MemoryCard) => {
            const isFlipped = flippedIds.includes(card.id);
            return (
              <div
                key={card.id}
                onClick={() => handleToggleFlip(card.id)}
                className="relative h-36 sm:h-40 md:h-44 cursor-pointer perspective-1000 group select-none"
              >
                <div
                  className={`relative w-full h-full duration-500 transform-style-preserve-3d transition-transform ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                >
                  {/* Front */}
                  <div
                    className="absolute inset-0 rounded-2xl p-3 sm:p-3.5 flex flex-col justify-between border-2 border-white/50 shadow-md backface-hidden text-white"
                    style={{ background: card.gradient }}
                  >
                    <div className="flex justify-between items-center">
                      <div className="p-1.5 rounded-xl bg-white/25 backdrop-blur-sm">
                        {renderIcon(card.iconName)}
                      </div>
                      <span className="text-lg">{card.emoji}</span>
                    </div>
                    <div>
                      <p className="font-serif font-bold text-sm sm:text-base leading-tight drop-shadow-sm">
                        {card.title}
                      </p>
                      <p className="text-xs opacity-90 mt-0.5 font-light">{card.subtitle}</p>
                    </div>
                  </div>

                  {/* Back */}
                  <div className="absolute inset-0 rounded-2xl p-3 sm:p-3.5 flex flex-col justify-between bg-[#2a133d] border-2 border-pink-400/40 shadow-xl rotate-y-180 backface-hidden text-pink-100">
                    <div className="my-auto py-1">
                      <p className="text-xs sm:text-[13px] leading-relaxed italic text-pink-100 text-center">
                        "{card.message}"
                      </p>
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-pink-300 font-medium pt-1 border-t border-pink-400/20">
                      <span>{card.title}</span>
                      <RotateCw className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-3 border-t border-amber-900/15 text-center text-xs text-amber-900/65 font-mono">
          ✦ SPECIAL EDITION • 28/09 ✦
        </div>
      </div>

      {/* RIGHT PAGE (Trang 6): Hộp quà bí mật & Pháo hoa tự động & Kỷ niệm */}
      <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-9 flex flex-col justify-between relative page-right-shadow">
        <div className="w-full flex justify-between items-center text-xs font-mono text-amber-900/65 pb-2 border-b border-amber-900/15">
          <span>QUÀ TẶNG & KẾT KHÓA</span>
          <span>✦ TRANG 6 ✦</span>
        </div>

        {/* 4 Mini Gift Boxes */}
        <div className="my-1">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-sm font-bold text-rose-800 flex items-center gap-1.5">
              <Gift className="w-4 h-4 text-pink-600" /> Hộp Quà Sinh Nhật
            </span>
            <span className="text-xs text-gray-500">Chạm mở voucher</span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {MYSTERY_GIFTS.map((gift) => {
              const isOpened = openedGiftIds.includes(gift.id);
              return (
                <div
                  key={gift.id}
                  onClick={() => handleOpenGift(gift)}
                  className={`cursor-pointer rounded-2xl p-2 sm:p-2.5 border transition-all text-center flex flex-col items-center justify-between min-h-[72px] sm:min-h-[80px] ${
                    isOpened
                      ? 'bg-pink-100 border-pink-300 shadow-md'
                      : 'bg-white hover:bg-pink-50 border-amber-200 hover:scale-105 shadow-sm'
                  }`}
                  title={gift.title}
                >
                  <div className="text-2xl sm:text-3xl my-auto">{isOpened ? gift.icon : '🎁'}</div>
                  <span className="text-[11px] sm:text-xs text-rose-950 font-semibold leading-tight text-center mt-1">
                    {gift.title}
                  </span>
                </div>
              );
            })}
          </div>

          {selectedGift && (
            <div className="mt-2 p-2.5 rounded-xl bg-pink-50 border border-pink-200 text-center animate-fade-in shadow-sm">
              <div className="flex items-center justify-center gap-1.5 text-xs text-rose-800 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> {selectedGift.voucher}
              </div>
            </div>
          )}
        </div>

        {/* Automatic Fireworks Canvas Display */}
        <div className="my-1">
          <div className="flex justify-between items-center mb-1 text-xs font-semibold text-rose-800">
            <span className="flex items-center gap-1.5">
              <Wand2 className="w-4 h-4 text-amber-500 animate-pulse" />
              <span>Pháo Hoa Tỏa Sáng Sinh Nhật 🎆</span>
            </span>
            <span className="text-[10px] text-amber-800 font-mono">✦ Happy 28/09 ✦</span>
          </div>
          <div className="rounded-2xl overflow-hidden border-2 border-amber-300/90 bg-[#080214] h-28 sm:h-32 shadow-inner relative">
            <canvas ref={fireworksCanvasRef} onClick={handleCanvasClick} className="w-full h-full block" />
            <div className="absolute top-2 right-2 text-[10px] text-amber-200/70 font-mono pointer-events-none">
              ✨ Live Fireworks
            </div>
          </div>
        </div>

        {/* Polaroid Memory Photo Mini Card */}
        <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-gradient-to-r from-amber-50 to-pink-50 border border-amber-200/90 shadow-sm">
          <div className="w-14 h-16 rounded-xl overflow-hidden border-2 border-white shadow-sm shrink-0 bg-white p-0.5">
            <img src="/thuy-vy.png" alt="Thụy Vy" className="w-full h-full object-cover object-top rounded-lg" />
          </div>
          <div className="text-left">
            <h4 className="font-serif font-bold text-sm text-rose-900">
              Happy Birthday, {RECIPIENT_INFO.shortName}!
            </h4>
            <p className="text-xs text-gray-600 italic line-clamp-1 mt-0.5 font-light">
              "{RECIPIENT_INFO.mainQuote}"
            </p>
          </div>
        </div>

        {/* Finale Action Buttons */}
        <div className="pt-3 border-t border-amber-900/15">
          <div className="flex gap-2.5">
            <button
              onClick={handleGrandFinale}
              className="flex-1 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold text-xs sm:text-sm shadow-md flex items-center justify-center gap-1.5 hover:scale-105 active:scale-95 transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>Đại Tiệc Pháo Hoa ✨</span>
            </button>

            <button
              onClick={handleShare}
              className="py-2 px-3.5 rounded-xl bg-white hover:bg-gray-50 border border-amber-300 text-gray-800 text-xs sm:text-sm font-medium flex items-center gap-1.5 shadow-sm transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              <span>{copied ? "Đã chép!" : "Chia sẻ"}</span>
            </button>

            <button
              onClick={onRestart}
              className="py-2 px-3.5 rounded-xl bg-white hover:bg-gray-50 border border-amber-300 text-gray-800 text-xs sm:text-sm font-medium flex items-center gap-1.5 shadow-sm transition-all"
              title="Lật lại trang bìa đầu"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Bìa đầu</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
