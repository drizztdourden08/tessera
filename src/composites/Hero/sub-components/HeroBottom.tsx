/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import type { HeroBottomProps } from '../Hero.type';
import { HeroFacts } from './HeroFacts';

const HeroBottom = (props: HeroBottomProps) => {
  const { facts = [], panel } = props;
  if (facts.length === 0 && panel == null) return null;
  return (
    <Box className="hero__bottom">
      {facts.length > 0 && <HeroFacts rows={facts} />}
      {panel != null && <Box className="hero__glass hero__panel">{panel}</Box>}
    </Box>
  );
};

export { HeroBottom };
