import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  angle: number;
  angleSpeed: number;
  opacity: number;
  type: 'petal' | 'heart' | 'sparkle';
  color: string;
}

export function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const colors = [
      'rgba(16, 185, 129, 0.55)',
      'rgba(52, 211, 153, 0.50)',
      'rgba(5, 150, 105, 0.55)',
      'rgba(225, 29, 72, 0.45)',
      'rgba(244, 63, 94, 0.40)',
      'rgba(245, 158, 11, 0.40)',
    ];
    const count = window.innerWidth < 768 ? 24 : 45;
    const particles: Particle[] = [];

    const createParticle = (): Particle => {
      const rand = Math.random();
      const type = rand < 0.55 ? 'petal' : rand < 0.85 ? 'heart' : 'sparkle';
      return {
        x: Math.random() * width,
        y: Math.random() * height - height,
        size:
          type === 'heart'
            ? 12 + Math.random() * 10
            : 8 + Math.random() * 12,
        speedY: 0.6 + Math.random() * 1.4,
        speedX: (Math.random() - 0.5) * 0.8,
        angle: Math.random() * Math.PI * 2,
        angleSpeed: (Math.random() - 0.5) * 0.03,
        opacity: 0.3 + Math.random() * 0.5,
        type,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    };

    for (let i = 0; i < count; i++) {
      const p = createParticle();
      p.y = Math.random() * height;
      particles.push(p);
    }

    const drawPetal = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(
        p.size / 2,
        -p.size / 2,
        p.size,
        -p.size / 4,
        p.size,
        p.size / 2
      );
      ctx.bezierCurveTo(p.size / 2, p.size, -p.size / 4, p.size / 2, 0, 0);
      ctx.fill();
      ctx.restore();
    };

    const drawHeart = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle * 0.4);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      const s = p.size / 20;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-5 * s, -10 * s, -15 * s, -5 * s, -15 * s, 5 * s);
      ctx.bezierCurveTo(-15 * s, 15 * s, 0, 20 * s, 0, 25 * s);
      ctx.bezierCurveTo(0, 20 * s, 15 * s, 15 * s, 15 * s, 5 * s);
      ctx.bezierCurveTo(15 * s, -5 * s, 5 * s, -10 * s, 0, 0);
      ctx.fill();
      ctx.restore();
    };

    const drawSparkle = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(0, 0, p.size * 0.25, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += Math.sin(p.angle) * 0.8 + p.speedX;
        p.angle += p.angleSpeed;
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        if (p.type === 'petal') drawPetal(p);
        else if (p.type === 'heart') drawHeart(p);
        else drawSparkle(p);
      });
      animId = requestAnimationFrame(render);
    };

    render();
    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ opacity: 0.85 }}
    />
  );
}
