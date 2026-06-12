import { lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ScrollProgress } from './components/ScrollProgress';
import { Cursor } from './components/Cursor';
import { TopBar } from './components/TopBar';
import { PageTransition } from './components/PageTransition';
import { Preloader } from './components/Preloader';
import { ScrollReveal } from './components/ScrollReveal';
import { Footer } from './components/sections/Footer';

const Home = lazy(() => import('./pages/Home'));
const TheExperience = lazy(() => import('./pages/TheExperience'));
const About = lazy(() => import('./pages/About'));
const Cohorts = lazy(() => import('./pages/Cohorts'));
const Outcomes = lazy(() => import('./pages/Outcomes'));
const PerformanceFormula = lazy(() => import('./pages/PerformanceFormula'));
const Programmes = lazy(() => import('./pages/Programmes'));
const Contact = lazy(() => import('./pages/Contact'));
const Apply = lazy(() => import('./pages/Apply'));

function Layout() {
  return (
    <div>
      <Cursor />
      <Preloader />
      <ScrollProgress />
      <ScrollReveal />
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
          <Route path="/programmes" element={<Programmes />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/apply" element={<Apply />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
