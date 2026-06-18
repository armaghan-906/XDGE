import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
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
        minHeight: '135vh', display: 'flex', flexDirection: 'column',
        position: 'relative', overflow: 'hidden',
        alignItems: 'center', justifyContent: 'center',
      }}
    >
      <video
        ref={(el) => { if (el) el.playbackRate = 0.5; }}
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
          transform: 'scale(0.85) translateY(-6vh)',
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
          transform: 'translateY(-6vh)',
        }}
      >
        <Logo style={{ fontSize: 'clamp(64px, 14vw, 200px)' }} />
        <div style={{ textAlign: 'center', marginTop: 'clamp(12px, 1.5vw, 20px)' }}>
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

      <div style={{
        position: 'absolute',
        bottom: 'clamp(12px, 2vw, 20px)',
        right: 'clamp(24px, 4vw, 40px)',
        zIndex: 10,
        textAlign: 'right',
        maxWidth: 580,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
      }}>
        <h3 style={{
          fontSize: 'clamp(20px, 2.2vw, 28px)',
          lineHeight: 1.25,
          margin: 0,
          fontFamily: theme.body,
          color: theme.base,
          fontWeight: 600
        }}>
          For Young People 12&ndash;24 Building<br />
          Their Next Step Advantage
        </h3>

        <div style={{ width: '100%', height: 1, background: '#ffffff', margin: '16px 0 20px' }}></div>

        <p style={{
          fontSize: 'clamp(12px, 1.3vw, 14px)',
          lineHeight: 1.5,
          margin: '0 0 20px',
          color: '#e0e0e0',
          fontWeight: 400,
        }}>
          The XDGE (pronounced Edge) helps ambitious young people develop the
          leadership, skills, and real-world experience that define their distinctive edge.
          Guided by experienced leaders and industry experts, participants build the
          confidence, capability, and portfolio to stand out in their next opportunity and
          make an impact in school, university, careers, business, and life.
        </p>

        <Link
          to="/programmes"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 10, padding: '10px 20px',
            border: `1px solid rgba(255,255,255,0.4)`, borderRadius: 999, color: theme.base,
            textDecoration: 'none', fontSize: 13, fontWeight: 500,
            background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)',
          }}
        >View All Programmes <span style={{ fontSize: 16 }}>→</span></Link>
      </div>
    </section>
  );
}
