import { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FloatingVideo } from '../primitives/FloatingVideo';
import { theme } from '../../theme';
import { SplitHeading } from '../primitives/SplitHeading';

const iconProps = {
  width: 32, height: 32,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

const Icons = {
  Portfolio: (
    <svg {...iconProps}>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
      <path d="M2 13h20" />
    </svg>
  ),
  Video: (
    <svg {...iconProps}>
      <rect x="2" y="7" width="13" height="10" rx="1.5" />
      <path d="M15 10l6-3v10l-6-3z" />
    </svg>
  ),
  Document: (
    <svg {...iconProps}>
      <path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9z" />
      <path d="M14 3v6h6" />
      <path d="M8 13h8M8 17h6" />
    </svg>
  ),
  Award: (
    <svg {...iconProps}>
      <circle cx="12" cy="8" r="6" />
      <path d="M8.21 13.89L7 22l5-3 5 3-1.21-8.13" />
    </svg>
  ),
  Letter: (
    <svg {...iconProps}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  ),
  Clipboard: (
    <svg {...iconProps}>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <rect x="9" y="2" width="6" height="4" rx="1" />
      <path d="M9 12l2 2 4-4" />
      <path d="M9 17h6" />
    </svg>
  ),
  Chart: (
    <svg {...iconProps}>
      <path d="M3 21h18" />
      <rect x="6" y="13" width="3" height="8" />
      <rect x="11" y="9" width="3" height="12" />
      <rect x="16" y="5" width="3" height="16" />
      <path d="M17 8l2-3 2 3" />
    </svg>
  ),
};

const items = [
  { icon: Icons.Portfolio, title: 'Leadership Portfolio', desc: 'Evidence of capability and readiness for your next level.' },
  { icon: Icons.Video, title: 'Recorded Capstone Presentation', desc: 'Proof of how you think, decide, and deliver under pressure.' },
  { icon: Icons.Document, title: 'Skills Transcript', desc: 'Verified record of your competencies and development.' },
  { icon: Icons.Award, title: 'Certificate of Completion', desc: 'Formal recognition of performance and progression.' },
  { icon: Icons.Letter, title: 'Letter of Recommendation', desc: 'Professional endorsement of your capability and potential.' },
  { icon: Icons.Clipboard, title: '90-Day Action Plan', desc: 'Clear execution plan for your next stage.' },
  { icon: Icons.Chart, title: 'Next-Level Practice', desc: 'Preparation for high-stakes interviews and selection.' },
];

function LeaveCard({ item, index, progress, total }) {
  const diff = useTransform(progress, (p) => index - p);
  const radius = 1200; 
  const anglePerItem = 14; 
  
  const angle = useTransform(diff, (d) => d * anglePerItem);
  const x = useTransform(angle, (a) => radius * Math.sin((a * Math.PI) / 180));
  const y = useTransform(angle, (a) => radius - radius * Math.cos((a * Math.PI) / 180));
  const rotate = angle;
  
  const zIndex = useTransform(diff, (d) => total - Math.abs(Math.round(d)));
  const opacity = useTransform(diff, [-4, -3, 0, 3, 4], [0, 0.4, 1, 0.4, 0]);
  const scale = useTransform(diff, [-3, 0, 3], [0.8, 1, 0.8]);

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 'clamp(280px, 30vw, 380px)',
        aspectRatio: '3/4',
        originX: 0.5,
        originY: 0.5,
        x: useTransform(x, (val) => `calc(-50% + ${val}px)`),
        y: useTransform(y, (val) => `calc(-50% + ${val}px)`),
        rotate,
        zIndex,
        opacity,
        scale,
      }}
    >
      <div className="xg-glass-solid" style={{
        width: '100%', height: '100%',
        position: 'relative',
        borderRadius: 16,
        padding: 'clamp(24px, 3vw, 40px)',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center', textAlign: 'center',
        boxShadow: '0 24px 48px -12px rgba(0,0,0,0.4)',
        border: `1px solid ${theme.borderDark}`,
      }}>
        <div style={{ color: theme.base, marginBottom: 32, transform: 'scale(1.5)' }}>
          {item.icon}
        </div>
        <h3 style={{
          fontFamily: theme.displayTight,
          fontSize: 'clamp(20px, 2.5vw, 28px)',
          margin: '0 0 16px',
          lineHeight: 1.1,
          color: theme.base,
          fontWeight: 700,
        }}>
          {item.title}
        </h3>
        <p style={{
          fontSize: 'clamp(14px, 1.5vw, 16px)',
          color: theme.subtitle,
          lineHeight: 1.5,
          margin: 0
        }}>
          {item.desc}
        </p>
      </div>
    </motion.div>
  );
}

export function WhatYouLeaveWith() {
  const containerRef = useRef(null);
  
  const progressRaw = useMotionValue(0);
  const progress = useSpring(progressRaw, { stiffness: 60, damping: 15, mass: 1 });

  const handleDrag = (event, info) => {
    const delta = -info.delta.x / 100;
    let next = progressRaw.get() + delta;
    next = Math.max(0, Math.min(items.length - 1, next));
    progressRaw.set(next);
  };

  const handleWheel = (e) => {
    const isVertical = Math.abs(e.deltaY) > Math.abs(e.deltaX);
    const delta = isVertical ? e.deltaY / 100 : e.deltaX / 100;
    const current = progressRaw.get();
    
    if (current <= 0 && delta < 0) return;
    if (current >= items.length - 1 && delta > 0) return;

    e.preventDefault();
    let next = current + delta;
    next = Math.max(0, Math.min(items.length - 1, next));
    progressRaw.set(next);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <section
      data-screen-label="What You Leave With"
      data-section-theme="dark"
      style={{
        background: theme.dark,
        color: theme.base,
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(80px, 10vw, 120px) 0',
      }}
    >
      <FloatingVideo 
        src="/assets/videos/thunder_1.mp4" 
        style={{ top: '30%', right: 20, opacity: 0.6, mixBlendMode: 'screen', transform: 'scale(1.3)' }} 
      />
      
      <div style={{ textAlign: 'center', marginBottom: 40, position: 'relative', zIndex: 10 }}>
        <h2 style={{
          fontFamily: theme.display,
          fontSize: 'clamp(36px, 5.5vw, 86px)',
          fontWeight: 900,
          color: theme.base,
          margin: '0 auto',
          letterSpacing: '-0.02em',
          maxWidth: 800,
          lineHeight: 0.95,
        }}>
          WHAT YOU<br/>LEAVE WITH
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

      <motion.div
        ref={containerRef}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0}
        onDrag={handleDrag}
        style={{
          position: 'relative',
          height: 'clamp(450px, 65vh, 700px)',
          width: '100%',
          cursor: 'grab',
          touchAction: 'none'
        }}
        whileTap={{ cursor: 'grabbing' }}
      >
        {items.map((item, i) => (
          <LeaveCard key={i} item={item} index={i} progress={progress} total={items.length} />
        ))}
      </motion.div>
    </section>
  );
}
