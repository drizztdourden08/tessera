/* @layer renderer-components @kind component */
import { BackdropLayer } from '../../../primitives/BackdropLayer';
import { Box } from '../../../primitives/Box';
import type { HeroBackdropLayerProps } from '../Hero.type';
import './HeroBackdropLayer.css';

const HeroBackdropLayer = (props: HeroBackdropLayerProps) => {
  const { backdrop } = props;
  if (backdrop === null) return null;
  if (backdrop === undefined) return <Box className="hero__backdrop hero__backdrop--brand" aria-hidden="true" />;
  return <BackdropLayer backdrop={backdrop} className="hero__backdrop" />;
};

export { HeroBackdropLayer };
