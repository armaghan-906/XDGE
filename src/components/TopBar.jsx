import { motion } from 'framer-motion';
import { theme } from '../theme';

export function TopBar() {
  const links = ['Programmes', "Who It's For", 'Outcomes', 'Insights'];
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      style={{
        display: 'flex', justifyContent: 'space-between',
        padding: 'clamp(16px, 3vw, 24px) clamp(20px, 4vw, 40px) 0',
        alignItems: 'center', gap: 16,
      }}
    >
      <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
        <div
          style={{
            width: 28, height: 28, border: `1.5px solid ${theme.base}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'serif', fontSize: 14, color: theme.base, flexShrink: 0,
            lineHeight: 1,
          }}
        >X</div>
        <div
          className="xg-hide-sm"
          style={{ fontSize: 11, lineHeight: 1.35, color: theme.base, letterSpacing: '0.04em', paddingTop: 1, whiteSpace: 'nowrap' }}
        >
          <div style={{ whiteSpace: 'nowrap' }}>BRISTOL, UK</div>
          <div style={{ color: theme.subtitle, whiteSpace: 'nowrap' }}>02:58 PM</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 28, fontSize: 12, alignItems: 'center' }}>
        <div className="xg-hide-md" style={{ display: 'flex', gap: 28 }}>
          {links.map((l) => (
            <a key={l} href="#" style={{ color: theme.base, textDecoration: 'none', opacity: 0.85 }}>{l}</a>
          ))}
        </div>
        <a
          href="#"
          style={{
            color: theme.base, textDecoration: 'none', fontSize: 12,
            padding: '8px 16px', border: `1px solid ${theme.borderDark}`, borderRadius: 999,
            whiteSpace: 'nowrap',
          }}
        >Book A Call →</a>
      </div>
    </motion.div>
  );
}
