import { theme } from '../theme';

export function Logo({ style, className }) {
  // Creating a "chrome/foil" effect using sharp gradient stops to mimic specular highlights
  // Colors used: 🟦 #20E3E8, 🟦 #1BCDF0, 🟦 #2484FF, 🟦 #2146E8, ⬛ #000000, ⬜ #FFFFFF
  
  const chromeX = 'linear-gradient(135deg, #20E3E8 0%, #1BCDF0 35%, #2484FF 65%, #2146E8 100%)';
  const chromeD = 'linear-gradient(135deg, #FFFFFF 0%, #FFFFFF 100%)';
  const chromeG = 'linear-gradient(135deg, #1BCDF0 0%, #2484FF 50%, #2146E8 100%)';
  const chromeE = 'linear-gradient(135deg, #2484FF 0%, #2146E8 100%)';

  const letterStyle = {
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    WebkitTextFillColor: 'transparent',
    display: 'inline-block',
    padding: '0 0.02em', // Prevent clipping
  };

  return (
    <span className={className} style={{
      display: 'inline-flex',
      flexDirection: 'row',
      whiteSpace: 'nowrap',
      fontFamily: theme.display, fontWeight: 900,
      letterSpacing: '-0.02em', lineHeight: 1,
      ...style
    }}>
      <span style={{ backgroundImage: chromeX, ...letterStyle }}>X</span>
      <span style={{ backgroundImage: chromeD, ...letterStyle }}>D</span>
      <span style={{ backgroundImage: chromeG, ...letterStyle }}>G</span>
      <span style={{ backgroundImage: chromeE, ...letterStyle }}>E</span>
    </span>
  );
}

export function FullLogo({ style, className }) {
  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', ...style }}>
      <Logo style={{ fontSize: 'clamp(64px, 12vw, 220px)', marginBottom: 'clamp(8px, 1.5vw, 24px)' }} />
      <div style={{
        fontFamily: theme.body,
        fontSize: 'clamp(10px, 1.6vw, 22px)',
        fontWeight: 400,
        letterSpacing: '0.25em',
        color: '#ffffff',
        marginBottom: 'clamp(6px, 1vw, 16px)',
        textAlign: 'center',
      }}>
        LEAD YOUR OWN OPPORTUNITIES.
      </div>
      <div style={{
        fontFamily: theme.body,
        fontSize: 'clamp(8px, 1.3vw, 18px)',
        fontWeight: 600,
        letterSpacing: '0.3em',
        background: 'linear-gradient(to right, #20E3E8, #2484FF)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textAlign: 'center',
      }}>
        TRAIN &nbsp;•&nbsp; BUILD &nbsp;•&nbsp; LEAD &nbsp;•&nbsp; IMPACT
      </div>
    </div>
  );
}
