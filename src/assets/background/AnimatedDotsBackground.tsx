import React, { useLayoutEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface AnimatedDotsProps {
  density?: number;
  speed?: number;
  dotColor?: string;
  bgColor?: string;
  dotRadius?: number;
}

const AnimatedDotsBackground: React.FC<AnimatedDotsProps> = ({
  density = 100,
  speed = 0.5,
  dotColor = 'white',
  bgColor = 'black',
  dotRadius = 1.5,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const pointsRef = useRef<Point[]>([]);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let resizeTimeout: NodeJS.Timeout;

    // Инициализация точек
    const initPoints = () => {
      const newPoints: Point[] = [];
      for (let i = 0; i < density; i++) {
        newPoints.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
        });
      }
      pointsRef.current = newPoints;
    };


    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);

      for (const point of pointsRef.current) {
        point.x += point.vx;
        point.y += point.vy;

        if (point.x < 0) point.x = width;
        if (point.x > width) point.x = 0;
        if (point.y < 0) point.y = height;
        if (point.y > height) point.y = 0;

        ctx.beginPath();
        ctx.arc(point.x, point.y, dotRadius, 0, Math.PI * 2);
        ctx.fillStyle = dotColor;
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initPoints();
    };

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resizeCanvas();
      }, 100);
    };

    resizeCanvas();
    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [density, speed, dotColor, bgColor, dotRadius]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
};

export default AnimatedDotsBackground;