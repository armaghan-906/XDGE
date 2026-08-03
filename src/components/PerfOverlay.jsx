import { useEffect, useRef, useState } from 'react';

/**
 * PerfOverlay — a live frame-rate readout, shown ONLY when the URL contains `?perf`.
 *
 * This exists because the reported stutter has never reproduced in any harness I can
 * run: headless Chrome at 390px on a desktop CPU reports 0-1 dropped frames on every
 * page, at both DPR 1 and 3, scrolling and idle. That is not evidence the site is
 * smooth on a real phone — it is evidence my measurement cannot see a real phone.
 *
 * So the measurement moves to the device. Open any page with `?perf` on the phone
 * that stutters, scroll normally, and read the numbers off the screen. No console, no
 * pasting.
 *
 * WHAT THE NUMBERS MEAN
 *   fps      frames actually delivered in the last second. 60 is smooth, 30 is half.
 *   worst    the longest single frame seen. 17ms is one frame; 100ms is six missed.
 *   drop%    share of frames that took longer than 17ms across the whole session.
 *
 * If drop% stays near 0 while it still feels wrong, the frames are fine and what is
 * being felt is content timing rather than rendering — a different fix. If drop%
 * climbs into the tens, it is real and the worst-frame figure says how bad.
 *
 * Gated on the query string, so it is inert for every normal visitor and there is no
 * cost to leaving it in.
 */
export function PerfOverlay() {
  const [on] = useState(
    () => typeof window !== 'undefined' && window.location.search.includes('perf')
  );
  const [stats, setStats] = useState({ fps: 0, worst: 0, drop: 0, frames: 0 });
  const box = useRef({ worst: 0, over: 0, total: 0, secFrames: 0, secStart: 0, last: 0 });

  useEffect(() => {
    if (!on) return;
    let raf = 0;

    const tick = (t) => {
      const b = box.current;
      if (!b.secStart) b.secStart = t;
      if (b.last) {
        const dt = t - b.last;
        b.total += 1;
        if (dt > 17) b.over += 1;
        if (dt > b.worst) b.worst = dt;
      }
      b.last = t;
      b.secFrames += 1;

      if (t - b.secStart >= 1000) {
        setStats({
          fps: Math.round((b.secFrames * 1000) / (t - b.secStart)),
          worst: Math.round(b.worst),
          drop: b.total ? Math.round((b.over / b.total) * 100) : 0,
          frames: b.total,
        });
        b.secFrames = 0;
        b.secStart = t;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [on]);

  if (!on) return null;

  const bad = stats.drop >= 10;

  return (
    <div
      style={{
        position: 'fixed',
        top: 8,
        left: 8,
        zIndex: 99999,
        padding: '10px 12px',
        borderRadius: 10,
        background: bad ? 'rgba(150,20,20,0.92)' : 'rgba(0,0,0,0.82)',
        color: '#fff',
        font: '600 13px/1.45 ui-monospace, SFMono-Regular, Menlo, monospace',
        pointerEvents: 'none',
        letterSpacing: '0.02em',
      }}
    >
      <div style={{ fontSize: 22, lineHeight: 1.1 }}>{stats.fps} fps</div>
      <div>worst {stats.worst}ms</div>
      <div>dropped {stats.drop}%</div>
      <div style={{ opacity: 0.6 }}>{stats.frames} frames</div>
    </div>
  );
}
