import React from 'react';
import { Quote, Sparkles, Heart, Star, Sun, Crown } from 'lucide-react';
import { RECIPIENT_INFO } from '../../utils/constants';

export const BookSpread1: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col md:flex-row text-gray-800">
      {/* LEFT PAGE (Trang 1): Chân dung nghệ thuật lớn */}
      <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-9 flex flex-col justify-between items-center text-center relative border-b md:border-b-0 md:border-r border-amber-900/10 page-left-shadow">
        {/* Header line */}
        <div className="w-full flex justify-between items-center text-xs font-mono text-amber-900/65 pb-2 border-b border-amber-900/15">
          <span>✦ TRANG 1 ✦</span>
          <span>SPECIAL EDITION • 28/09</span>
        </div>

        {/* Vintage Framed Grand Photo */}
        <div className="my-auto py-2 relative group/photo">
          {/* Washi Tape Accent */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-36 h-7 bg-pink-300/75 backdrop-blur-sm border-t border-b border-pink-400/50 rotate-1 shadow-sm z-10" />

          {/* Large Photo Frame Container */}
          <div className="relative w-56 sm:w-68 md:w-76 lg:w-80 aspect-[3/4] max-h-[380px] rounded-3xl p-2.5 bg-gradient-to-b from-[#fffaf4] via-[#faebd7] to-[#f5dfc0] border-3 border-amber-300 shadow-2xl">
            <div className="w-full h-full rounded-2xl overflow-hidden shadow-inner bg-black/10 relative">
              <img
                src="/thuy-vy.png"
                alt="Võ Thiện Thụy Vy"
                className="w-full h-full object-cover object-top group-hover/photo:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-2.5 inset-x-2.5 bg-black/60 backdrop-blur-md text-pink-100 text-xs sm:text-sm py-1.5 px-3 rounded-xl font-medium border border-white/20 shadow-md">
                ✨ Võ Thiện Thụy Vy • 28/09 ✨
              </div>
            </div>
            {/* Crown Badge */}
            <div className="absolute -top-4 -right-3 text-3xl filter drop-shadow">
              👑
            </div>
          </div>
        </div>

        {/* Bottom Profile Details Card */}
        <div className="w-full pt-3 border-t border-amber-900/15 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100/90 border border-amber-300 text-amber-950 text-xs font-medium mb-1.5 shadow-sm">
            <Crown className="w-3.5 h-3.5 text-amber-600" />
            <span>Nữ Hoàng Ngày 28 Tháng 09</span>
          </div>
          <h3 className="font-serif font-bold text-xl sm:text-2xl text-rose-900 tracking-wide">
            {RECIPIENT_INFO.fullName}
          </h3>
          <p className="text-xs sm:text-sm text-amber-900/80 italic mt-0.5 font-light">
            "Nụ cười rạng rỡ thắp sáng mọi khoảng trời"
          </p>
        </div>
      </div>

      {/* RIGHT PAGE (Trang 2): Lá thư & Trích dẫn đắt giá */}
      <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-9 flex flex-col justify-between relative page-right-shadow">
        {/* Header line */}
        <div className="w-full flex justify-between items-center text-xs font-mono text-amber-900/65 pb-2 border-b border-amber-900/15">
          <span>THƯ GỬI THỤY VY</span>
          <span>✦ TRANG 2 ✦</span>
        </div>

        {/* Core Highlight Quote Box */}
        <div className="my-2 p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-rose-50/95 via-pink-100/80 to-amber-50/90 border border-pink-300/80 shadow-md text-center">
          <Quote className="w-6 h-6 text-rose-500/60 mx-auto mb-1.5 rotate-180" />
          <blockquote className="text-base sm:text-lg md:text-xl font-serif font-bold text-rose-900 leading-relaxed italic drop-shadow-sm">
            "{RECIPIENT_INFO.mainQuote}"
          </blockquote>
        </div>

        {/* Hand-written letter paragraphs */}
        <div className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed whitespace-pre-line font-light my-auto space-y-3">
          <p className="font-semibold text-rose-900 text-base sm:text-lg">Gửi Thụy Vy thân mến,</p>
          <p>
            Nhân ngày sinh nhật 28/09 thật đặc biệt, chúc bạn tuổi mới luôn rạng ngời như ánh nắng sớm mai, tâm hồn luôn an yên và trái tim luôn đong đầy nhiệt huyết yêu thương.
          </p>
          <p>
            Mong mọi dự định, ước mơ của bạn đều hanh thông thuận buồm xuôi gió, công việc thăng hoa và cuộc sống luôn ngập tràn những điều kỳ diệu và ngọt ngào nhất! 🌸✨
          </p>
        </div>

        {/* 3 Blessing Pills */}
        <div className="grid grid-cols-3 gap-2 my-2 text-center">
          <div className="p-2 rounded-2xl bg-pink-100/80 border border-pink-200 text-xs text-rose-900 font-semibold flex items-center justify-center gap-1.5 shadow-sm">
            <Sun className="w-4 h-4 text-amber-500" />
            <span>Tỏa Sáng</span>
          </div>
          <div className="p-2 rounded-2xl bg-amber-100/80 border border-amber-200 text-xs text-amber-950 font-semibold flex items-center justify-center gap-1.5 shadow-sm">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span>Bình An</span>
          </div>
          <div className="p-2 rounded-2xl bg-purple-100/80 border border-purple-200 text-xs text-purple-950 font-semibold flex items-center justify-center gap-1.5 shadow-sm">
            <Star className="w-4 h-4 text-purple-600 fill-purple-500" />
            <span>May Mắn</span>
          </div>
        </div>

        {/* Elegant Handwritten Signature Footer */}
        <div className="pt-3 border-t border-amber-900/15 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-rose-900/85 font-medium">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Forever Radiance & Joy</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-['Alex_Brush'] text-3xl sm:text-4xl text-rose-600">Thụy Vy 28/09</span>
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>
    </div>
  );
};
