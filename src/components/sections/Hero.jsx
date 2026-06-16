import { motion } from 'framer-motion';
import { theme } from '../../theme';
import { Logo } from '../Logo';

export function Hero() {
  return (
    <section
      data-screen-label="01 Hero"
      data-cursor="light"
      data-section-theme="dark"
      style={{
        background: '#000000', color: theme.base,
        height: '100vh', display: 'flex', flexDirection: 'column',
        position: 'relative', overflow: 'hidden',
        alignItems: 'center', justifyContent: 'center',
      }}
    >
      <video
        src="/assets/videos/logo_reveal.mp4"
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 1,
        }}
      />
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#000000',
        opacity: 0.2,
        zIndex: 2,
      }} />
      <div

        style={{
          position: 'relative',
          zIndex: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <Logo style={{ fontSize: 'clamp(96px, 22.5vw, 300px)' }} />
        <div style={{ textAlign: 'center', marginTop: 'clamp(16px, 2vw, 24px)' }}>
          <div style={{ 
            fontFamily: theme.body,
            fontSize: 'clamp(10px, 1.8vw, 24px)', 
            letterSpacing: '0.2em', 
            color: '#ffffff', 
            marginBottom: 'clamp(8px, 1.2vw, 16px)', 
            fontWeight: 400 
          }}>
            LEAD YOUR OWN OPPORTUNITIES.
          </div>
          <div className="cyan-text" style={{ 
            fontSize: 'clamp(10px, 1.8vw, 24px)', 
            letterSpacing: '0.3em', 
            fontWeight: 600 
          }}>
            TRAIN • BUILD • LEAD • IMPACT
          </div>
        </div>
      </div>
    </section>
  );
}
