import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  type: 'star' | 'heart' | 'petal' | 'sparkle';
  rotation: number;
  rotSpeed: number;
}

export const BackgroundEffects: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const colors = [
      'rgba(255, 182, 193, ', // Light Pink
      'rgba(255, 215, 0, ',   // Gold
      'rgba(221, 160, 221, ', // Plum
      'rgba(173, 216, 230, ', // Light Blue
      'rgba(255, 105, 180, ', // Hot Pink
      'rgba(255, 255, 255, '  // Pure white
    ];

    const particles: Particle[] = [];
    const maxParticles = 65;

    for (let i = 0; i < maxParticles; i++) {
      const typeChoice = Math.random();
      let type: Particle['type'] = 'star';
      if (typeChoice < 0.4) type = 'star';
      else if (typeChoice < 0.65) type = 'petal';
      else if (typeChoice < 0.85) type = 'heart';
      else type = 'sparkle';

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * (type === 'heart' ? 8 : type === 'petal' ? 7 : 4) + 2,
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: Math.random() * 0.9 + 0.3,
        opacity: Math.random() * 0.6 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        type,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.03
      });
    }

    // Mouse interactive sparkles
    const mouseParticles: Particle[] = [];
    const handleMouseMove = (e: MouseEvent) => {
      if (Math.random() < 0.4) {
        mouseParticles.push({
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 3 + 2,
          speedX: (Math.random() - 0.5) * 2,
          speedY: (Math.random() - 0.5) * 2 - 0.5,
          opacity: 1,
          color: 'rgba(255, 223, 100, ',
          type: 'sparkle',
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: 0.1
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const drawHeart = (c: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      c.beginPath();
      const topCurveHeight = size * 0.3;
      c.moveTo(x, y + topCurveHeight);
      c.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
      c.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + size, x, y + size * 1.2);
      c.bezierCurveTo(x, y + size, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
      c.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
      c.closePath();
      c.fill();
    };

    const drawPetal = (c: CanvasRenderingContext2D, x: number, y: number, size: number, rot: number) => {
      c.save();
      c.translate(x, y);
      c.rotate(rot);
      c.beginPath();
      c.ellipse(0, 0, size, size * 0.5, 0, 0, Math.PI * 2);
      c.fill();
      c.restore();
    };

    const drawStar = (c: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      c.beginPath();
      c.arc(x, y, size, 0, Math.PI * 2);
      c.fill();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render background floating particles
      for (const p of particles) {
        ctx.fillStyle = `${p.color}${p.opacity})`;
        p.rotation += p.rotSpeed;
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y * 0.01) * 0.5;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        if (p.type === 'heart') {
          drawHeart(ctx, p.x, p.y, p.size);
        } else if (p.type === 'petal') {
          drawPetal(ctx, p.x, p.y, p.size, p.rotation);
        } else {
          drawStar(ctx, p.x, p.y, p.size);
        }
      }

      // Render mouse spark trail
      for (let i = mouseParticles.length - 1; i >= 0; i--) {
        const mp = mouseParticles[i];
        mp.x += mp.speedX;
        mp.y += mp.speedY;
        mp.opacity -= 0.025;
        mp.size = Math.max(0, mp.size - 0.05);

        if (mp.opacity <= 0 || mp.size <= 0) {
          mouseParticles.splice(i, 1);
        } else {
          ctx.fillStyle = `${mp.color}${mp.opacity})`;
          drawStar(ctx, mp.x, mp.y, mp.size);
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Dynamic Aurora Ambient Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#120726] via-[#241142] to-[#3a0d33] -z-20 opacity-95" />
      <div className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-pink-500/15 blur-[120px] animate-pulse pointer-events-none" />
      <div className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-purple-600/20 blur-[140px] pointer-events-none" />
      <div className="absolute top-[40%] left-[30%] w-[40vw] h-[40vw] rounded-full bg-amber-400/10 blur-[130px] pointer-events-none" />
      
      {/* 2D Particles Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
