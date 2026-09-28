import React from 'react';
import { Mail, MessageCircle, Cake, Sparkles, Gift, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface NavbarProps {
  currentPage: number;
  totalPages: number;
  onSelectPage: (page: number) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, totalPages, onSelectPage }) => {
  const navItems = [
    { page: 0, label: 'Mở Thiệp', icon: Mail },
    { page: 1, label: 'Lời Chúc', icon: MessageCircle },
    { page: 2, label: 'Bánh & Nến', icon: Cake },
    { page: 3, label: 'Thiệp Phúc', icon: Sparkles },
    { page: 4, label: 'Hộp Quà', icon: Gift },
    { page: 5, label: 'Gửi Gắm', icon: Heart },
  ];

  const handlePageClick = (page: number) => {
    soundManager.playSparkle();
    onSelectPage(page);
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      soundManager.playSparkle();
      onSelectPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      soundManager.playSparkle();
      onSelectPage(currentPage + 1);
    }
  };

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-[95vw] sm:max-w-max bg-black/40 backdrop-blur-xl border border-white/20 px-3 py-2 rounded-full shadow-2xl flex items-center gap-1.5 sm:gap-2">
      {/* Prev button */}
      <button
        onClick={handlePrev}
        disabled={currentPage === 0}
        className="p-1.5 sm:p-2 rounded-full text-pink-200 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
        title="Trang trước"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {/* Nav dots / buttons */}
      <div className="flex items-center gap-1 sm:gap-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.page;
          return (
            <button
              key={item.page}
              onClick={() => handlePageClick(item.page)}
              className={`flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full text-xs transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-pink-500 to-rose-400 text-white font-semibold shadow-md shadow-pink-500/30 scale-105'
                  : 'text-pink-200/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Next button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages - 1}
        className="p-1.5 sm:p-2 rounded-full text-pink-200 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
        title="Trang tiếp theo"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    </nav>
  );
};
