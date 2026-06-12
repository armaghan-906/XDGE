import { motion } from 'framer-motion';
import { theme } from '../../theme';
import { HeroAmbient } from '../HeroAmbient';

function ContactHeading() {
  const ease = [0.2, 0.7, 0.2, 1];
  return (
    <h1
      style={{
        fontFamily: theme.display, fontWeight: 900,
        fontSize: 'clamp(67.5px, 10.5vw, 199.5px)',
        lineHeight: 0.92, letterSpacing: '-0.03em', margin: 0,
        color: theme.base, display: 'block',
        overflow: 'hidden',
        paddingBottom: '0.06em',
      }}
    >
      <span
        initial={{ y: '110%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 1.0, ease, delay: 0.1 }}
        style={{ display: 'block' }}
      >CONTACT</span>
      <span
        initial={{ y: '110%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 1.0, ease, delay: 0.22 }}
        style={{ display: 'block' }}
      >US</span>
    </h1>
  );
}

export function ContactHero() {
  return (
    <section
      data-screen-label="01 Contact Hero"
      data-cursor="light"
      data-section-theme="dark"
      style={{
        background: theme.dark, color: theme.base,
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        position: 'relative', overflow: 'hidden',
      }}
    >
      <HeroAmbient />
      <div style={{
        flex: 1,
        position: 'relative', zIndex: 10,
        padding: 'clamp(96px, 12vw, 140px) clamp(20px, 4vw, 56px) clamp(40px, 6vw, 64px)',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        gap: 32,
      }}>
        <div style={{ marginTop: 24, position: 'relative' }}>
          <ContactHeading />
          <div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            style={{
              fontFamily: theme.displayTight, fontWeight: 500,
              fontSize: 'clamp(18px, 2vw, 28px)',
              lineHeight: 1.4, letterSpacing: '-0.005em',
              color: theme.base,
              marginTop: 'clamp(14px, 2vw, 32px)',
              maxWidth: '34ch',
            }}
          >
            We&rsquo;d love to hear from you.
          </div>
        </div>

        <div className="xg-hero-body" style={{ alignItems: 'flex-end' }}>
          <div className="xg-hide-md" />
          <div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.7 }}
            style={{ maxWidth: 560 }}
          >
            <p style={{
              fontFamily: theme.body,
              fontSize: 'clamp(16px, 1.6vw, 19px)',
              lineHeight: 1.5,
              color: theme.base,
              margin: 0,
              fontWeight: 500,
            }}>
              Whether you&rsquo;re exploring programmes for yourself, your child,
              or your organisation, we&rsquo;d be delighted to learn more about
              your goals and discuss how XDGE may be able to help.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
