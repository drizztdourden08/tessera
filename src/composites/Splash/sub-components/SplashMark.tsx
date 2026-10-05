/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { ImageElement } from '../../../primitives/media/ImageElement';
import type { SplashMarkProps } from './SplashMark.type';

const SplashMark = (props: SplashMarkProps) => {
  const { mark } = props;
  if (typeof mark === 'string') return <ImageElement className="ts-mark" src={mark} alt="" />;
  return <Box className="ts-mark" aria-hidden>{mark}</Box>;
};

export { SplashMark };
