import { useEffect, useRef } from 'react';

/**
 * KineticField — live particle constellation rendered on <canvas>.
 *
 * Layers behind hero content via the existing .xg-hero-ambient class.
 * Respects prefers-reduced-motion. Uses ResizeObserver so it survives
 * mount-time layout=0 inside Suspense / route transitions.
 */
export function KineticField({ spacing = 24, link = 130, glow = true }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    const parent = canvas.parentElement;
    const ctx = canvas.getContext('2d');
    let raf = 0;
    let W = 0;
    let H = 0;
    let dpr = 1;
    let pts = [];

    const seed = () => {
      if (W <= 0 || H <= 0) return;
      const count = Math.min(90, Math.max(24, Math.floor(W / spacing)));
      pts = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.8 + 0.8,
      }));
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = parent.getBoundingClientRect();
      const newW = r.width;
      const newH = r.height;
      if (newW === W && newH === H) return;
      const hadSize = W > 0 && H > 0;
      W = newW;
      H = newH;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!hadSize) seed();
    };

    let visible = true;
    const io = new IntersectionObserver(
      ([entry]) => { visible = entry.isIntersecting; },
      { root: null, threshold: 0 }
    );
    io.observe(parent);

    const frame = () => {
      if (visible && W > 0 && H > 0) {
        ctx.clearRect(0, 0, W, H);

        if (glow) {
          const t = Date.now() / 1000;
          const gx = W * (0.5 + Math.sin(t * 0.12) * 0.28);
          const gy = H * (0.5 + Math.cos(t * 0.1) * 0.28);
          const g = ctx.createRadialGradient(gx, gy, 0, gx, gy, Math.max(W, H) * 0.6);
          g.addColorStop(0, 'rgba(255,255,255,0.14)');
          g.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.fillStyle = g;
          ctx.fillRect(0, 0, W, H);
        }

        for (let i = 0; i < pts.length; i++) {
          const p = pts[i];
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > W) p.vx *= -1;
          if (p.y < 0 || p.y > H) p.vy *= -1;
          for (let j = i + 1; j < pts.length; j++) {
            const q = pts[j];
            const dx = p.x - q.x;
            const dy = p.y - q.y;
            const d = Math.hypot(dx, dy);
            if (d < link) {
              ctx.strokeStyle = `rgba(255,255,255,${0.18 * (1 - d / link)})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(q.x, q.y);
              ctx.stroke();
            }
          }
        }

        for (const p of pts) {
          ctx.fillStyle = 'rgba(255,255,255,0.85)';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(frame);
    };

    // ResizeObserver handles the layout-not-yet-settled-at-mount case
    // and any later size changes (route transitions, viewport rotates).
    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    resize();
    frame();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [spacing, link, glow]);

  return (
    <div className="xg-hero-ambient" aria-hidden="true">
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
      />
      <div className="xg-hero-grain" />
    </div>
  );
}
