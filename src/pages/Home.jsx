import { Hero } from '../components/sections/Hero';
import { WhoWeServe } from '../components/sections/WhoWeServe';
import { WhoWeAreBanner } from '../components/sections/WhoWeAreBanner';
import { WhoWeAre } from '../components/sections/WhoWeAre';
import { TheJourney } from '../components/sections/TheJourney';
import { OurPerformanceFormula } from '../components/sections/OurPerformanceFormula';
import { WhatYouLeaveWith } from '../components/sections/WhatYouLeaveWith';
import { ProvenOutcomes } from '../components/sections/ProvenOutcomes';
import { InsightsBanner } from '../components/sections/InsightsBanner';
import { Insights } from '../components/sections/Insights';
import { IsThisRightForMe } from '../components/sections/IsThisRightForMe';

export default function Home() {
  return (
    <>
      <Hero />
      
        <WhoWeAreBanner />
        <WhoWeServe />
      
      <IsThisRightForMe />
      <WhoWeAre />
      <TheJourney />
      <OurPerformanceFormula diagramMaxWidth={1400} />
      <WhatYouLeaveWith />
      <ProvenOutcomes />
      
        <InsightsBanner />
        <Insights />
      
    </>
  );
}
