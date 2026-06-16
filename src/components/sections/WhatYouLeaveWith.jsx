import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FloatingVideo } from '../primitives/FloatingVideo';
import { theme } from '../../theme';

// Carousel 2 imagery — every image from "Images for Carousel 2" (optimized WebP),
// used once. Fixed-size square cards, image only (no text), no expand-on-active.
const items = [
  { img: '/assets/leave-1.webp' },
  { img: '/assets/leave-2.webp' },
  { img: '/assets/leave-3.webp' },
  { img: '/assets/leave-4.webp' },
  { img: '/assets/leave-5.webp' },
  { img: '/assets/leave-7.webp' },
  { img: '/assets/WhatsApp Image 2026-06-16 at 1.04.14 PM.jpeg', cover: true },
];

function LeaveCard({ img, cover, widthVw }) {
  return (
    <div
      className="xg-glass-solid"
      style={{
        position: 'relative',
        width: `${widthVw}vw`,
        aspectRatio: '1 / 1',
        flexShrink: 0,
        borderRadius: 24,
        overflow: 'hidden',
        border: `1px solid ${theme.borderDark}`,
        // full square image, contained (never cropped/stretched); dark letterbox fill
        background: `#0a0a0a url("${img}") center/${cover ? 'cover' : 'contain'} no-repeat`,
      }}
    />
  );
}

export function WhatYouLeaveWith() {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const cardW = isMobile ? 78 : 28; // vw — fixed card width (cards never expand)
  const gapW = isMobile ? 4 : 2.5;  // vw

  // translate the track so card[i] is centered in the viewport
  const getTrackX = (i) => `calc(50vw - ${i * (cardW + gapW) + cardW / 2}vw)`;

  const go = (dir) =>
    setIndex((i) => Math.max(0, Math.min(items.length - 1, i + dir)));

  const handleDragEnd = (e, { offset, velocity }) => {
    if (Math.abs(offset.x) > 50 || Math.abs(velocity.x) > 500) {
      go(offset.x < 0 ? 1 : -1);
    }
  };

  return (
    <section
      data-screen-label="What You Leave With"
      data-section-theme="dark"
      style={{
        background: theme.dark,
        color: theme.base,
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(160px, 18vw, 240px) 0',
      }}
    >
      <FloatingVideo
        src="/assets/videos/thunder_1.mp4"
        style={{
          top: '30%', right: 20,
          opacity: 0.35,
          width: 'clamp(400px, 80vw, 1000px)'
        }}
      />

      <div style={{ textAlign: 'center', marginBottom: 60, position: 'relative', zIndex: 10, padding: '0 clamp(20px, 4vw, 40px)' }}>
        <h2 style={{
          fontFamily: theme.display,
          fontSize: 'clamp(60px, 11.3vw, 200px)',
          fontWeight: 900,
          margin: 0,
          letterSpacing: '-0.02em',
          lineHeight: 0.95,
          textTransform: 'uppercase',
        }}>
          {/* two-liner: each phrase stays on one line */}
          <span className="hollow-text" style={{ display: 'block', whiteSpace: 'nowrap' }}>WHAT YOU</span>
          <span className="cyan-text" style={{ display: 'block', whiteSpace: 'nowrap' }}>LEAVE WITH</span>
        </h2>
        <p style={{
          color: theme.subtitle,
          marginTop: 16,
          fontSize: 'clamp(16px, 1.8vw, 24px)',
          fontWeight: 500,
        }}>
          Proof of your capability. Ready for selection.
        </p>
      </div>

      <div style={{ width: '100%', overflow: 'hidden', position: 'relative', padding: '20px 0' }}>
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
          animate={{ x: getTrackX(index) }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{
            display: 'flex',
            gap: `${gapW}vw`,
            width: 'max-content',
            cursor: 'grab',
            touchAction: 'pan-y',
          }}
          whileTap={{ cursor: 'grabbing' }}
        >
          {items.map((it, i) => (
            <LeaveCard key={i} img={it.img} cover={it.cover} widthVw={cardW} />
          ))}
        </motion.div>
      </div>

      {/* Navigation arrows — move one card at a time (cards stay fixed) */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 40, position: 'relative', zIndex: 10 }}>
        <button
          onClick={() => go(-1)}
          disabled={index === 0}
          aria-label="Previous"
          style={{
            background: 'none', border: `1px solid ${theme.borderDark}`,
            color: theme.base, opacity: index > 0 ? 1 : 0.3,
            width: 48, height: 48, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: index > 0 ? 'pointer' : 'default', transition: 'all 0.2s',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <button
          onClick={() => go(1)}
          disabled={index === items.length - 1}
          aria-label="Next"
          style={{
            background: 'none', border: `1px solid ${theme.borderDark}`,
            color: theme.base, opacity: index < items.length - 1 ? 1 : 0.3,
            width: 48, height: 48, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: index < items.length - 1 ? 'pointer' : 'default', transition: 'all 0.2s',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
        </button>
      </div>
    </section>
  );
}
