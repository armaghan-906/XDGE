import { lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ScrollProgress } from './components/ScrollProgress';
import { Cursor } from './components/Cursor';
import { TopBar } from './components/TopBar';
import { PageTransition } from './components/PageTransition';
import { Footer } from './components/sections/Footer';

const Home = lazy(() => import('./pages/Home'));
const TheExperience = lazy(() => import('./pages/TheExperience'));
const About = lazy(() => import('./pages/About'));
const Cohorts = lazy(() => import('./pages/Cohorts'));
const Outcomes = lazy(() => import('./pages/Outcomes'));
const PerformanceFormula = lazy(() => import('./pages/PerformanceFormula'));

function Layout() {
  return (
    <div>
      <Cursor />
      <ScrollProgress />
      <TopBar />
      <PageTransition />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/the-experience" element={<TheExperience />} />
          <Route path="/about" element={<About />} />
          <Route path="/cohorts" element={<Cohorts />} />
          <Route path="/outcomes" element={<Outcomes />} />
          <Route path="/performance-formula" element={<PerformanceFormula />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
