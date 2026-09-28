import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Gift, CheckCircle2, Sparkles, Wand2, Share2, Check, RotateCcw } from 'lucide-react';
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

interface BookSpread4Props {
  onRestart: () => void;
}

export const BookSpread4: React.FC<BookSpread4Props> = ({ onRestart }) => {
  const [openedGiftIds, setOpenedGiftIds] = useState<number[]>([]);
  const [selectedGift, setSelectedGift] = useState<MysteryGift | null>(null);
  const [copied, setCopied] = useState(false);
  const sparklerCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const sparklerPoints = useRef<SparklerPoint[]>([]);

  useEffect(() => {
    const canvas = sparklerCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 280;
      canvas.height = 160;
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      ctx.fillStyle = 'rgba(18, 7, 38, 0.25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = sparklerPoints.current.length - 1; i >= 0; i--) {
        const p = sparklerPoints.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04;
        p.alpha -= 0.025;

        if (p.alpha <= 0) {
          sparklerPoints.current.splice(i, 1);
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
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    soundManager.playSparkle();

    const colors = ['#ff758c', '#ffd700', '#00f2fe', '#fbc2eb', '#ffffff'];
    for (let i = 0; i < 28; i++) {
      const angle = (Math.PI * 2 * i) / 28 + (Math.random() - 0.5);
      const speed = Math.random() * 3.5 + 1.5;
      sparklerPoints.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        size: Math.random() * 2.5 + 1.5
      });
    }
  };

  const handleOpenGift = (gift: MysteryGift) => {
    if (!openedGiftIds.includes(gift.id)) {
      setOpenedGiftIds(prev => [...prev, gift.id]);
    }
    setSelectedGift(gift);
    soundManager.playPop();
    soundManager.playSparkle();

    confetti({
      particleCount: 40,
      spread: 50,
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
      particleCount: 120,
      spread: 90,
      origin: { y: 0.5 }
    });
  };

  return (
    <div className="w-full h-full flex flex-col md:flex-row text-gray-800">
      {/* LEFT PAGE (Trang 7): Hộp quà bí mật */}
      <div className="w-full md:w-1/2 p-5 sm:p-7 md:p-8 flex flex-col justify-between relative border-b md:border-b-0 md:border-r border-amber-900/10 page-left-shadow">
        <div className="w-full flex justify-between items-center text-xs font-mono text-amber-900/60 pb-2 border-b border-amber-900/15">
          <span>✦ TRANG 7 ✦</span>
          <span>HỘP QUÀ BÍ MẬT</span>
        </div>

        <div className="my-2">
          <h3 className="font-serif font-bold text-base sm:text-lg text-rose-800 flex items-center gap-1.5">
            <Gift className="w-4 h-4 text-pink-600" />
            <span>Quà Tặng Sinh Nhật 🎁</span>
          </h3>
          <p className="text-[11px] text-gray-600">Chạm vào hộp quà để mở khóa voucher đặc quyền</p>
        </div>

        {/* 4 Mini Gift Boxes */}
        <div className="grid grid-cols-2 gap-3 my-auto">
          {MYSTERY_GIFTS.map((gift) => {
            const isOpened = openedGiftIds.includes(gift.id);
            return (
              <div
                key={gift.id}
                onClick={() => handleOpenGift(gift)}
                className={`cursor-pointer rounded-2xl p-3 border transition-all text-center flex flex-col items-center justify-between ${
                  isOpened
                    ? 'bg-pink-100/90 border-pink-300 shadow-sm'
                    : 'bg-white/80 hover:bg-white border-amber-200/80 hover:scale-105 shadow-sm'
                }`}
              >
                <div className="text-3xl mb-1">{isOpened ? gift.icon : '🎁'}</div>
                <h4 className="font-serif font-bold text-xs text-rose-900 line-clamp-1">{gift.title}</h4>
                <span className="text-[9px] text-gray-600 font-medium mt-0.5">
                  {isOpened ? "Đã mở ✓" : "Chạm mở ✨"}
                </span>
              </div>
            );
          })}
        </div>

        {selectedGift && (
          <div className="p-2.5 rounded-xl bg-gradient-to-r from-rose-50 to-pink-50 border border-pink-300 text-center animate-fade-in my-1">
            <div className="flex items-center justify-center gap-1 text-[10px] text-rose-700 font-semibold mb-0.5">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> {selectedGift.voucher}
            </div>
            <p className="text-[10px] text-gray-600 italic">"{selectedGift.blessing}"</p>
          </div>
        )}

        <div className="pt-2 border-t border-amber-900/15 text-center text-xs text-amber-900/60 font-mono">
          ✦ VÕ THIỆN THỤY VY • 28/09 ✦
        </div>
      </div>

      {/* RIGHT PAGE (Trang 8): Bầu trời pháo hoa & Polaroid kỷ niệm */}
      <div className="w-full md:w-1/2 p-5 sm:p-7 md:p-8 flex flex-col justify-between relative page-right-shadow">
        <div className="w-full flex justify-between items-center text-xs font-mono text-amber-900/60 pb-2 border-b border-amber-900/15">
          <span>KẾT KHÓA & BẦU TRỜI SAO</span>
          <span>✦ TRANG 8 ✦</span>
        </div>

        {/* Interactive Fireworks Canvas inside Book */}
        <div className="my-2">
          <div className="flex justify-between items-center mb-1 text-[11px] font-medium text-rose-800">
            <span className="flex items-center gap-1">
              <Wand2 className="w-3 h-3 text-amber-500" /> Vẽ Pháo Hoa Bầu Trời
            </span>
            <span className="text-[9px] text-gray-500">Chạm khung để bắn pháo</span>
          </div>
          <div className="rounded-xl overflow-hidden border border-amber-300 bg-[#0c0419] h-28 cursor-crosshair">
            <canvas ref={sparklerCanvasRef} onClick={handleCanvasClick} className="w-full h-full block" />
          </div>
        </div>

        {/* Polaroid Memory Photo Mini Card */}
        <div className="my-auto flex items-center gap-3 p-2.5 rounded-2xl bg-gradient-to-r from-amber-50 to-pink-50 border border-amber-200/80 shadow-sm">
          <div className="w-16 h-18 rounded-lg overflow-hidden border border-white shadow-sm shrink-0 bg-white p-1">
            <img src="/thuy-vy.png" alt="Thụy Vy" className="w-full h-full object-cover object-top rounded-sm" />
          </div>
          <div className="text-left">
            <h4 className="font-serif font-bold text-xs sm:text-sm text-rose-900">
              Happy Birthday, {RECIPIENT_INFO.shortName}!
            </h4>
            <p className="text-[10px] text-gray-600 italic line-clamp-2 mt-0.5">
              "{RECIPIENT_INFO.mainQuote}"
            </p>
          </div>
        </div>

        {/* Finale Action Buttons */}
        <div className="pt-2 border-t border-amber-900/15 space-y-2">
          <div className="flex gap-2">
            <button
              onClick={handleGrandFinale}
              className="flex-1 py-1.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-medium text-xs shadow-md flex items-center justify-center gap-1 hover:scale-105 active:scale-95 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>Pháo Hoa 🎆</span>
            </button>

            <button
              onClick={handleShare}
              className="py-1.5 px-3 rounded-xl bg-white hover:bg-gray-50 border border-amber-300 text-gray-800 text-xs font-medium flex items-center gap-1 shadow-sm transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? "Đã chép!" : "Chia sẻ"}</span>
            </button>

            <button
              onClick={onRestart}
              className="py-1.5 px-3 rounded-xl bg-white hover:bg-gray-50 border border-amber-300 text-gray-800 text-xs font-medium flex items-center gap-1 shadow-sm transition-all"
              title="Lật lại trang bìa đầu"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Bìa đầu</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
