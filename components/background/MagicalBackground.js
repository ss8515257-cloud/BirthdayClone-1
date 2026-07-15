'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks';
import { BACKGROUND_STARS, BACKGROUND_HEARTS } from '@/constants/background';

function Star({ style, delay }) {
  return (
    <div
      className="absolute h-1 w-1 rounded-full bg-champagne-gold"
      style={{
        ...style,
        animation: `twinkle 4s ease-in-out ${delay}s infinite`,
      }}
    />
  );
}

function FloatingHeart({ style, delay }) {
  return (
    <div
      className="absolute text-sm opacity-40"
      style={{
        ...style,
        animation: `float 6s ease-in-out ${delay}s infinite`,
      }}
    >
      ❤️
    </div>
  );
}

export default function MagicalBackground() {
  const canvasRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId;
    const particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < (window.innerWidth < 768 ? 25 : 50); i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(247, 231, 206, ${p.opacity})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [prefersReducedMotion]);

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-gradient-night" />

      {!prefersReducedMotion && (
        <canvas ref={canvasRef} className="absolute inset-0 opacity-60" />
      )}

      {BACKGROUND_STARS.map((star, i) => (
        <Star
          key={i}
          style={{ left: star.left, top: star.top }}
          delay={star.delay}
        />
      ))}

      {BACKGROUND_HEARTS.map((heart, i) => (
        <FloatingHeart
          key={i}
          style={{ left: heart.left, top: heart.top }}
          delay={heart.delay}
        />
      ))}

      <div className="absolute right-[10%] top-[10%] text-3xl opacity-30 sm:text-5xl">
        🌙
      </div>
      <div className="absolute left-[5%] top-[15%] hidden text-3xl opacity-20 sm:block">☁️</div>
      <div className="absolute right-[20%] top-[25%] hidden text-2xl opacity-20 sm:block">
        ☁️
      </div>
    </div>
  );
}
