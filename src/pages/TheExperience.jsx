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
      
        <ExperienceTopBanner />
        <WhatYouWillExperience />
      
      <ExperienceJourney />
      
        <JourneyBanner />
        <IsThisRightForMe />
      
      <StandardsExpectations />
      <RightForMeBanner />
      <DifferentAgesDifferentFocus />
    </>
  );
}
