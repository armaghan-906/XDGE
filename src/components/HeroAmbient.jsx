/**
 * HeroAmbient — atmospheric mesh-gradient + 3 floating orbs.
 *
 * Animation is driven by CSS keyframes (not framer-motion `animate`) so the
 * browser auto-pauses composited transforms when the section is offscreen.
 * This is the cheap, always-on ambient layer used by every non-home hero.
 */
import { VideoBackground } from './primitives/VideoBackground';

export function HeroAmbient({ src = "/assets/videos/hero.mp4" }) {
  return <VideoBackground src={src} />;
}
