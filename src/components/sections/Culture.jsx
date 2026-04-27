import { motion } from 'framer-motion';
import { theme, fadeUp } from '../../theme';
import { Group } from '../primitives/Reveal';
import { SplitHeading } from '../primitives/SplitHeading';

function CultureCard({ title, items, light = false }) {
  return (
    <motion.div
      variants={fadeUp}
      style={{
        border: `1px solid ${light ? theme.borderLight : theme.borderDark}`,
        background: light ? theme.base : theme.dark,
        color: light ? theme.ink : theme.base,
        padding: '28px 24px 12px',
        display: 'flex', flexDirection: 'column',
      }}
    >
      <div
        style={{
          fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase',
          color: light ? '#7d7e7c' : theme.subtitle, marginBottom: 18,
        }}
      >{title}</div>
      {items.map(([t, d], i) => (
        <div
          key={i}
          style={{
            padding: '14px 0',
            borderTop: `1px solid ${light ? theme.borderLight : theme.borderDark}`,
          }}
        >
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{t}</div>
          <div style={{ fontSize: 12.5, lineHeight: 1.5, color: light ? '#7d7e7c' : theme.subtitle }}>{d}</div>
        </div>
      ))}
    </motion.div>
  );
}

const doList = [
  ['Encourage Innovation', 'Think creatively, experiment boldly, and bring fresh ideas to the table.'],
  ['Collaborate Openly', 'Share knowledge, listen actively, and support each other to achieve shared goals.'],
  ['Take Ownership', 'Be proactive, accountable, and take pride in your work.'],
  ['Embrace Learning', 'Continuously improve by seeking feedback, upskilling, and adapting to new challenges.'],
  ['Foster Positivity', 'Celebrate successes, uplift teammates, and create a supportive environment.'],
  ['Value Diversity', 'Respect different perspectives and ensure everyone feels included and valued.'],
];

const dontList = [
  ['Dismiss Ideas', "No idea is too small; we don't shut down creativity or innovation."],
  ['Blame Others', 'Mistakes are a chance to learn, not an opportunity to point fingers.'],
  ['Settle for Mediocrity', 'We never compromise on quality or cut corners in our work.'],
  ['Work in Silos', "Collaboration is key; we don't isolate ourselves or hoard knowledge."],
  ['Negativity or Discrimination', 'Negativity, discrimination, or unprofessional behavior has no place here.'],
  ['Resist Change', "We don't cling to outdated practices or shy away from trying new approaches."],
];

export function Culture() {
  return (
    <section data-screen-label="04 Our Culture" data-section-theme="light" style={{
      background: theme.base, color: theme.ink,
      padding: 'clamp(64px, 10vw, 120px) clamp(20px, 4vw, 40px) clamp(56px, 8vw, 100px)',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <Group className="xg-2" style={{ alignItems: 'flex-start', marginBottom: 'clamp(40px, 6vw, 64px)' }}>
          <div>
            <motion.div
              variants={fadeUp}
              style={{ fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#7d7e7c', marginBottom: 28 }}
            >(OUR CULTURE)</motion.div>
            <SplitHeading
              lines={['OUR', 'CULTURE']}
              style={{
                fontFamily: theme.display, fontWeight: 900,
                fontSize: 'clamp(56px, 14vw, 220px)',
                lineHeight: 0.95, letterSpacing: '-0.01em',
              }}
            />
          </div>
          <motion.p variants={fadeUp} style={{ fontSize: 'clamp(15px, 1.6vw, 17px)', lineHeight: 1.55, margin: 0, paddingTop: 'clamp(0px, 4vw, 48px)', color: '#3a3c3e' }}>
            We are always eager to learn and grow, embracing challenges that push us
            beyond our comfort zones. With a passion for self-improvement, we see every
            challenge as an opportunity to expand our skills and discover new perspectives.
          </motion.p>
        </Group>
        <Group className="xg-2" style={{ gap: 24 }}>
          <CultureCard title="What We Do" items={doList} light />
          <CultureCard title="What We Don't Do" items={dontList} />
        </Group>
      </div>
    </section>
  );
}
