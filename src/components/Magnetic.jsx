// All animations DISABLED — Magnetic is a passthrough wrapper.
// No cursor-follow, no hover scale, no spring.
export function Magnetic({ children, as = 'span', style, ...rest }) {
  const Tag = as;
  return (
    <Tag style={{ display: 'inline-flex', ...style }} {...rest}>
      {children}
    </Tag>
  );
}
