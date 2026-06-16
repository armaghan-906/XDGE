// All animations DISABLED — Img is a plain aspect-ratio wrapper around img.
// No scroll parallax, no fade-in, no scale entrance.
export function Img({ src, alt = '', ratio = '4/3', style }) {
  return (
    <div
      style={{ position: 'relative', width: '100%', aspectRatio: ratio, overflow: 'hidden', ...style }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', display: 'block',
        }}
      />
    </div>
  );
}
