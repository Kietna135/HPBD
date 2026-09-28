import React, { useState, useEffect } from 'react';
import { Sun, Heart, Sparkles, Gift, Smile, Crown, Plus, MessageCircleHeart, RotateCw } from 'lucide-react';
import { MEMORY_CARDS, type MemoryCard, RECIPIENT_INFO } from '../../utils/constants';
import { soundManager } from '../../utils/audio';

interface CustomWish {
  id: string;
  author: string;
  message: string;
  color: string;
  date: string;
}

export const MemoryGalleryPage: React.FC = () => {
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [customWishes, setCustomWishes] = useState<CustomWish[]>([]);
  const [newAuthor, setNewAuthor] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [selectedColor, setSelectedColor] = useState('#ff758c');

  const stickyColors = ['#ff758c', '#a18cd1', '#4facfe', '#43e97b', '#f6d365', '#fa709a'];

  // Load custom wishes from local storage
  useEffect(() => {
    const saved = localStorage.getItem('thuyvy_wishes');
    if (saved) {
      try {
        setCustomWishes(JSON.parse(saved));
      } catch {
        // fallback
      }
    } else {
      setCustomWishes([
        {
          id: '1',
          author: 'Một người bạn thân',
          message: 'Chúc Thụy Vy tuổi mới luôn rực rỡ như hoa hướng dương và ngập tràn may mắn nhé!',
          color: '#ff758c',
          date: '28/09'
        },
        {
          id: '2',
          author: 'Secret Admirer ✨',
          message: 'Hôm nay là một ngày đặc biệt vì có một cô gái tuyệt vời như bạn xuất hiện trên đời!',
          color: '#a18cd1',
          date: '28/09'
        }
      ]);
    }
  }, []);

  const handleToggleFlip = (id: number) => {
    soundManager.playSparkle();
    setFlippedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleAddWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    soundManager.playPop();
    const wish: CustomWish = {
      id: Date.now().toString(),
      author: newAuthor.trim() || 'Người bạn giấu tên',
      message: newMessage.trim(),
      color: selectedColor,
      date: '28/09'
    };

    const updated = [wish, ...customWishes];
    setCustomWishes(updated);
    localStorage.setItem('thuyvy_wishes', JSON.stringify(updated));

    setNewAuthor('');
    setNewMessage('');
  };

  const renderIcon = (name: string) => {
    switch (name) {
      case 'Sun': return <Sun className="w-6 h-6" />;
      case 'Heart': return <Heart className="w-6 h-6" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6" />;
      case 'Gift': return <Gift className="w-6 h-6" />;
      case 'Smile': return <Smile className="w-6 h-6" />;
      case 'Crown': return <Crown className="w-6 h-6" />;
      default: return <Sparkles className="w-6 h-6" />;
    }
  };

  return (
    <div className="relative max-w-5xl mx-auto px-4 py-6 md:py-8 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/15 border border-pink-400/30 text-pink-200 text-xs md:text-sm font-medium backdrop-blur-md mb-2">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Bộ Sưu Tập Lời Chúc Rực Rỡ</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-wide">
          Gói Trọn Yêu Thương Cho <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-amber-200">{RECIPIENT_INFO.shortName}</span>
        </h2>
        <p className="text-pink-200/80 text-xs md:text-sm mt-1">
          Chạm vào từng tấm thiệp để lật mở những điều ước tuyệt vời nhất dành cho bạn!
        </p>
      </div>

      {/* 6 Flippable Memory / Blessing Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
        {MEMORY_CARDS.map((card: MemoryCard) => {
          const isFlipped = flippedIds.includes(card.id);
          return (
            <div
              key={card.id}
              onClick={() => handleToggleFlip(card.id)}
              className="relative h-64 cursor-pointer perspective-1000 group select-none"
            >
              <div
                className={`relative w-full h-full duration-500 transform-style-preserve-3d transition-transform ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* Front Side */}
                <div
                  className="absolute inset-0 rounded-3xl p-6 flex flex-col justify-between border border-white/20 shadow-xl backdrop-blur-md backface-hidden"
                  style={{
                    background: card.gradient
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-white/25 backdrop-blur-sm flex items-center justify-center text-white shadow-md">
                      {renderIcon(card.iconName)}
                    </div>
                    <span className="text-2xl drop-shadow">{card.emoji}</span>
                  </div>

                  <div>
                    <h3 className="text-xl font-serif font-bold text-white drop-shadow-sm">
                      {card.title}
                    </h3>
                    <p className="text-white/80 text-xs font-light mt-1">
                      {card.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-white/90 pt-3 border-t border-white/20 font-medium">
                    <span>Lật để xem lời chúc</span>
                    <RotateCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform" />
                  </div>
                </div>

                {/* Back Side */}
                <div
                  className="absolute inset-0 rounded-3xl p-6 flex flex-col justify-between bg-gradient-to-br from-[#291242] to-[#1a082b] border-2 border-pink-400/40 shadow-2xl rotate-y-180 backface-hidden text-pink-100"
                >
                  <div className="flex items-center justify-between border-b border-pink-400/20 pb-2">
                    <span className="text-xs font-mono text-pink-300">✦ THỤY VY • 28/09 ✦</span>
                    <span className="text-lg">{card.emoji}</span>
                  </div>

                  <p className="text-sm md:text-base font-light italic leading-relaxed text-pink-50 my-auto">
                    "{card.message}"
                  </p>

                  <div className="flex items-center justify-between text-xs text-pink-300/80 pt-2 border-t border-pink-400/20">
                    <span className="font-semibold text-amber-200">{card.title}</span>
                    <span>Chạm để lật lại ↺</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Guestbook Sticky Notes Wall */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 md:p-8 shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-pink-500/20 flex items-center justify-center text-pink-300">
            <MessageCircleHeart className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-serif font-bold text-white">
              Bảng Gắn Lời Chúc Yêu Thương 💌
            </h3>
            <p className="text-xs text-pink-200/70">
              Để lại một mẩu tin nhắn nhỏ gửi tặng Thụy Vy nhân ngày 28/09
            </p>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleAddWish} className="mb-8 bg-black/20 p-4 rounded-2xl border border-white/10 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Tên của bạn / Nickname..."
              value={newAuthor}
              onChange={(e) => setNewAuthor(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-xl px-3.5 py-2 text-sm text-pink-100 placeholder-pink-300/40 outline-none focus:border-pink-400"
            />
            {/* Color Palette Choice */}
            <div className="flex items-center gap-2 justify-start sm:justify-end">
              <span className="text-xs text-pink-200/70">Màu giấy note:</span>
              <div className="flex gap-1.5">
                {stickyColors.map((col) => (
                  <button
                    key={col}
                    type="button"
                    onClick={() => setSelectedColor(col)}
                    className={`w-6 h-6 rounded-full border-2 transition-transform ${
                      selectedColor === col ? 'scale-125 border-white shadow-md' : 'border-transparent opacity-70'
                    }`}
                    style={{ backgroundColor: col }}
                  />
                ))}
              </div>
            </div>
          </div>

          <textarea
            rows={2}
            placeholder="Viết lời chúc ngọt ngào cho Thụy Vy ở đây..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-sm text-pink-100 placeholder-pink-300/40 outline-none focus:border-pink-400 resize-none"
          />

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium text-xs md:text-sm shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Gắn Lên Bảng ✨</span>
            </button>
          </div>
        </form>

        {/* Sticky Notes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {customWishes.map((w) => (
            <div
              key={w.id}
              className="rounded-2xl p-4 shadow-lg text-gray-900 flex flex-col justify-between transform transition-transform hover:-translate-y-1 hover:rotate-1"
              style={{ backgroundColor: w.color }}
            >
              <p className="text-sm font-medium leading-relaxed mb-3">
                "{w.message}"
              </p>
              <div className="flex items-center justify-between text-xs font-semibold text-gray-800 pt-2 border-t border-black/10">
                <span>— {w.author}</span>
                <span className="text-[10px] opacity-75">{w.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
