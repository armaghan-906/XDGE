import { ScrollProgress } from './components/ScrollProgress';
import { Cursor } from './components/Cursor';
import { TopBar } from './components/TopBar';
import { Hero } from './components/sections/Hero';
import { TheReality } from './components/sections/TheReality';
import { WhoWeAre } from './components/sections/WhoWeAre';
import { WhoItsFor } from './components/sections/WhoItsFor';
import { TheJourney } from './components/sections/TheJourney';
import { WhatYouLeaveWith } from './components/sections/WhatYouLeaveWith';
import { Culture } from './components/sections/Culture';
import { WhoWeServe } from './components/sections/WhoWeServe';
import { ProvenOutcomes } from './components/sections/ProvenOutcomes';
import { OurPerformanceFormula } from './components/sections/OurPerformanceFormula';
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
      <TheReality />
      <WhoItsFor />
      <WhoWeAre />
      <TheJourney />
      <WhatYouLeaveWith />
      <Culture />
      <WhoWeServe />
      <ProvenOutcomes />
      <OurPerformanceFormula />
      <Insights />
      <ClosingCTA />
      <Footer />
    </div>
  );
}
