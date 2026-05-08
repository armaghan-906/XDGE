import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { ScrollProgress } from './components/ScrollProgress';
import { Cursor } from './components/Cursor';
import { TopBar } from './components/TopBar';
import { ScrollToTop } from './components/ScrollToTop';
import { Footer } from './components/sections/Footer';
import Home from './pages/Home';
import TheExperience from './pages/TheExperience';

function Layout() {
  return (
    <div>
      <ScrollToTop />
      <Cursor />
      <ScrollProgress />
      <TopBar />
      <Outlet />
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
