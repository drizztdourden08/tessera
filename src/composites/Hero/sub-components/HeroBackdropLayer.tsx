/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { backdropStyle } from '../behavior/backdrop-style';
import type { HeroBackdropLayerProps } from '../Hero.type';
import './HeroBackdropLayer.css';

const HeroBackdropLayer = (props: HeroBackdropLayerProps) => {
  const { backdrop } = props;
  if (backdrop === null) return null;
  if (backdrop === undefined) return <Box className="hero__backdrop hero__backdrop--brand" aria-hidden="true" />;
  if (backdrop.kind === 'node') return <Box className="hero__backdrop hero__backdrop--node" aria-hidden="true">{backdrop.node}</Box>;
  const image = backdrop.kind === 'image' ? backdrop : null;
  return (
    <Box
      className={['hero__backdrop', `hero__backdrop--${backdrop.kind}`, image?.pixelated === true && 'hero__backdrop--pixelated'].filter(Boolean).join(' ')}
      data-fit={image === null ? undefined : image.fit ?? 'cover'}
      style={backdropStyle(backdrop)}
      aria-hidden="true"
    />
  );
};

export { HeroBackdropLayer };
