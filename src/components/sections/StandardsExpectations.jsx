import { motion } from 'framer-motion';
import { theme, fadeUp } from '../../theme';
import { Group } from '../primitives/Reveal';
import { SplitHeading } from '../primitives/SplitHeading';

const items = [
  {
    title: 'Take Ownership',
    desc: 'Take full responsibility for your development, your actions, and your progress throughout the programme.',
  },
  {
    title: 'Show Up Consistently',
    desc: 'Attend sessions prepared, engaged, and ready to contribute at a high standard every time.',
  },
  {
    title: 'Follow Through',
    desc: 'Complete tasks, deliver on commitments, and finish what you start without being prompted.',
  },
  {
    title: 'Be Open to Challenge',
    desc: 'Accept feedback, adapt your thinking, and step into situations that push you beyond your comfort zone.',
  },
  {
    title: 'Respect Yourself and Others',
    desc: 'Carry yourself with professionalism and respect in how you speak, act, and work with others.',
  },
  {
    title: 'Commit to Improvement',
    desc: 'Approach the programme with the intent to raise your standard. You won’t get everything right and will make many mistakes. When we grow, that’s expected. What matters is your willingness to learn, adapt, and keep moving forward.',
  },
];

const fadeEase = [0.2, 0.7, 0.2, 1];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: fadeEase } },
};

export function StandardsExpectations() {
  return (
    <section
      data-screen-label="Standards & Expectations"
      data-section-theme="dark"
      style={{
        background: theme.dark,
        color: theme.base,
        padding: 'clamp(64px, 10vw, 120px) clamp(20px, 4vw, 40px)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <Group style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: 'clamp(40px, 6vw, 64px)', gap: 32 }}>
          <div style={{ width: '100%' }}>
            <SplitHeading
              lines={['STANDARDS &', 'EXPECTATIONS']}
              style={{
                fontFamily: theme.display, fontWeight: 900,
                fontSize: 'clamp(36px, 5.5vw, 102px)',
                lineHeight: 0.95, letterSpacing: '-0.02em',
                textAlign: 'left',
              }}
            />
          </div>
          <p
            variants={fadeUp}
            style={{
              fontSize: 'clamp(15px, 1.6vw, 18px)', lineHeight: 1.55,
              color: theme.base, margin: 0, maxWidth: 800,
            }}
          >
            This is a high-standard environment for individuals who are serious
            about what they care about and ready to build the leadership behind it.
          </p>
        </Group>

        <Group
          className="xg-3"
          style={{
            gap: 'clamp(20px, 2.4vw, 28px)',
            alignItems: 'stretch',
          }}
        >
          {items.map((it, i) => (
            <article
              key={it.title}
              variants={cardVariants}
              whileHover={{ y: -4, borderColor: theme.base }}
              transition={{ duration: 0.3, ease: fadeEase }}
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(0,0,0,0.18)',
                padding: 'clamp(24px, 3vw, 36px)',
                display: 'flex', flexDirection: 'column',
                gap: 'clamp(14px, 1.6vw, 20px)',
                position: 'relative',
                minHeight: '100%',
              }}
            >
              <div style={{
                fontFamily: theme.display, fontWeight: 700,
                fontSize: 12, letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: theme.subtitle,
              }}>{String(i + 1).padStart(2, '0')}</div>
              <h3 style={{
                fontFamily: theme.display, fontWeight: 700,
                fontSize: 'clamp(20px, 2.2vw, 26px)',
                lineHeight: 1.1, letterSpacing: '-0.005em',
                margin: 0,
                textTransform: 'uppercase',
                color: theme.base,
              }}>{it.title}</h3>
              <p style={{
                fontSize: 'clamp(13px, 1.4vw, 15px)',
                lineHeight: 1.6,
                margin: 0,
                color: theme.subtitle,
              }}>{it.desc}</p>
            </article>
          ))}
        </Group>
      </div>
    </section>
  );
}
