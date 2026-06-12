export const theme = {
  // Core palette — Cyan/Blue aesthetic
  dark: '#000000',
  base: '#FFFFFF',
  ink: '#000000',
  subtitle: '#A8A8A8',
  borderDark: '#1A1C20',
  borderLight: '#E5E5E5',

  // Accent system
  accent: '#20E3E8',          // cyan highlight
  accentWarm: '#1BCDF0',      // secondary cyan
  accentDeep: '#2146E8',      // deep royal blue
  midnight: '#000000',

  // Gradient tokens
  gradientAccent: 'linear-gradient(135deg, #20E3E8 0%, #1BCDF0 30%, #2484FF 70%, #2146E8 100%)',
  gradientWarm: 'linear-gradient(135deg, #1BCDF0 0%, #2484FF 100%)',
  gradientHero: '#050505',
  gradientMesh: '#050505',

  // Glow tokens
  glowAccent: '0 0 60px rgba(32, 227, 232, 0.25), 0 0 120px rgba(33, 70, 232, 0.15)',
  glowSoft: '0 20px 60px -20px rgba(5,5,5,0.8), 0 8px 24px -12px rgba(32, 227, 232, 0.15)',

  // Fonts
  display: "'Archivo Black', sans-serif",
  displayTight: "'Archivo Black', sans-serif",
  subheading: "'Avenir', 'Avenir Next', 'Segoe UI', sans-serif",
  body: "'Inter', sans-serif",
  italic: "'Inter', sans-serif",
};

export const fadeUp = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: { 
    opacity: 1, y: 0, scale: 1, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  },
};

export const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
};
