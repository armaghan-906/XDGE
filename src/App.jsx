import { ScrollProgress } from './components/ScrollProgress';
import { Cursor } from './components/Cursor';
import { TopBar } from './components/TopBar';
import { Hero } from './components/sections/Hero';
import { TheReality } from './components/sections/TheReality';
import { WhoWeServe } from './components/sections/WhoWeServe';
import { WhoWeAreBanner } from './components/sections/WhoWeAreBanner';
import { WhoWeAre } from './components/sections/WhoWeAre';
import { TheJourney } from './components/sections/TheJourney';
import { OurPerformanceFormula } from './components/sections/OurPerformanceFormula';
import { WhatYouLeaveWith } from './components/sections/WhatYouLeaveWith';
import { ProvenOutcomes } from './components/sections/ProvenOutcomes';
import { InsightsBanner } from './components/sections/InsightsBanner';
import { Insights } from './components/sections/Insights';
import { Footer } from './components/sections/Footer';

export default function App() {
  return (
    <div>
      <Cursor />
      <ScrollProgress />
      <TopBar />
      <Hero />
      <TheReality />
      <WhoWeServe />
      <WhoWeAreBanner />
      <WhoWeAre />
      <TheJourney />
      <OurPerformanceFormula />
      <WhatYouLeaveWith />
      <ProvenOutcomes />
      <InsightsBanner />
      <Insights />
      <Footer />
    </div>
  );
}
