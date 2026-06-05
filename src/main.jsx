import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Toggle a body.is-scrolling class while the user is actively scrolling.
// Used by CSS (see index.css) to disable card-hover transforms during scroll
// — otherwise the cursor passing over cards as the page moves causes each
// card to lift+drop, which reads as scroll-time flicker on the home page.
{
  let scrollTimer;
  const onScroll = () => {
    document.body.classList.add('is-scrolling');
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      document.body.classList.remove('is-scrolling');
    }, 160);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
