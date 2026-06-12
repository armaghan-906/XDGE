import { Hero } from '../components/sections/Hero';
import { DragWheelCarousel } from '../components/sections/DragWheelCarousel';
import { WhoWeServe } from '../components/sections/WhoWeServe';
import { WhoWeAre } from '../components/sections/WhoWeAre';
import { TheJourney } from '../components/sections/TheJourney';
import { OurPerformanceFormula } from '../components/sections/OurPerformanceFormula';
import { WhatYouLeaveWith } from '../components/sections/WhatYouLeaveWith';
import { ProvenOutcomes } from '../components/sections/ProvenOutcomes';
import { Insights } from '../components/sections/Insights';
import { IsThisRightForMe } from '../components/sections/IsThisRightForMe';

export default function Home() {
  return (
    <>
      <Hero />
      <DragWheelCarousel />
      <div className="xg-stick-wrap">
        <WhoWeServe />
      </div>
      <IsThisRightForMe />
      <WhoWeAre />
      <TheJourney />
      <OurPerformanceFormula />
      <WhatYouLeaveWith />
      <ProvenOutcomes />
      <div className="xg-stick-wrap">
        <Insights />
      </div>
    </>
  );
}
