import { motion } from 'framer-motion';
import { theme, fadeUp } from '../../theme';
import { Group } from '../primitives/Reveal';
import { SplitHeading } from '../primitives/SplitHeading';

const posts = [
  {
    tag1: 'CAREER', tag2: 'UNIVERSITY',
    title: 'How Leadership Advances Early Careers',
    body: 'The greater advantage is interviewing as a future leader, then transitioning into the workplace as someone employers already see as professionally credible, work-ready, able to lead from any seat, take ownership, and create impact from day one.',
  },
  {
    tag1: 'UNIVERSITY', tag2: null,
    title: 'What Top Universities Seek In Emerging Leaders',
    body: 'Competitive universities look for evidence of initiative, contribution, and real-world impact from students who can clearly communicate the difference they have made.',
  },
  {
    tag1: 'SCHOOL', tag2: 'UNIVERSITY',
    title: 'How Young Leadership Creates Lasting Advantage',
    body: 'Leadership is about developing conviction, building on your unique strengths, standing behind your beliefs and ambitions, and knowing how to translate them into action that creates your long-term advantage. How different might our lives have been if these foundations had been built in our formative years?',
  },
];

import { FloatingVideo } from '../primitives/FloatingVideo';

export function Insights() {
  return (
    <section data-screen-label="07 Insights" data-section-theme="dark" style={{
      background: theme.dark, color: theme.base,
      position: 'relative',
      overflow: 'hidden',
      padding: 'clamp(120px, 15vw, 240px) clamp(20px, 4vw, 40px) clamp(56px, 8vw, 100px)',
    }}>
      <FloatingVideo 
        src="/assets/videos/elemental_5.mp4" 
        style={{ top: 80, right: -40, opacity: 0.5, mixBlendMode: 'screen', transform: 'scale(1.5)' }} 
      />
      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <Group style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: 'clamp(32px, 6vw, 56px)', gap: 16 }}>
          <div>
            <SplitHeading
              lines={['INSIGHTS']}
              style={{
                fontFamily: theme.display, fontWeight: 900,
                fontSize: 'clamp(36px, 5.5vw, 72px)',
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
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="xg-glass-solid"
              style={{
                display: 'block', textDecoration: 'none', color: theme.base,
                overflow: 'hidden', borderRadius: 8,
              }}
            >
              <div style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '1/1',
                overflow: 'hidden',
              }}>
                <motion.img
                  src={`/assets/new/pic-new-${i + 1}.webp`}
                  alt={p.title}
                  loading="eager"
                  decoding="async"
                  variants={{
                    hidden: { scale: 1.15 },
                    visible: { scale: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    objectPosition: '50% 50%',
                    display: 'block',
                  }}
                />
              </div>
              <div style={{ padding: '22px 24px 28px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{
                  display: 'flex', gap: 8,
                  fontSize: 11, color: theme.subtitle,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}>
                  <span>{p.tag1}</span>
                  {p.tag2 && (<><span>·</span><span>{p.tag2}</span></>)}
                </div>
                <h3 style={{
                  fontFamily: theme.body,
                  fontSize: 'clamp(15px, 1.4vw, 18px)',
                  lineHeight: 1.35,
                  letterSpacing: '-0.005em',
                  margin: 0, fontWeight: 700,
                  color: theme.base,
                }}>
                  {p.title}
                </h3>
                <p style={{
                  fontSize: 13, lineHeight: 1.55,
                  color: theme.subtitle, margin: 0,
                }}>
                  {p.body}
                </p>
              </div>
            </motion.a>
          ))}
        </Group>
      </div>
    </section>
  );
}
