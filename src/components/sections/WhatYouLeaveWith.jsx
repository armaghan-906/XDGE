import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FloatingVideo } from '../primitives/FloatingVideo';
import { theme } from '../../theme';

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

function LeaveCard({ item, index, isActive, isMobile, onClick }) {
  const activeW = isMobile ? 85 : 50; // vw
  const inactiveW = isMobile ? 15 : 18; // vw

  return (
    <motion.div
      layout
      onClick={onClick}
      initial={false}
      animate={{
        width: `${isActive ? activeW : inactiveW}vw`,
        opacity: isActive ? 1 : 0.5,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="xg-glass-solid"
      style={{
        position: 'relative',
        height: 'clamp(400px, 60vh, 600px)',
        flexShrink: 0,
        borderRadius: 24,
        overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: isActive ? '0 24px 48px -12px rgba(0,0,0,0.5)' : 'none',
        border: `1px solid ${isActive ? theme.borderLight : theme.borderDark}`,
        background: `linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 100%)`
      }}
    >
      <motion.div layout style={{
        padding: 'clamp(20px, 3vw, 40px)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
        <motion.div layout style={{ color: theme.base, marginBottom: 24 }}>
          {item.icon}
        </motion.div>

        <motion.h3 layout style={{
          fontFamily: theme.displayTight,
          fontSize: 'clamp(18px, 2.2vw, 32px)',
          margin: '0 0 16px',
          lineHeight: 1.1,
          color: theme.base,
          fontWeight: 700,
          whiteSpace: isActive ? 'normal' : 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {item.title}
        </motion.h3>

        <AnimatePresence>
          {isActive && (
            <motion.p
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                fontSize: 'clamp(14px, 1.2vw, 18px)',
                color: theme.subtitle,
                lineHeight: 1.5,
                margin: 0,
                maxWidth: '85%'
              }}
            >
              {item.desc}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export function WhatYouLeaveWith() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' && activeIndex < items.length - 1) {
        setActiveIndex(prev => prev + 1);
        setIsExpanded(true);
      } else if (e.key === 'ArrowLeft' && activeIndex > 0) {
        setActiveIndex(prev => prev - 1);
        setIsExpanded(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex]);

  const handleDragEnd = (e, { offset, velocity }) => {
    const swipe = Math.abs(offset.x) > 50 || Math.abs(velocity.x) > 500;
    if (swipe) {
      if (offset.x > 0 && activeIndex > 0) {
        setActiveIndex(activeIndex - 1);
        setIsExpanded(true);
      } else if (offset.x < 0 && activeIndex < items.length - 1) {
        setActiveIndex(activeIndex + 1);
        setIsExpanded(true);
      }
    }
  };

  const activeW = isMobile ? 85 : 50;
  const inactiveW = isMobile ? 15 : 18;
  const gapW = isMobile ? 3 : 2;

  const getTrackX = (index, expanded) => {
    const currentActiveWidth = expanded ? activeW : inactiveW;
    const centerOfActive = (index * (inactiveW + gapW)) + (currentActiveWidth / 2);
    return `calc(50vw - ${centerOfActive}vw)`;
  };

  const handleCardClick = (i) => {
    if (activeIndex === i) {
      setIsExpanded(!isExpanded);
    } else {
      setActiveIndex(i);
      setIsExpanded(true);
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
        padding: 'clamp(80px, 10vw, 120px) 0',
      }}
    >
      <FloatingVideo 
        src="/assets/videos/thunder_1.mp4" 
        style={{ top: '30%', right: 20, opacity: 0.6, mixBlendMode: 'screen', transform: 'scale(1.3)' }} 
      />
      
      <div style={{ textAlign: 'center', marginBottom: 60, position: 'relative', zIndex: 10 }}>
        <h2 style={{
          fontFamily: theme.display,
          fontSize: 'clamp(36px, 5.5vw, 86px)',
          fontWeight: 900,
          margin: '0 auto',
          letterSpacing: '-0.02em',
          maxWidth: 800,
          lineHeight: 0.95,
          textTransform: 'uppercase'
        }}>
          <span className="hollow-text" style={{ display: 'block' }}>WHAT YOU</span>
          <span className="cyan-text" style={{ display: 'block' }}>LEAVE WITH</span>
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
          ref={containerRef}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
          animate={{ x: getTrackX(activeIndex, isExpanded) }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{
            display: 'flex',
            gap: `${gapW}vw`,
            width: 'max-content',
            cursor: 'grab',
            touchAction: 'none'
          }}
          whileTap={{ cursor: 'grabbing' }}
        >
          {items.map((item, i) => (
            <LeaveCard 
              key={i} 
              item={item} 
              index={i} 
              isActive={i === activeIndex && isExpanded} 
              isMobile={isMobile}
              onClick={() => handleCardClick(i)} 
            />
          ))}
        </motion.div>
      </div>

      {/* Navigation Arrows */}
      <div style={{
        display: 'flex', justifyContent: 'center', gap: 24, marginTop: 40, position: 'relative', zIndex: 10
      }}>
        <button
          onClick={() => {
            setActiveIndex(Math.max(0, activeIndex - 1));
            setIsExpanded(true);
          }}
          style={{
            background: 'none', border: `1px solid ${theme.borderDark}`,
            color: activeIndex > 0 ? theme.base : theme.subtitle,
            opacity: activeIndex > 0 ? 1 : 0.3,
            width: 48, height: 48, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: activeIndex > 0 ? 'pointer' : 'default',
            transition: 'all 0.2s',
          }}
          disabled={activeIndex === 0}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          onClick={() => {
            setActiveIndex(Math.min(items.length - 1, activeIndex + 1));
            setIsExpanded(true);
          }}
          style={{
            background: 'none', border: `1px solid ${theme.borderDark}`,
            color: activeIndex < items.length - 1 ? theme.base : theme.subtitle,
            opacity: activeIndex < items.length - 1 ? 1 : 0.3,
            width: 48, height: 48, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: activeIndex < items.length - 1 ? 'pointer' : 'default',
            transition: 'all 0.2s',
          }}
          disabled={activeIndex === items.length - 1}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </section>
  );
}

