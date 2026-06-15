import { ProgrammesHero } from '../components/sections/ProgrammesHero';
import { ProgrammeTiers } from '../components/sections/ProgrammeTiers';
import { IncubatorPathways } from '../components/sections/IncubatorPathways';
import { StepIntoNextLevel } from '../components/sections/StepIntoNextLevel';

export default function Programmes() {
  return (
    <>
      <ProgrammesHero />
      <ProgrammeTiers />
      <IncubatorPathways />
      <StepIntoNextLevel />
    </>
  );
}
