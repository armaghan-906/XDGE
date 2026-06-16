import { motion } from 'framer-motion';
import { theme, fadeUp, stagger } from '../../theme';
import { Group } from '../primitives/Reveal';
import { SplitHeading } from '../primitives/SplitHeading';

// Performance Formula diagram keeps the original blue accent on purpose —
// it's the signature visual identity of this section, opted out of the
// site-wide grayscale palette.
const ACCENT = '#6e96c8';

const ringEase = [0.2, 0.7, 0.2, 1];

const iconProps = {
  width: 18, height: 18,
  viewBox: '0 0 24 24', fill: 'none',
  stroke: 'currentColor', strokeWidth: 1.5,
  strokeLinecap: 'round', strokeLinejoin: 'round',
};

const Icons = {
  Clapper: (
    <svg {...iconProps}>
      <rect x="3" y="9" width="18" height="12" rx="1.5" />
      <path d="M3 9l3-4M9 9l3-4M15 9l3-4M21 9l-3-4" />
    </svg>
  ),
  Gear: (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 4v2M12 18v2M4 12h2M18 12h2M6 6l1.5 1.5M16.5 16.5L18 18M6 18l1.5-1.5M16.5 7.5L18 6" />
    </svg>
  ),
  Mind: (
    <svg {...iconProps}>
      <path d="M9 18h6M10 21h4" />
      <path d="M12 3a7 7 0 00-4 12.7V18h8v-2.3A7 7 0 0012 3z" />
    </svg>
  ),
};

export function PerformanceDiagram({ maxWidth = 620, dark = true } = {}) {
  const fg = dark ? theme.base : theme.ink;
  const muted = dark ? theme.subtitle : theme.subtitle;
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      maxWidth,
      aspectRatio: '1/1',
      margin: '0 auto',
      borderRadius: '50%',
      overflow: 'hidden',
      background: 'radial-gradient(circle at center, rgba(110,150,200,0.16), rgba(255,255,255,0) 72%)',
    }}>
      {/* Outer ring */}
      <div
        style={{
          position: 'absolute', inset: 0,
          borderRadius: '50%',
          border: `1.5px solid ${ACCENT}`,
          boxShadow: `0 0 35px rgba(110,150,200,0.45), inset 0 0 35px rgba(110,150,200,0.22)`,
          opacity: 0.9,
        }}
      />
      {/* Middle ring */}
      <div
        className="xg-perf-ring-middle"
        style={{
          position: 'absolute', inset: '14%',
          borderRadius: '50%',
          border: `1.5px solid ${ACCENT}`,
          boxShadow: `0 0 28px rgba(110,150,200,0.5), inset 0 0 28px rgba(110,150,200,0.25)`,
        }}
      />
      {/* Inner ring */}
      <div
        className="xg-perf-ring-inner"
        style={{
          position: 'absolute', inset: '32%',
          borderRadius: '50%',
          border: `1.5px solid ${ACCENT}`,
          boxShadow: `0 0 22px rgba(110,150,200,0.55), inset 0 0 18px rgba(110,150,200,0.3)`,
        }}
      />

      {/* Labels (fade in after rings) */}
      <div
        style={{
          position: 'absolute',
          top: '4%', left: '28%', right: '28%',
          textAlign: 'center',
          color: fg,
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, justifyContent: 'center' }}>
          <span style={{ color: muted, display: 'inline-flex' }}>{Icons.Clapper}</span>
          <span style={{
            fontFamily: theme.display, fontWeight: 900,
            fontSize: 'clamp(14px, 1.8vw, 20px)',
            letterSpacing: '-0.005em',
            lineHeight: 1,
          }}>Actions</span>
        </div>
        <div className="xg-perf-tagline" style={{
          fontSize: 'clamp(10px, 1vw, 12px)',
          color: muted,
          marginTop: 6, lineHeight: 1.4,
        }}>
          Execution Power &amp; Impact
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          top: '20%', left: '22%', right: '22%',
          textAlign: 'center',
          color: fg,
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, justifyContent: 'center' }}>
          <span style={{ color: muted, display: 'inline-flex' }}>{Icons.Gear}</span>
          <span style={{
            fontFamily: theme.display, fontWeight: 900,
            fontSize: 'clamp(14px, 1.8vw, 20px)',
            letterSpacing: '-0.005em',
            lineHeight: 1,
          }}>Behaviors</span>
        </div>
        <div className="xg-perf-tagline" style={{
          fontSize: 'clamp(10px, 1vw, 12px)',
          color: muted,
          marginTop: 6, lineHeight: 1.4,
        }}>
          Performance Habits &amp; Skill Set
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          top: '50%', left: '32%', right: '32%',
          textAlign: 'center',
          color: fg,
          transform: 'translateY(-50%)'
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, justifyContent: 'center' }}>
          <span style={{ color: muted, display: 'inline-flex' }}>{Icons.Mind}</span>
          <span style={{
            fontFamily: theme.display, fontWeight: 900,
            fontSize: 'clamp(14px, 1.8vw, 20px)',
            letterSpacing: '-0.005em',
            lineHeight: 1,
          }}>Mindset</span>
        </div>
        <div className="xg-perf-tagline" style={{
          fontSize: 'clamp(10px, 1vw, 12px)',
          color: muted,
          marginTop: 6, lineHeight: 1.4,
        }}>
          Leadership Thinking<br />&amp; Winning Mindset
        </div>
      </div>
    </div>
  );
}

