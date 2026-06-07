// AnimatedIcon was framer-motion driven (pathLength draw-on entrance).
// Disabled — renders static SVG paths at their final visible state.

const S = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

const ICONS = {
  cohort: [
    <circle key="a" cx="22" cy="24" r="8" {...S} />,
    <circle key="b" cx="44" cy="24" r="8" {...S} />,
    <path key="c" d="M8 52c0-9 6-14 14-14s14 5 14 14" {...S} />,
    <path key="d" d="M36 40c2-2 5-2 8-2 8 0 14 5 14 14" {...S} />,
  ],
  edge: [
    <circle key="a" cx="32" cy="32" r="24" {...S} />,
    <path key="b" d="M32 8 L40 32 L32 56 L24 32 Z" {...S} />,
    <line key="c" x1="8" y1="32" x2="56" y2="32" {...S} />,
  ],
  trajectory: [
    <polyline key="a" points="8,48 24,34 36,42 56,16" {...S} />,
    <polyline key="b" points="44,16 56,16 56,28" {...S} />,
  ],
  focus: [
    <circle key="a" cx="32" cy="32" r="24" {...S} />,
    <circle key="b" cx="32" cy="32" r="13" {...S} />,
    <circle key="c" cx="32" cy="32" r="3" {...S} />,
  ],
};

export function AnimatedIcon({ name = 'cohort', size = 64, style, ...rest }) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      style={{ color: 'currentColor', display: 'block', overflow: 'visible', ...style }}
      {...rest}
    >
      {ICONS[name] || ICONS.cohort}
    </svg>
  );
}
