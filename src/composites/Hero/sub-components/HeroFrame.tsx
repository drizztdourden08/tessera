/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import type { HeroFrameProps } from '../Hero.type';
import { HeroBackdropLayer } from './HeroBackdropLayer';
import './HeroFrame.css';

const HeroFrame = (props: HeroFrameProps) => {
  const { backdrop, shade, children } = props;
  return (
    <Box className="hero__frame">
      <HeroBackdropLayer backdrop={backdrop} />
      {shade !== 'none' && <Box className="hero__shade" data-shade={shade} aria-hidden="true" />}
      {children}
    </Box>
  );
};

export { HeroFrame };
