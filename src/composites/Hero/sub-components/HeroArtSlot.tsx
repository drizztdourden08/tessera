/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Image } from '../../../primitives/Image';
import type { HeroArtSlotProps } from '../Hero.type';
import './HeroArtSlot.css';

const HeroArtSlot = (props: HeroArtSlotProps) => {
  const { art } = props;
  if (art == null) return null;
  if (art.kind === 'node') {
    const named = art.label != null;
    return (
      <Box className="hero__art hero__art--node" role={named ? 'img' : undefined} aria-label={art.label} aria-hidden={named ? undefined : 'true'}>
        {art.node}
      </Box>
    );
  }
  return (
    <Image
      className={art.motion === 'pan' ? 'hero__art hero__art--pan' : 'hero__art'}
      pixelated={art.pixelated}
      src={art.src}
      alt={art.alt ?? ''}
      placeholder="none"
    />
  );
};

export { HeroArtSlot };
