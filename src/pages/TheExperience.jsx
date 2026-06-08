import { ExperienceHero } from '../components/sections/ExperienceHero';
import { ExperienceTopBanner } from '../components/sections/ExperienceTopBanner';
import { WhatYouWillExperience } from '../components/sections/WhatYouWillExperience';
import { ExperienceJourney } from '../components/sections/ExperienceJourney';
import { JourneyBanner } from '../components/sections/JourneyBanner';
import { StandardsExpectations } from '../components/sections/StandardsExpectations';
import { DifferentAgesDifferentFocus } from '../components/sections/DifferentAgesDifferentFocus';
import { IsThisRightForMe } from '../components/sections/IsThisRightForMe';
import { RightForMeBanner } from '../components/sections/RightForMeBanner';

export default function TheExperience() {
  return (
    <>
      <ExperienceHero />
      <div className="xg-stick-wrap">
        <ExperienceTopBanner />
        <WhatYouWillExperience />
      </div>
      <ExperienceJourney />
      <div className="xg-stick-wrap">
        <JourneyBanner />
        <IsThisRightForMe />
      </div>
      <StandardsExpectations />
      <RightForMeBanner />
      <DifferentAgesDifferentFocus />
    </>
  );
}
