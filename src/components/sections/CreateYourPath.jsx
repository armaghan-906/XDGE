import { motion } from 'framer-motion';
import { theme, fadeUp, stagger } from '../../theme';
import { FloatingVideo } from '../primitives/FloatingVideo';

/**
 * CreateYourPath — centered banner heading with a lightning video behind it.
 * CREATE YOUR OWN (outline) / PATH & LEAVE (white) + A TRAIL (gradient).
 */
export function CreateYourPath() {
  return (
    <section
      data-screen-label="Create Your Own Path"
      data-section-theme="dark"
      style={{
        background: theme.dark,
        color: theme.base,
        position: 'relative',
        overflow: 'hidden',
        // generous vertical space above and below the heading
        padding: 'clamp(120px, 18vw, 240px) clamp(20px, 4vw, 40px)',
      }}
    >
      <FloatingVideo
        src="/assets/videos/lightning_1.mp4"
        style={{
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'clamp(800px, 120vw, 2400px)',
          opacity: 0.4, zIndex: 0,
        }}
      />
      <h2
        style={{
          maxWidth: 1280, margin: '0 auto',
          position: 'relative', zIndex: 10,
          textAlign: 'center',
          fontFamily: theme.display, fontWeight: 900,
          lineHeight: 0.95, letterSpacing: '-0.02em',
          textTransform: 'uppercase',
        }}
      >
        <span
          className="hollow-text"
          style={{ display: 'block', fontSize: 'clamp(36px, 8vw, 132px)' }}
        >
          CREATE YOUR OWN
        </span>
        <span
          style={{ display: 'block', fontSize: 'clamp(26px, 6vw, 100px)', marginTop: '0.08em' }}
        >
          <span style={{ color: theme.base }}>PATH &amp; LEAVE </span>
          <span className="cyan-text">A TRAIL</span>
        </span>
      </h2>
    </section>
  );
}
