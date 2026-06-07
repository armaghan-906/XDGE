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
      
        <CohortsBanner />
        <HowWeDeliver />
      
      <IndividualProgramme />
      <CohortProgramme />
      
        <CohortsBanner2 />
        <ProgrammeFitCTA />
      
    </>
  );
}
