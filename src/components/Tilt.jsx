// Tilt was animation-driven (3D rotate-to-cursor + shine). Disabled —
// renders children inside a plain container.
export function Tilt({ children, radius = 16, className, style, ...rest }) {
  return (
    <div style={{ display: 'inline-block', ...style }} {...rest}>
      <div
        className={className}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: radius,
          overflow: 'hidden',
        }}
      >
        {children}
      </div>
    </div>
  );
}