import { FloatingVideo } from '../primitives/FloatingVideo';

export function OurPerformanceFormula({ dark = true, diagramMaxWidth } = {}) {
  const bg = dark ? theme.dark : theme.base;
  const fg = dark ? theme.base : theme.ink;
  const muted = dark ? theme.subtitle : theme.subtitle;
  return (
    <section
      data-screen-label="Our Performance Formula"
      data-section-theme={dark ? 'dark' : 'light'}
      style={{
        background: bg,
        color: fg,
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(180px, 22vw, 320px) clamp(20px, 4vw, 40px)',
      }}
    >
      <FloatingVideo 
        src="/assets/videos/lightning_1.mp4" 
        style={{ top: '20%', left: '-5%', opacity: 0.6, mixBlendMode: 'screen', transform: 'scale(3)', transformOrigin: 'left center', zIndex: 0 }} 
      />
      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        
        {/* Massive full-width heading */}
        <motion.h2
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          style={{
            fontFamily: theme.display, fontWeight: 900,
            fontSize: 'clamp(60px, 11.3vw, 200px)',
            lineHeight: 0.9, letterSpacing: '-0.02em',
            marginBottom: 'clamp(40px, 6vw, 80px)',
            marginTop: 0, textTransform: 'uppercase',
            width: '100%',
            display: 'flex', flexDirection: 'column'
          }}
        >
          <motion.div variants={fadeUp} style={{ display: 'flex' }}>
            <span className="cyan-text" style={{ fontSize: '0.45em', paddingBottom: '0.1em', letterSpacing: '0.02em' }}>OUR PERFORMANCE</span>
          </motion.div>
          <motion.div variants={fadeUp} style={{ display: 'flex', marginTop: '-0.05em' }}>
            <span className="hollow-text">FORMULA</span>
          </motion.div>
        </motion.h2>

        <Group className="xg-2" style={{
          alignItems: 'center',
        }}>
          <div>
            <motion.div
              variants={fadeUp}
              style={{
                fontSize: 'clamp(20px, 2.5vw, 28px)',
                lineHeight: 1.35,
                color: fg, fontWeight: 700,
                letterSpacing: '-0.005em',
                paddingBottom: 'clamp(16px, 2vw, 24px)',
                marginBottom: 'clamp(24px, 3vw, 32px)',
                borderBottom: `1px solid ${theme.base}`,
              }}
            >
              Transforming leaders inside and out.
            </motion.div>
            <motion.div
              variants={fadeUp}
              style={{
                display: 'flex', flexDirection: 'column',
                gap: 'clamp(12px, 1.5vw, 16px)',
                fontSize: 'clamp(14px, 1.4vw, 15px)',
                lineHeight: 1.55, color: fg,
                maxWidth: 420,
              }}
            >
              <p style={{ margin: 0 }}>Most people focus on what they do.</p>
              <p style={{ margin: 0 }}>We focus on how you think, behave, and take action.</p>
              <p style={{ margin: 0 }}>Align these, and you perform at your next level.</p>
              <p style={{ margin: 0, color: muted }}>
                This is the XDGE framework embedded in every programme and session.
              </p>
            </motion.div>
          </div>

          <div style={{ width: '100%', position: 'relative' }}>
            <div style={{
              width: '100%',
            }}>
              <PerformanceDiagram dark={dark} maxWidth={diagramMaxWidth ?? 540} />
            </div>
          </div>
        </Group>
      </div>
    </section>
  );
}
