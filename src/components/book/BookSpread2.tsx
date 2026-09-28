import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Wind, RotateCcw, Sparkles, Star, Flame, CheckCircle2, Heart } from 'lucide-react';
import { soundManager } from '../../utils/audio';

export const BookSpread2: React.FC = () => {
  const [candlesLit, setCandlesLit] = useState<boolean[]>([true, true, true]);
  const [hasWished, setHasWished] = useState(false);
  const [customWish, setCustomWish] = useState('');

  const allCandlesOut = candlesLit.every(lit => !lit);

  const handleBlowAll = () => {
    soundManager.playBlow();
    setCandlesLit([false, false, false]);
    setHasWished(true);

    setTimeout(() => {
      soundManager.playSparkle();
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 }
      });
    }, 250);
  };

  const handleToggleCandle = (index: number) => {
    const updated = [...candlesLit];
    updated[index] = !updated[index];
    setCandlesLit(updated);

    if (!updated[index]) soundManager.playBlow();
    else soundManager.playSparkle();

    if (updated.every(lit => !lit)) {
      setHasWished(true);
      setTimeout(() => {
        confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
      }, 250);
    }
  };

  const handleRelight = () => {
    soundManager.playSparkle();
    setCandlesLit([true, true, true]);
    setHasWished(false);
  };

  return (
    <div className="w-full h-full flex flex-col md:flex-row text-gray-800">
      {/* LEFT PAGE (Trang 3): Bánh sinh nhật 2D tương tác lớn */}
      <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-9 flex flex-col justify-between items-center text-center relative border-b md:border-b-0 md:border-r border-amber-900/10 page-left-shadow">
        <div className="w-full flex justify-between items-center text-xs font-mono text-amber-900/65 pb-2 border-b border-amber-900/15">
          <span>✦ TRANG 3 ✦</span>
          <span>NGHI THỨC SINH NHẬT</span>
        </div>

        <div className="my-1">
          <h3 className="font-serif font-bold text-xl sm:text-2xl text-rose-800 flex items-center justify-center gap-2">
            <Flame className="w-5 h-5 text-amber-500 animate-bounce" />
            <span>Thổi Nến Sinh Nhật 🎂</span>
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">Chạm vào từng ngọn nến hoặc nhấn nút bên dưới</p>
        </div>

        {/* 2D Grand Handcrafted Birthday Cake inside Book */}
        <div className="relative my-auto py-2 flex flex-col items-center select-none scale-100 sm:scale-105 md:scale-110">
          {/* Candles */}
          <div className="flex items-end justify-center gap-8 mb-[-4px] z-20">
            {[0, 1, 2].map((idx) => {
              const isLit = candlesLit[idx];
              return (
                <div
                  key={idx}
                  onClick={() => handleToggleCandle(idx)}
                  className="cursor-pointer flex flex-col items-center transition-transform hover:scale-110"
                  title={isLit ? "Thổi tắt nến" : "Thắp lại nến"}
                >
                  <div className="h-9 flex items-center justify-center">
                    {isLit ? (
                      <div className="w-4 h-8 bg-gradient-to-t from-amber-500 via-yellow-300 to-white rounded-full animate-flame-flicker shadow-lg shadow-amber-300/90" />
                    ) : (
                      <div className="w-1.5 h-7 bg-gradient-to-t from-gray-400 to-transparent rounded-full animate-drift-up" />
                    )}
                  </div>
                  <div className="w-4 h-12 bg-gradient-to-r from-amber-200 via-pink-200 to-amber-300 rounded-t-sm shadow-md border-x border-amber-300 flex flex-col justify-between py-1">
                    <div className="w-full h-0.5 bg-pink-400/50" />
                    <div className="w-full h-0.5 bg-pink-400/50" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cake Tier 1 */}
          <div className="w-40 h-16 bg-gradient-to-b from-pink-200 to-pink-300 rounded-t-2xl shadow-md border border-pink-200 flex flex-col justify-between overflow-hidden z-10">
            <div className="flex justify-around items-start">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-6 h-5 bg-white rounded-b-full shadow-inner" />
              ))}
            </div>
            <div className="flex justify-center gap-3 pb-1 text-sm">
              <span>🍓</span><span>✨</span><span>🍓</span>
            </div>
          </div>

          {/* Cake Tier 2 */}
          <div className="w-56 h-18 bg-gradient-to-b from-[#ffeaa7] to-[#fab1a0] rounded-t-2xl shadow-lg border border-pink-200 flex flex-col justify-between overflow-hidden z-8 -mt-1">
            <div className="flex justify-around items-start">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-6 h-6 bg-pink-50 rounded-b-full shadow-inner" />
              ))}
            </div>
            <div className="bg-pink-600/40 py-1 text-center font-serif text-white font-bold text-xs tracking-widest drop-shadow-sm">
              ✦ THỤY VY • 28/09 ✦
            </div>
          </div>

          {/* Cake Tier 3 Base */}
          <div className="w-68 sm:w-72 h-20 bg-gradient-to-b from-pink-300 to-rose-400 rounded-t-3xl shadow-xl border border-pink-200 flex flex-col justify-between overflow-hidden z-6 -mt-1">
            <div className="flex justify-around items-start">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="w-6 h-6 bg-white/90 rounded-b-full shadow-sm" />
              ))}
            </div>
            <div className="flex justify-around pb-1.5 text-sm">
              <span>💖</span><span>🌸</span><span>🎂</span><span>🌸</span><span>💖</span>
            </div>
          </div>

          {/* Plate */}
          <div className="w-76 sm:w-80 h-5 bg-gradient-to-r from-amber-100 via-white to-amber-200 rounded-full shadow-md border-2 border-amber-300 z-5 -mt-1" />
        </div>

        {/* Buttons */}
        <div className="w-full pt-3 border-t border-amber-900/15 flex justify-center">
          {!allCandlesOut ? (
            <button
              onClick={handleBlowAll}
              className="px-7 py-3 rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-pink-500 text-white font-bold text-sm sm:text-base shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <Wind className="w-5 h-5" />
              <span>Thổi Nến & Ước Nguyện ✨</span>
            </button>
          ) : (
            <button
              onClick={handleRelight}
              className="px-6 py-2.5 rounded-full bg-amber-100 hover:bg-amber-200 border border-amber-300 text-amber-950 text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shadow-sm"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Thắp lại nến 🕯️</span>
            </button>
          )}
        </div>
      </div>

      {/* RIGHT PAGE (Trang 4): Ước nguyện tuổi mới */}
      <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-9 flex flex-col justify-between relative page-right-shadow">
        <div className="w-full flex justify-between items-center text-xs font-mono text-amber-900/65 pb-2 border-b border-amber-900/15">
          <span>ĐIỀU ƯỚC TUỔI MỚI</span>
          <span>✦ TRANG 4 ✦</span>
        </div>

        <div className="my-auto space-y-4">
          <div className="p-4 sm:p-5 rounded-3xl bg-amber-50/90 border border-amber-200/80 shadow-md">
            <h4 className="font-serif font-bold text-base text-amber-950 flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
              <span>Ghi Lại Ước Mơ Của Thụy Vy</span>
            </h4>
            <input
              type="text"
              placeholder="Nhập điều ước của bạn vào đây trước khi thổi nến..."
              value={customWish}
              onChange={(e) => setCustomWish(e.target.value)}
              className="w-full bg-white/95 border border-amber-300/80 rounded-2xl p-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-amber-500 shadow-inner"
            />
          </div>

          {hasWished ? (
            <div className="p-4 rounded-3xl bg-gradient-to-br from-rose-50 to-pink-100 border border-pink-300/80 shadow-md animate-fade-in text-center">
              <Sparkles className="w-7 h-7 text-amber-500 mx-auto mb-1 animate-spin" style={{ animationDuration: '4s' }} />
              <h5 className="font-serif font-bold text-base text-rose-900">
                Điều Ước Đã Được Gửi Tới Vũ Trụ! 🌠
              </h5>
              <p className="text-xs sm:text-sm text-gray-700 italic mt-1 font-light leading-relaxed">
                {customWish ? `"${customWish}"` : "Mọi ước nguyện trong tim Thụy Vy vào ngày 28/09 chắc chắn sẽ thành hiện thực!"}
              </p>
            </div>
          ) : (
            <div className="p-3.5 rounded-2xl bg-purple-50/80 border border-purple-200 text-center text-xs sm:text-sm text-purple-950 font-medium">
              ✨ Hãy nhắm mắt ước một điều thật đẹp rồi thổi tắt 3 ngọn nến bên trái nhé!
            </div>
          )}

          {/* 3 Birthday Privileges Cards */}
          <div className="p-4 sm:p-5 rounded-3xl bg-pink-50/90 border border-pink-200 text-xs sm:text-sm text-gray-700 space-y-2.5 shadow-sm">
            <p className="font-bold text-rose-900 flex items-center gap-1.5 text-sm sm:text-base">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span>Đặc Quyền Sinh Nhật Ngày 28 Tháng 09:</span>
            </p>
            <div className="grid grid-cols-1 gap-2 text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Luôn luôn vui vẻ, nụ cười rạng ngời 365 ngày</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Nhận trọn vẹn yêu thương và trân trọng từ mọi người</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Vạn sự hanh thông, hoài bão chạm tới đỉnh cao</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-amber-900/15 text-center text-xs text-amber-900/65 font-mono">
          ✦ VÕ THIỆN THỤY VY • 28/09 ✦
        </div>
      </div>
    </div>
  );
};
