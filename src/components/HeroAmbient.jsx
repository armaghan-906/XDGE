/**
 * HeroAmbient — atmospheric mesh-gradient + 3 floating orbs.
 *
 * Animation is driven by CSS keyframes (not framer-motion `animate`) so the
 * browser auto-pauses composited transforms when the section is offscreen.
 * This is the cheap, always-on ambient layer used by every non-home hero.
 */
export function HeroAmbient() {
  return (
    <div className="xg-hero-ambient" aria-hidden="true">
      <div className="xg-hero-orb xg-hero-orb-blue xg-orb-drift-a" />
      <div className="xg-hero-orb xg-hero-orb-warm xg-orb-drift-b" />
      <div className="xg-hero-orb xg-hero-orb-deep xg-orb-drift-c" />
      <div className="xg-hero-grain" />
    </div>
  );
}
