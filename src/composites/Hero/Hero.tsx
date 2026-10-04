/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { ButtonRow } from '../../primitives/ButtonRow';
import { Image } from '../../primitives/Image';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { HeroBottom } from './sub-components/HeroBottom';
import { HeroIntro } from './sub-components/HeroIntro';
import type { HeroProps } from './Hero.type';
import './Hero.css';

const Hero = (props: HeroProps) => {
  const { title, eyebrow, brand = 'tessera', backdrop, art, actions, tools, facts, aside, panel, label, className } = props;
  const { panels } = useTesseraStrings();

  return (
    <Box
      as="section"
      className={['hero', aside != null ? 'hero--aside' : '', className].filter(Boolean).join(' ')}
      data-brand={brand}
      aria-label={label ?? panels.overview}
    >
      <Box className="hero__frame">
        <Box className="hero__backdrop">{backdrop}</Box>
        <Box className="hero__shade" aria-hidden="true" />
        <Box className="hero__grid">
          {art && (
            <Image
              className={`hero__art${art.pixelated ? ' hero__art--pixelated' : ''}`}
              src={art.src}
              alt={art.alt ?? ''}
              placeholder="none"
            />
          )}
          <ButtonRow className="hero__tools">{tools}</ButtonRow>
          <Box className="hero__main">
            <HeroIntro eyebrow={eyebrow} title={title} actions={actions} />
            {aside != null && <Box className="hero__glass hero__aside">{aside}</Box>}
          </Box>
          <HeroBottom facts={facts} panel={panel} />
        </Box>
      </Box>
    </Box>
  );
};

export { Hero };
