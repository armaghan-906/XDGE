import { motion } from 'framer-motion';
import { theme, fadeUp } from '../../theme';
import { Group } from '../primitives/Reveal';

export function ApplyClosing() {
  return (
    <section
      data-screen-label="Apply Closing"
      data-section-theme="dark"
      style={{
        background: theme.dark,
        color: theme.base,
        padding: 'clamp(80px, 12vw, 160px) clamp(20px, 4vw, 40px)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <Group className="xg-2" style={{ alignItems: 'flex-start', gap: 'clamp(40px, 6vw, 88px)' }}>
          <h2
            variants={fadeUp}
            style={{
              fontFamily: theme.displayTight,
              fontWeight: 600,
              fontSize: 'clamp(45px, 6.75vw, 90px)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              margin: 0,
              color: theme.base,
              maxWidth: '14ch',
            }}
          >
            Submit Your Enquiry
          </h2>

          <div
            variants={fadeUp}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(20px, 2.4vw, 28px)',
              maxWidth: 640,
            }}
          >
            <p style={{
              fontFamily: theme.body,
              fontSize: 'clamp(17px, 1.7vw, 20px)',
              lineHeight: 1.5,
              margin: 0,
              color: theme.base,
              fontWeight: 500,
            }}>
              Every young person has their own strengths, ambitions, and dreams.
              We personally review every enquiry to understand your goals,
              interests, schedule, and aspirations so we can recommend the
              pathway that will best support your growth and future success.
            </p>

            <p style={{
              fontFamily: theme.body,
              fontSize: 'clamp(15px, 1.55vw, 17px)',
              lineHeight: 1.6,
              margin: 0,
              color: theme.subtitle,
            }}>
              We will then be in touch to discuss whether XDGE is the right fit
              and how we can help you build the confidence, leadership
              capability, and experiences needed to achieve your goals and make
              the most of future opportunities.
            </p>

            <div
              style={{
                marginTop: 'clamp(20px, 2.4vw, 32px)',
                paddingTop: 'clamp(22px, 2.6vw, 32px)',
                borderTop: `1px solid ${theme.borderDark}`,
              }}
            >
              <div style={{
                fontFamily: theme.displayTight,
                fontSize: 'clamp(20px, 2.2vw, 28px)',
                fontWeight: 600,
                letterSpacing: '-0.005em',
                color: theme.base,
              }}>
                Nicola Mann
              </div>
              <div style={{
                fontFamily: theme.body,
                fontSize: 14,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: theme.subtitle,
                marginTop: 6,
              }}>
                Founder, The XDGE
              </div>
            </div>
          </div>
        </Group>
      </div>
    </section>
  );
}
