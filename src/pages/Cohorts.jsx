import { CohortsHero } from '../components/sections/CohortsHero';
import { CohortsBanner } from '../components/sections/CohortsBanner';
import { HowWeDeliver } from '../components/sections/HowWeDeliver';
import { IndividualProgramme } from '../components/sections/IndividualProgramme';
import { CohortProgramme } from '../components/sections/CohortProgramme';
import { CohortsBanner2 } from '../components/sections/CohortsBanner2';
import { ProgrammeFitCTA } from '../components/sections/ProgrammeFitCTA';

export default function Cohorts() {
  return (
    <>
      <CohortsHero />
      <div className="xg-stick-wrap">
        <CohortsBanner />
        <HowWeDeliver />
      </div>
      <IndividualProgramme />
      <CohortProgramme />
      <div className="xg-stick-wrap">
        <CohortsBanner2 />
        <ProgrammeFitCTA />
      </div>
    </>
  );
}
