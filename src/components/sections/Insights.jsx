import { motion } from 'framer-motion';
import { theme, fadeUp } from '../../theme';
import { Group } from '../primitives/Reveal';
import { SplitHeading } from '../primitives/SplitHeading';

const posts = [
  { tag1: 'DEVELOPMENT', tag2: 'TECH', title: 'How to keep your SaaS customers happy: enhanced user experiences in SaaS solutions' },
  { tag1: 'DESIGN', tag2: 'WEB3', title: "Why your website's user experience is its greatest asset" },
  { tag1: 'PRODUCTIVITY', tag2: 'HEALTH', title: 'Mastering productivity: a guide to getting more done in less time' },
];

export function Insights() {
  return (
    <section data-screen-label="07 Insights" data-section-theme="dark" style={{
      background: theme.dark, color: theme.base,
      padding: 'clamp(64px, 10vw, 120px) clamp(20px, 4vw, 40px) clamp(56px, 8vw, 100px)',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <Group className="xg-2" style={{ alignItems: 'flex-end', marginBottom: 'clamp(32px, 6vw, 56px)' }}>
          <div>
            <motion.div
              variants={fadeUp}
              style={{ fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: theme.subtitle, marginBottom: 28 }}
            >(INSIGHTS)</motion.div>
            <SplitHeading
              lines={['INSIGHTS']}
              style={{
                fontFamily: theme.display, fontWeight: 900,
                fontSize: 'clamp(56px, 14vw, 220px)',
                lineHeight: 0.95, letterSpacing: '-0.02em',
              }}
            />
          </div>
          <motion.div variants={fadeUp} style={{ paddingBottom: 24 }}>
            <p style={{ fontSize: 17, lineHeight: 1.55, color: theme.subtitle, margin: '0 0 24px', maxWidth: 480 }}>
              Get our latest thoughts and opinions on all things leadership, mindset, and performance.
            </p>
            <motion.a
              whileHover={{ x: 4 }}
              href="#"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10, padding: '12px 20px',
                border: `1px solid ${theme.base}`, borderRadius: 999, color: theme.base,
                textDecoration: 'none', fontSize: 13, fontWeight: 500,
              }}
            >All Insights <span style={{ fontSize: 16 }}>→</span></motion.a>
          </motion.div>
        </Group>
        <Group className="xg-3">
          {posts.map((p, i) => (
            <motion.a
              key={i}
              href="#"
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              style={{
                display: 'block', textDecoration: 'none', color: theme.base,
                border: `1px solid ${theme.borderDark}`, overflow: 'hidden',
              }}
            >
              <div style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '4/3',
                overflow: 'hidden',
                background: theme.dark,
              }}>
                <motion.img
                  src={`/assets/blog-0${i + 1}.webp`}
                  alt={p.title}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 1.0, ease: [0.2, 0.7, 0.2, 1] }}
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    objectPosition: '50% 30%',
                    display: 'block',
                  }}
                />
              </div>
              <div style={{ padding: '20px 22px 24px' }}>
                <div style={{ display: 'flex', gap: 8, fontSize: 11, color: theme.subtitle, marginBottom: 12, letterSpacing: '0.06em' }}>
                  <span>{p.tag1}</span><span>·</span><span>{p.tag2}</span>
                </div>
                <h3 style={{ fontFamily: theme.body, fontSize: 16, lineHeight: 1.3, margin: 0, fontWeight: 500 }}>
                  {p.title}
                </h3>
              </div>
            </motion.a>
          ))}
        </Group>
      </div>
    </section>
  );
}
