export const theme = {
  // Core palette — pure editorial black & white
  dark: '#000000',
  base: '#FFFFFF',
  ink: '#000000',
  subtitle: '#A8A8A8',
  borderDark: '#2A2A2A',
  borderLight: '#E5E5E5',

  // Monochrome accent system
  accent: '#FFFFFF',          // pure white — used as primary highlight on dark
  accentWarm: '#C8C8C8',      // neutral silver gray (no warm tint)
  accentDeep: '#1A1A1A',      // deep charcoal for layered depth
  midnight: '#000000',        // pure black for ambient base

  // Gradient tokens — grayscale only
  gradientAccent: 'linear-gradient(135deg, #FFFFFF 0%, #C8C8C8 50%, #2A2A2A 100%)',
  gradientWarm: 'linear-gradient(135deg, #E5E5E5 0%, #A8A8A8 100%)',
  gradientHero: 'radial-gradient(ellipse at 20% 0%, rgba(255,255,255,0.10) 0%, transparent 60%), radial-gradient(ellipse at 80% 100%, rgba(255,255,255,0.05) 0%, transparent 55%), #000000',
  gradientMesh: 'radial-gradient(at 25% 30%, rgba(255,255,255,0.10) 0px, transparent 50%), radial-gradient(at 75% 70%, rgba(255,255,255,0.06) 0px, transparent 50%), radial-gradient(at 50% 100%, rgba(255,255,255,0.04) 0px, transparent 60%)',

  // Glow tokens — soft white halo
  glowAccent: '0 0 60px rgba(255,255,255,0.18), 0 0 120px rgba(255,255,255,0.08)',
  glowSoft: '0 20px 60px -20px rgba(0,0,0,0.5), 0 8px 24px -12px rgba(255,255,255,0.06)',

  // Fonts
  display: "'Oswald', 'Anton', 'Archivo Black', Impact, sans-serif",
  displayTight: "'Inter Tight', 'Inter', system-ui, sans-serif",
  body: "'Inter', system-ui, sans-serif",
  italic: "'Instrument Sans', 'Inter', system-ui, sans-serif",
};

export const fadeUp = {};

export const stagger = {};
