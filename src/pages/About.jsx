import { AboutHero } from '../components/sections/AboutHero';
import { CreateYourPath } from '../components/sections/CreateYourPath';
import { AboutTeam } from '../components/sections/AboutTeam';
import { AboutPrinciples } from '../components/sections/AboutPrinciples';
import { StepIntoNextLevel } from '../components/sections/StepIntoNextLevel';

export default function About() {
  return (
    <>
      <AboutHero />
      <CreateYourPath />
      <div className="xg-stick-wrap">
        <AboutTeam />
      </div>
      <AboutPrinciples />
      <StepIntoNextLevel />
    </>
  );
}
