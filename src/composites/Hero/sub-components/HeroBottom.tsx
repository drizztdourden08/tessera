/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { FactsPanel } from '../../FactsPanel';
import type { HeroBottomProps } from '../Hero.type';

const HeroBottom = (props: HeroBottomProps) => {
  const { facts = [], panel } = props;
  if (facts.length === 0 && panel == null) return null;
  return (
    <Box className="hero__bottom">
      {facts.length > 0 && <FactsPanel groups={facts} className="hero__glass hero__facts" />}
      {panel != null && <Box className="hero__glass hero__panel">{panel}</Box>}
    </Box>
  );
};

export { HeroBottom };
