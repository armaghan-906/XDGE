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
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%', position: 'relative', zIndex: 10 }}>
        <h2
          style={{
            textAlign: 'left',
            fontFamily: theme.display, fontWeight: 900,
            lineHeight: 0.95, letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          <span
            className="cyan-text"
            style={{ display: 'block', fontSize: 'clamp(24px, 4.5vw, 84px)', paddingLeft: '0.05em', marginBottom: '0.1em' }}
          >
            CREATE YOUR OWN PATH &amp;
          </span>
          <span
            className="hollow-text"
            style={{ display: 'block', fontSize: 'clamp(60px, 11.3vw, 200px)' }}
          >
            LEAVE A TRAIL
          </span>
        </h2>
      </div>
    </section>
  );
}
