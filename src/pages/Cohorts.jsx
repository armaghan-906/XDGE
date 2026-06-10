import { CohortsHero } from '../components/sections/CohortsHero';
import { HowWeDeliver } from '../components/sections/HowWeDeliver';
import { IndividualProgramme } from '../components/sections/IndividualProgramme';
import { CohortProgramme } from '../components/sections/CohortProgramme';
import { ProgrammeFitCTA } from '../components/sections/ProgrammeFitCTA';

export default function Cohorts() {
  return (
    <>
      <CohortsHero />
      <div className="xg-stick-wrap">
        <HowWeDeliver />
      </div>
      <IndividualProgramme />
      <CohortProgramme />
      <div className="xg-stick-wrap">
        <ProgrammeFitCTA />
      </div>
    </>
  );
}
