import { Suspense, useEffect } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { motion } from 'framer-motion';

export function PageTransition() {
  const { pathname } = useLocation();
  const outlet = useOutlet();

  useEffect(() => {
    // Scroll to top instantly when route changes
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <Suspense fallback={<div style={{ minHeight: '100vh', background: '#000000' }} />}>
        {outlet}
      </Suspense>
    </motion.div>
  );
}
