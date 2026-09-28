import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/audio';

export const AudioController: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const handleToggleMusic = () => {
    if (isPlaying) {
      soundManager.stopMusic();
      setIsPlaying(false);
    } else {
      soundManager.startHappyBirthdayMelody();
      setIsPlaying(true);
      soundManager.playSparkle();
    }
  };

  const handleToggleMute = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
    if (muted) {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    // Listen to visibility change to pause audio if tab hidden
    const handleVisibilityChange = () => {
      if (document.hidden && isPlaying) {
        soundManager.stopMusic();
        setIsPlaying(false);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isPlaying]);

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-2 rounded-full shadow-lg transition-all hover:bg-white/15">
      <button
        onClick={handleToggleMusic}
        title={isPlaying ? "Tạm dừng nhạc" : "Phát nhạc sinh nhật"}
        className={`flex items-center gap-2 text-xs md:text-sm font-medium transition-all px-2.5 py-1 rounded-full ${
          isPlaying 
            ? "bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-md shadow-pink-500/30 animate-pulse" 
            : "text-pink-100 hover:text-white"
        }`}
      >
        <Music className={`w-3.5 h-3.5 ${isPlaying ? "animate-spin" : ""}`} style={{ animationDuration: '4s' }} />
        <span>{isPlaying ? "Đang phát nhạc 🎵" : "Bật Nhạc 🎶"}</span>
      </button>

      <button
        onClick={handleToggleMute}
        title={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
        className="p-1.5 rounded-full text-pink-200 hover:text-white hover:bg-white/10 transition-colors"
      >
        {isMuted ? <VolumeX className="w-4 h-4 text-rose-300" /> : <Volume2 className="w-4 h-4" />}
      </button>

      <button
        onClick={() => soundManager.playSparkle()}
        title="Hiệu ứng lấp lánh"
        className="p-1.5 rounded-full text-amber-200 hover:text-amber-100 hover:bg-white/10 transition-colors"
      >
        <Sparkles className="w-4 h-4 animate-bounce" style={{ animationDuration: '2s' }} />
      </button>
    </div>
  );
};
