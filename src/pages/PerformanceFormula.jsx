import { PerformanceFormulaHero } from '../components/sections/PerformanceFormulaHero';
import { CapabilityBuiltInsideOut } from '../components/sections/CapabilityBuiltInsideOut';
import { OurPerformanceFormula } from '../components/sections/OurPerformanceFormula';
import { PerformanceFormulaCTA } from '../components/sections/PerformanceFormulaCTA';

export default function PerformanceFormula() {
  return (
    <>
      <PerformanceFormulaHero />
      <CapabilityBuiltInsideOut />
      <OurPerformanceFormula dark diagramMaxWidth={1400} />
      <PerformanceFormulaCTA />
    </>
  );
}
