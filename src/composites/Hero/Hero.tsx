/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { usePaletteName } from '../../brand/AnimatedMascot/behavior/usePaletteName';
import { Box } from '../../primitives/Box';
import { ButtonRow } from '../../primitives/ButtonRow';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { heroBrand } from './behavior/hero-brand';
import { heroClasses } from './behavior/hero-classes';
import { HeroArtSlot } from './sub-components/HeroArtSlot';
import { HeroBottom } from './sub-components/HeroBottom';
import { HeroFrame } from './sub-components/HeroFrame';
import { HeroIntro } from './sub-components/HeroIntro';
import type { HeroProps } from './Hero.type';
import './Hero.css';

const Hero = (props: HeroProps) => {
  const { title, eyebrow, brand: ownBrand, backdrop, shade = 'fade', art, actions, tools, facts, aside, panel, label } = props;
  const { panels } = useTesseraStrings();
  const ref = useRef<HTMLElement>(null);
  const brand = heroBrand(ownBrand, usePaletteName(ref, ownBrand === undefined));

  return (
    <Box ref={ref} as="section" className={heroClasses(props)} data-brand={brand} aria-label={label ?? panels.overview}>
      <HeroFrame backdrop={backdrop} shade={shade}>
        <Box className="hero__grid">
          <HeroArtSlot art={art} />
          <ButtonRow className="hero__tools">{tools}</ButtonRow>
          <Box className="hero__main">
            <HeroIntro eyebrow={eyebrow} title={title} actions={actions} />
            {aside != null && <Box className="hero__glass hero__aside">{aside}</Box>}
          </Box>
          <HeroBottom facts={facts} panel={panel} />
        </Box>
      </HeroFrame>
    </Box>
  );
};

export { Hero };
