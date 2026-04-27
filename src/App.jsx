import { ScrollProgress } from './components/ScrollProgress';
import { Cursor } from './components/Cursor';
import { TopBar } from './components/TopBar';
import { Hero } from './components/sections/Hero';
import { WhatWeDo } from './components/sections/WhatWeDo';
import { WhoItsFor } from './components/sections/WhoItsFor';
import { Culture } from './components/sections/Culture';
import { WhoWeServe } from './components/sections/WhoWeServe';
import { ProvenOutcomes } from './components/sections/ProvenOutcomes';
import { Insights } from './components/sections/Insights';
import { ClosingCTA } from './components/sections/ClosingCTA';
import { Footer } from './components/sections/Footer';

export default function App() {
  return (
    <div>
      <Cursor />
      <ScrollProgress />
      <TopBar />
      <Hero />
      <WhatWeDo />
      <WhoItsFor />
      <Culture />
      <WhoWeServe />
      <ProvenOutcomes />
      <Insights />
      <ClosingCTA />
      <Footer />
    </div>
  );
}
