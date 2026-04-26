export const theme = {
  dark: '#1C1F21',
  base: '#ECEDE8',
  ink: '#1C1F21',
  subtitle: '#BFC0BD',
  borderDark: '#42444A',
  borderLight: '#C1C3C8',
  accent: '#6e96c8',
  display: "'Anton', 'Archivo Black', Impact, sans-serif",
  body: "'Inter', system-ui, sans-serif",
};

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.7, 0.2, 1] } },
};

export const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
