import { Suspense, useEffect } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../theme';

export function PageTransition() {
  const { pathname } = useLocation();
  const outlet = useOutlet();

  useEffect(() => {
    // Scroll to top instantly when route changes
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <Suspense fallback={<div style={{ minHeight: '100vh', background: theme.dark }} />}>
          {outlet}
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}
