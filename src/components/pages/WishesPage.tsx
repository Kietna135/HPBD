import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Quote, Send, PartyPopper } from 'lucide-react';
import { RECIPIENT_INFO } from '../../utils/constants';
import { soundManager } from '../../utils/audio';

interface FlyingEmoji {
  id: number;
  emoji: string;
  x: number;
  y: number;
}

export const WishesPage: React.FC = () => {
  const [flyingEmojis, setFlyingEmojis] = useState<FlyingEmoji[]>([]);
  const [sentCount, setSentCount] = useState(28);

  const reactions = [
    { emoji: '💖', label: 'Yêu thương', sound: 'pop' },
    { emoji: '🌸', label: 'Dịu dàng', sound: 'sparkle' },
    { emoji: '✨', label: 'Tỏa sáng', sound: 'sparkle' },
    { emoji: '🎂', label: 'Sinh nhật', sound: 'pop' },
    { emoji: '🍀', label: 'May mắn', sound: 'pop' },
    { emoji: '👑', label: 'Nữ hoàng', sound: 'sparkle' }
  ];

  const handleSendReaction = (emoji: string, e: React.MouseEvent<HTMLButtonElement>) => {
    soundManager.playSparkle();
    setSentCount(prev => prev + 1);

    const rect = e.currentTarget.getBoundingClientRect();
    const newEmoji: FlyingEmoji = {
      id: Date.now() + Math.random(),
      emoji,
      x: rect.left + rect.width / 2,
      y: rect.top
    };

    setFlyingEmojis(prev => [...prev, newEmoji]);
    setTimeout(() => {
      setFlyingEmojis(prev => prev.filter(item => item.id !== newEmoji.id));
    }, 1500);

    if (Math.random() > 0.4) {
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { x: (rect.left + rect.width / 2) / window.innerWidth, y: rect.top / window.innerHeight }
      });
    }
  };

  return (
    <div className="relative max-w-4xl mx-auto px-4 py-6 md:py-10 animate-fade-in">
      {/* Floating Emojis Layer */}
      {flyingEmojis.map(item => (
        <div
          key={item.id}
          className="fixed pointer-events-none z-50 text-2xl md:text-3xl animate-float-up"
          style={{
            left: `${item.x}px`,
            top: `${item.y}px`
          }}
        >
          {item.emoji}
        </div>
      ))}

      {/* Top Banner Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/15 border border-pink-400/30 text-pink-200 text-xs md:text-sm font-medium backdrop-blur-md mb-3">
          <PartyPopper className="w-4 h-4 text-pink-300" />
          <span>Thông Điệp Đặc Biệt • 28 Tháng 09</span>
        </div>

        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-wide">
          Gửi <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-300 to-amber-200">{RECIPIENT_INFO.fullName}</span>
        </h2>
        <p className="text-pink-200/70 text-sm md:text-base mt-2 font-light">
          Ngày đặc biệt nhất của một cô gái vô cùng tuyệt vời ✨
        </p>
      </div>

      {/* Main Glassmorphic Special Quote Box with Photo */}
      <div className="relative group mb-8">
        <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-amber-300 rounded-3xl blur-md opacity-40 group-hover:opacity-75 transition duration-500" />
        
        <div className="relative bg-gradient-to-br from-[#251138]/90 via-[#1b0a2a]/95 to-[#2f1345]/90 border border-pink-300/30 rounded-3xl p-6 md:p-10 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            {/* Glamorous Framed Photo of Thụy Vy */}
            <div className="relative shrink-0 group/photo">
              {/* Outer Pulsing Aura */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-pink-500 via-amber-300 to-rose-400 rounded-3xl blur-lg opacity-60 group-hover/photo:opacity-100 transition duration-500 animate-pulse" />
              
              {/* Photo Frame */}
              <div className="relative w-44 h-56 sm:w-52 sm:h-64 rounded-2xl overflow-hidden border-2 border-pink-300/60 shadow-2xl bg-black/40">
                <img
                  src="/thuy-vy.png"
                  alt="Võ Thiện Thụy Vy"
                  className="w-full h-full object-cover object-center group-hover/photo:scale-105 transition-transform duration-700"
                />
                
                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Bottom Tag */}
                <div className="absolute bottom-2 inset-x-2 text-center bg-black/40 backdrop-blur-md py-1 px-2 rounded-lg border border-white/20">
                  <span className="text-[11px] font-medium text-pink-200">✨ Birthday Girl • 28/09 ✨</span>
                </div>

                {/* Corner Crown */}
                <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-amber-400/90 shadow-md flex items-center justify-center text-sm border border-white">
                  👑
                </div>
              </div>
            </div>

            {/* Quote & Typography */}
            <div className="flex-1 text-center md:text-left">
              <Quote className="w-8 h-8 md:w-10 md:h-10 text-pink-400/40 mx-auto md:mx-0 mb-2 rotate-180" />
              
              <blockquote className="text-xl md:text-2xl lg:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-100 via-amber-100 to-rose-200 leading-relaxed drop-shadow-sm tracking-wide">
                "{RECIPIENT_INFO.mainQuote}"
              </blockquote>

              <p className="mt-4 text-xs md:text-sm text-pink-300/80 font-mono">
                — Võ Thiện Thụy Vy • 28/09 —
              </p>

              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 border border-pink-400/30 text-xs text-pink-200">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Rạng rỡ • Dịu dàng • Tràn đầy năng lượng</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Heartwarming Letter Parchment */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 md:p-8 shadow-xl mb-8 transition-all hover:bg-white/15">
        <div className="flex items-center gap-3 border-b border-pink-300/20 pb-4 mb-5">
          <div className="w-9 h-9 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-300">
            <Heart className="w-5 h-5 fill-pink-300" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg md:text-xl text-pink-100">
              Lá Thư Gửi Tuổi Mới 💌
            </h3>
            <span className="text-xs text-pink-300/60 font-mono">To: Võ Thiện Thụy Vy (28/09)</span>
          </div>
        </div>

        <div className="text-pink-50/95 leading-relaxed font-sans text-sm md:text-base space-y-4 whitespace-pre-line font-light">
          {RECIPIENT_INFO.personalLetter}
        </div>

        {/* Signature stamp */}
        <div className="mt-6 pt-4 border-t border-pink-300/20 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-pink-300/80">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Forever Radiance & Joy</span>
          </div>
          <div className="font-['Alex_Brush'] text-2xl md:text-3xl text-amber-200">
            Happy Birthday Thụy Vy
          </div>
        </div>
      </div>

      {/* Interactive Reactions Bar */}
      <div className="bg-gradient-to-r from-purple-950/60 via-pink-950/60 to-purple-950/60 border border-pink-400/20 rounded-2xl p-4 md:p-5 backdrop-blur-md text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Send className="w-4 h-4 text-pink-300" />
          <span className="text-xs md:text-sm font-medium text-pink-200">
            Thả tim & gửi lời chúc yêu thương ({sentCount} lượt gửi ✨)
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
          {reactions.map((r, idx) => (
            <button
              key={idx}
              onClick={(e) => handleSendReaction(r.emoji, e)}
              className="group px-3.5 py-2 rounded-xl bg-white/10 hover:bg-pink-500/30 border border-white/15 hover:border-pink-300/50 transition-all transform hover:scale-110 active:scale-95 flex items-center gap-2 text-xs md:text-sm text-pink-100 shadow-sm"
            >
              <span className="text-lg md:text-xl group-hover:animate-bounce">{r.emoji}</span>
              <span className="font-medium">{r.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
