import { ExperienceHero } from '../components/sections/ExperienceHero';
import { WhatYouWillExperience } from '../components/sections/WhatYouWillExperience';
import { ExperienceJourney } from '../components/sections/ExperienceJourney';
import { StandardsExpectations } from '../components/sections/StandardsExpectations';
import { DifferentAgesDifferentFocus } from '../components/sections/DifferentAgesDifferentFocus';
import { IsThisRightForMe } from '../components/sections/IsThisRightForMe';

export default function TheExperience() {
  return (
    <>
      <ExperienceHero />
      <div className="xg-stick-wrap">
        <WhatYouWillExperience />
      </div>
      <ExperienceJourney />
      <div className="xg-stick-wrap">
        <IsThisRightForMe />
      </div>
      <StandardsExpectations />
      <DifferentAgesDifferentFocus />
    </>
  );
}
