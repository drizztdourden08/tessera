/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { ButtonRow } from '../../primitives/ButtonRow';
import { Image } from '../../primitives/Image';
import { HeroBottom } from './sub-components/HeroBottom';
import { HeroIntro } from './sub-components/HeroIntro';
import type { HeroProps } from './Hero.type';
import './Hero.css';

const Hero = (props: HeroProps) => {
  const { title, eyebrow, backdrop, art, actions, tools, facts, aside, panel, label = 'Overview', className } = props;

  return (
    <Box as="section" className={['hero', className].filter(Boolean).join(' ')} aria-label={label}>
      <Box className="hero__backdrop">{backdrop}</Box>
      {art && (
        <Image
          className={`hero__art${art.pixelated ? ' hero__art--pixelated' : ''}`}
          src={art.src}
          alt={art.alt ?? ''}
          placeholder="none"
        />
      )}
      <Box className="hero__shade" aria-hidden="true" />
      <ButtonRow className="hero__tools">{tools}</ButtonRow>
      <Box className="hero__main">
        <HeroIntro eyebrow={eyebrow} title={title} actions={actions} />
        {aside != null && <Box className="hero__glass hero__aside">{aside}</Box>}
      </Box>
      <HeroBottom facts={facts} panel={panel} />
    </Box>
  );
};

export { Hero };
