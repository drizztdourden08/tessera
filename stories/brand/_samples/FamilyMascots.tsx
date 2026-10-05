/* @layer stories @kind component */
import { AnimatedMascot, BRAND_FAMILY, Mascot } from '../../../src/brand';
import type { BrandApp } from '../../../src/brand';
import { Flex } from '../../../src/primitives';
import { MASCOT_TABS } from './mascot-tab.constants';

interface FamilyMascotsProps {
  app: BrandApp;
}

const FamilyMascots = (props: FamilyMascotsProps) => {
  const { app } = props;
  const brand = MASCOT_TABS.find((tab) => tab === app);
  const name = BRAND_FAMILY[app].mascot?.name;
  if (!brand || !name) return null;
  return (
    <Flex gap="md" align="center" className="brand-family__mascot" data-testid="family-mascots">
      <AnimatedMascot brand={brand} size="lg" title={`${name}, the ${BRAND_FAMILY[app].name} mascot`} />
      <Mascot brand={brand} size="md" title="" />
    </Flex>
  );
};

export { FamilyMascots };
