import { ExperienceHero } from '../components/sections/ExperienceHero';
import { WhoWeAreBanner } from '../components/sections/WhoWeAreBanner';
import { WhatYouWillExperience } from '../components/sections/WhatYouWillExperience';
import { ExperienceJourney } from '../components/sections/ExperienceJourney';
import { HowXDGEWorks } from '../components/sections/HowXDGEWorks';
import { StandardsExpectations } from '../components/sections/StandardsExpectations';
import { DifferentAgesDifferentFocus } from '../components/sections/DifferentAgesDifferentFocus';
import { IsThisRightForMe } from '../components/sections/IsThisRightForMe';

export default function TheExperience() {
  return (
    <>
      <ExperienceHero />
      <WhoWeAreBanner />
      <WhatYouWillExperience />
      <ExperienceJourney />
      <HowXDGEWorks />
      <StandardsExpectations />
      <DifferentAgesDifferentFocus />
      <IsThisRightForMe />
    </>
  );
}
