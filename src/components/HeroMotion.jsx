import { useEffect, useRef } from 'react';

/**
 * HeroMotion — themed generative motion-graphics background for the hero.
 *
 * Each background reads as a metaphor for XDGE leadership development:
 *   variant="ascend" — rising streams with glowing "leader" particles
 *                      (growth & leadership)
 *   variant="cohort" — a peer network with pulses travelling between nodes
 *                      (community & mentorship)
 *   variant="climb"  — a marker climbing a stepped path
 *                      (school → university → career journey)
 *
 * Reuses .xg-hero-ambient + .xg-hero-grain. Pauses the rAF loop when the
 * hero is offscreen (IntersectionObserver) and survives mount-time zero
 * layout via ResizeObserver — both critical for scroll perf and reliable
 * first paint inside Suspense/route transitions.
 *
 * Renders a single still frame under prefers-reduced-motion.
 */
export function HeroMotion({ variant = 'ascend' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    // Single source of truth for "this effect has been torn down". Every
    // scheduled callback (rAF / setTimeout / scroll handler / observer)
    // checks this before doing work, so post-unmount events become no-ops.
    let cancelled = false;
    let raf = 0;
    let W = 0;
    let H = 0;
    let dpr = 1;
    let streams = [];
    let nodes = [];
    let pulses = [];
    let ladder = null;
    const t0 = performance.now();
    let visible = true;
    // Hoisted so the IntersectionObserver can reset it when visibility flips
    // back to true (otherwise dt would jump to its 4-frame clamp on resume).
    let lastDraw = 0;

    /* ── ASCEND ── rising streams with glowing leaders */
    const mkStream = () => ({
      x: Math.random() * W,
      y: H + Math.random() * H * 0.5,
      sp: 0.6 + Math.random() * 1.9,
      ph: Math.random() * 6.28,
      sway: 0.4 + Math.random() * 0.9,
      drift: (Math.random() - 0.5) * 0.3,
      a: 0.06 + Math.random() * 0.16,
      w: 0.6 + Math.random() * 1.0,
      lead: Math.random() < 0.06,
    });
    const seedAscend = () => {
      if (W <= 0 || H <= 0) return;
      streams = Array.from({ length: Math.min(60, Math.floor(W / 20)) }, mkStream);
    };
    const drawAscend = (_t, dt) => {
      ctx.fillStyle = 'rgba(0,0,0,0.12)';
      ctx.fillRect(0, 0, W, H);
      for (let i = 0; i < streams.length; i++) {
        const p = streams[i];
        const px = p.x;
        const py = p.y;
        // Time-based motion — speed-per-second stays constant regardless of fps.
        p.y -= p.sp * dt;
        p.x += (Math.sin(p.y * 0.01 + p.ph) * p.sway * 0.4 + p.drift) * dt;
        ctx.strokeStyle = `rgba(255,255,255,${p.lead ? p.a + 0.2 : p.a})`;
        ctx.lineWidth = p.lead ? p.w * 1.6 : p.w;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
        if (p.lead) {
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 14);
          g.addColorStop(0, 'rgba(255,255,255,0.7)');
          g.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 14, 0, 6.3);
          ctx.fill();
        }
        if (p.y < -30) {
          streams[i] = mkStream();
          streams[i].y = H + 10;
        }
      }
    };

    /* ── COHORT ── peer network with travelling pulses */
    const seedCohort = () => {
      if (W <= 0 || H <= 0) return;
      nodes = Array.from({ length: Math.min(28, Math.floor(W / 56)) }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
      }));
      pulses = [];
    };
    const drawCohort = (_t, dt) => {
      ctx.clearRect(0, 0, W, H);
      const LINK = 150;
      for (const p of nodes) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.hypot(dx, dy);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(255,255,255,${0.12 * (1 - d / LINK)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      for (const p of nodes) {
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.7, 0, 6.3);
        ctx.fill();
      }
      if (pulses.length < 9 && Math.random() < 0.05) {
        const a = nodes[(Math.random() * nodes.length) | 0];
        const b = nodes[(Math.random() * nodes.length) | 0];
        if (a && b && a !== b) pulses.push({ a, b, p: 0 });
      }
      for (let k = pulses.length - 1; k >= 0; k--) {
        const pu = pulses[k];
        pu.p += 0.018 * dt;
        const x = pu.a.x + (pu.b.x - pu.a.x) * pu.p;
        const y = pu.a.y + (pu.b.y - pu.a.y) * pu.p;
        ctx.fillStyle = 'rgba(255,255,255,0.95)';
        ctx.beginPath();
        ctx.arc(x, y, 2.2, 0, 6.3);
        ctx.fill();
        if (pu.p >= 1) pulses.splice(k, 1);
      }
    };

    /* ── CLIMB ── marker climbing a stepped path */
    const buildLadder = () => {
      if (W <= 0 || H <= 0) { ladder = null; return; }
      const N = 6;
      const x0 = W * 0.1;
      const x1 = W * 0.9;
      const yb = H * 0.84;
      const yt = H * 0.18;
      const pts = [[x0, yb]];
      let prevY = yb;
      for (let i = 1; i <= N; i++) {
        const x = x0 + (x1 - x0) * (i / N);
        const y = yb + (yt - yb) * (i / N);
        pts.push([x, prevY]);
        pts.push([x, y]);
        prevY = y;
      }
      const seg = [];
      let total = 0;
      for (let i = 1; i < pts.length; i++) {
        const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
        seg.push(d);
        total += d;
      }
      ladder = { pts, seg, total };
    };
    const ladderPoint = (dist) => {
      let d = dist;
      for (let i = 0; i < ladder.seg.length; i++) {
        if (d <= ladder.seg[i]) {
          const f = d / ladder.seg[i];
          const a = ladder.pts[i];
          const b = ladder.pts[i + 1];
          return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f];
        }
        d -= ladder.seg[i];
      }
      return ladder.pts[ladder.pts.length - 1];
    };
    const drawLadder = (t) => {
      if (!ladder) return;
      ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = 'rgba(255,255,255,0.12)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ladder.pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])));
      ctx.stroke();
      const prog = (t * 0.00007) % 1;
      const dist = prog * ladder.total;
      ctx.strokeStyle = 'rgba(255,255,255,0.55)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(ladder.pts[0][0], ladder.pts[0][1]);
      let acc = 0;
      for (let i = 1; i < ladder.pts.length; i++) {
        const segLen = ladder.seg[i - 1];
        if (acc + segLen < dist) {
          ctx.lineTo(ladder.pts[i][0], ladder.pts[i][1]);
          acc += segLen;
        } else {
          const f = (dist - acc) / segLen;
          const a = ladder.pts[i - 1];
          const b = ladder.pts[i];
          ctx.lineTo(a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f);
          break;
        }
      }
      ctx.stroke();
      ladder.pts.forEach((p, i) => {
        if (i % 2 === 0) {
          ctx.fillStyle = 'rgba(255,255,255,0.28)';
          ctx.beginPath();
          ctx.arc(p[0], p[1], 3, 0, 6.3);
          ctx.fill();
        }
      });
      const m = ladderPoint(dist);
      const g = ctx.createRadialGradient(m[0], m[1], 0, m[0], m[1], 28);
      g.addColorStop(0, 'rgba(255,255,255,0.9)');
      g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(m[0], m[1], 28, 0, 6.3);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(m[0], m[1], 4, 0, 6.3);
      ctx.fill();
    };

    const render = (t, dt) => {
      if (W <= 0 || H <= 0) return;
      if (variant === 'cohort') drawCohort(t, dt);
      else if (variant === 'climb') drawLadder(t);
      else drawAscend(t, dt);
    };

    const reseedForVariant = () => {
      if (variant === 'cohort') seedCohort();
      else if (variant === 'climb') buildLadder();
      else seedAscend();
    };

    const resize = () => {
      // Background canvas — 0.5× backbuffer. CSS scales it back up with
      // bilinear filtering, which on an ambient particle background reads
      // as soft focus rather than blur. Cuts per-frame pixel work to 25%
      // versus dpr=1, and to ~6% versus retina dpr=2 — the difference
      // between "main thread is fine" and "main thread is fighting scroll".
      dpr = 0.5;
      const r = parent.getBoundingClientRect();
      const newW = r.width;
      const newH = r.height;
      if (newW === W && newH === H) return;
      W = newW;
      H = newH;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      reseedForVariant();
      if (variant === 'ascend' && W > 0 && H > 0) {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, W, H);
      }
    };

    const ro = new ResizeObserver(() => { if (!cancelled) resize(); });
    ro.observe(parent);
    resize();

    const io = new IntersectionObserver(
      ([entry]) => {
        if (cancelled) return;
        const wasVisible = visible;
        visible = entry.isIntersecting;
        // When the canvas comes back into view after being paused, reset
        // lastDraw so the next frame uses dt≈1 instead of a clamped catch-up
        // jump (which would advance particles 4 frames at once).
        if (!wasVisible && visible) lastDraw = 0;
      },
      { root: null, threshold: 0 }
    );
    io.observe(parent);

    // Draw one static initial frame immediately so the hero isn't blank
    // during the startup-delay window.
    if (W > 0 && H > 0) render(0, 1);

    // Detect active scroll. While scrolling, the main thread is already busy
    // with paint/composite for the scrolling page — drop the canvas to 15fps
    // so it stops competing. Back to 30fps after ~100ms of no scroll events.
    let scrolling = false;
    let scrollTimer = 0;
    const onScroll = () => {
      if (cancelled) return;
      scrolling = true;
      clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(() => { scrolling = false; }, 100);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Defer the rAF loop until after the page-load / route-change burst.
    // During that window the main thread is busy with React mount, framer-motion
    // entrance animations, and (on nav) the curtain wipe — competing with the
    // canvas was the root of the perceived jerk. ~800ms is past every entrance.
    let startupDelay = 0;
    if (reduce) {
      render(0, 1);
    } else {
      startupDelay = window.setTimeout(() => {
        if (cancelled) return;
        // Canvas frame intervals: 30fps when idle, 15fps while scrolling.
        // Time-based motion (dt) keeps visual speed identical at either rate.
        const FRAME_IDLE = 1000 / 30;
        const FRAME_SCROLL = 1000 / 15;
        const loop = (now) => {
          if (cancelled) return;
          const interval = scrolling ? FRAME_SCROLL : FRAME_IDLE;
          if (visible && (now - lastDraw) >= interval) {
            const dt = lastDraw === 0 ? 1 : Math.min(4, (now - lastDraw) / 16.67);
            render(now - t0, dt);
            lastDraw = now;
          }
          raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
      }, 800);
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      clearTimeout(startupDelay);
      clearTimeout(scrollTimer);
      window.removeEventListener('scroll', onScroll);
      ro.disconnect();
      io.disconnect();
    };
  }, [variant]);

  return (
    <div className="xg-hero-ambient" aria-hidden="true">
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block',
          // Promote to its own GPU compositor layer. Page scroll repaints
          // then don't touch the canvas — the two layers composite together
          // on the GPU and stay independent. Biggest win for scroll smoothness.
          transform: 'translateZ(0)',
          willChange: 'transform',
        }}
      />
      <div className="xg-hero-grain" />
    </div>
  );
}
