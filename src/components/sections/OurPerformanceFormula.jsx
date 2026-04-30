import { motion } from 'framer-motion';
import { theme, fadeUp } from '../../theme';
import { Group } from '../primitives/Reveal';
import { SplitHeading } from '../primitives/SplitHeading';

const ACCENT = theme.accent;

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

function PerformanceDiagram() {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      maxWidth: 480,
      aspectRatio: '1/1',
      margin: '0 auto',
      background: 'radial-gradient(circle at center, rgba(110,150,200,0.16), rgba(236,237,232,0) 72%)',
    }}>
      {/* Outer ring */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2, ease: ringEase, delay: 0.05 }}
        style={{
          position: 'absolute', inset: 0,
          borderRadius: '50%',
          border: `1.5px solid ${ACCENT}`,
          boxShadow: `0 0 35px rgba(110,150,200,0.45), inset 0 0 35px rgba(110,150,200,0.22)`,
          opacity: 0.9,
        }}
      />
      {/* Middle ring */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2, ease: ringEase, delay: 0.2 }}
        style={{
          position: 'absolute', inset: '17%',
          borderRadius: '50%',
          border: `1.5px solid ${ACCENT}`,
          boxShadow: `0 0 28px rgba(110,150,200,0.5), inset 0 0 28px rgba(110,150,200,0.25)`,
        }}
      />
      {/* Inner ring */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2, ease: ringEase, delay: 0.35 }}
        style={{
          position: 'absolute', inset: '34%',
          borderRadius: '50%',
          border: `1.5px solid ${ACCENT}`,
          boxShadow: `0 0 22px rgba(110,150,200,0.55), inset 0 0 18px rgba(110,150,200,0.3)`,
        }}
      />

      {/* Labels (fade in after rings) */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: ringEase, delay: 0.7 }}
        style={{
          position: 'absolute',
          top: '3%', left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          color: theme.ink,
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
          <span style={{ color: '#7d7e7c' }}>{Icons.Clapper}</span>
          <span style={{ fontSize: 'clamp(13px, 1.5vw, 17px)', fontWeight: 600, letterSpacing: '0.01em' }}>Actions</span>
        </div>
        <div style={{ fontSize: 'clamp(10px, 1.1vw, 12px)', color: '#7d7e7c', marginTop: 2 }}>
          Execution Power &amp; Impact
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: ringEase, delay: 0.85 }}
        style={{
          position: 'absolute',
          top: '20%', left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          color: theme.ink,
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
          <span style={{ color: '#7d7e7c' }}>{Icons.Gear}</span>
          <span style={{ fontSize: 'clamp(12px, 1.3vw, 15px)', fontWeight: 600, letterSpacing: '0.01em' }}>Behaviors</span>
        </div>
        <div style={{ fontSize: 'clamp(9px, 1vw, 11px)', color: '#7d7e7c', marginTop: 2 }}>
          Performance Habits &amp; Skill Set
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: ringEase, delay: 1.0 }}
        style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: theme.ink,
          width: '40%',
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, justifyContent: 'center', marginBottom: 6 }}>
          <span style={{ color: '#7d7e7c' }}>{Icons.Mind}</span>
        </div>
        <div style={{
          fontFamily: theme.display, fontWeight: 900,
          fontSize: 'clamp(18px, 2.4vw, 28px)',
          letterSpacing: '-0.005em',
          color: theme.ink,
          lineHeight: 1,
        }}>Mindset</div>
        <div style={{
          fontSize: 'clamp(10px, 1.1vw, 12px)',
          color: '#7d7e7c',
          marginTop: 6, lineHeight: 1.4,
        }}>
          Leadership Thinking<br />&amp; Winning Mindset
        </div>
      </motion.div>
    </div>
  );
}

export function OurPerformanceFormula() {
  return (
    <section
      data-screen-label="Our Performance Formula"
      data-section-theme="light"
      style={{
        background: theme.base,
        color: theme.ink,
        padding: 'clamp(64px, 10vw, 120px) clamp(20px, 4vw, 40px)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <Group className="xg-2" style={{ alignItems: 'center', gap: 'clamp(40px, 6vw, 80px)' }}>
          <div>
            <SplitHeading
              lines={['OUR PERFORMANCE', 'FORMULA']}
              style={{
                fontFamily: theme.display, fontWeight: 900,
                fontSize: 'clamp(40px, 8vw, 120px)',
                lineHeight: 0.95, letterSpacing: '-0.02em',
                marginBottom: 'clamp(20px, 3vw, 28px)',
              }}
            />
            <motion.div
              variants={fadeUp}
              style={{
                fontSize: 'clamp(20px, 2.4vw, 30px)',
                lineHeight: 1.35,
                color: theme.ink, fontWeight: 500,
                letterSpacing: '-0.005em',
                marginBottom: 'clamp(28px, 4vw, 40px)',
              }}
            >
              Transforming leaders inside and out.
            </motion.div>
            <motion.div
              variants={fadeUp}
              style={{
                display: 'flex', flexDirection: 'column',
                gap: 'clamp(14px, 1.8vw, 20px)',
                fontSize: 'clamp(15px, 1.6vw, 17px)',
                lineHeight: 1.55, color: theme.ink,
                maxWidth: 520,
              }}
            >
              <p style={{ margin: 0 }}>Most people focus on what they do.</p>
              <p style={{ margin: 0 }}>We focus on how you think, behave, and take action.</p>
              <p style={{ margin: 0 }}>Align these, and you perform at your next level.</p>
              <p style={{ margin: 0, color: '#7d7e7c' }}>
                This is the XDGE framework embedded in every programme and session.
              </p>
            </motion.div>
          </div>

          <motion.div variants={fadeUp}>
            <PerformanceDiagram />
          </motion.div>
        </Group>
      </div>
    </section>
  );
}
