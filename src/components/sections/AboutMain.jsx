import { motion } from 'framer-motion';
import { theme, fadeUp } from '../../theme';
import { Group } from '../primitives/Reveal';

export function AboutMain() {
  return (
    <section
      data-screen-label="About Closing"
      data-section-theme="dark"
      style={{
        background: theme.dark,
        color: theme.base,
        padding: 'clamp(80px, 12vw, 140px) clamp(20px, 4vw, 40px)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <Group
          style={{
            display: 'flex', flexDirection: 'column',
            gap: 'clamp(24px, 3vw, 36px)',
            maxWidth: 900,
            margin: '0 auto',
          }}
        >
          <p
            variants={fadeUp}
            style={{
              fontFamily: theme.italic, fontStyle: 'italic',
              fontSize: 'clamp(24px, 3vw, 40px)',
              lineHeight: 1.3,
              color: theme.base, margin: 0,
              fontWeight: 500,
              letterSpacing: '-0.005em',
              textAlign: 'center',
            }}
          >
            Real leadership insight comes from people who have led teams, built
            organisations, solved complex problems, and know how to inspire
            performance in demanding environments.
          </p>
        </Group>
      </div>
    </section>
  );
}
