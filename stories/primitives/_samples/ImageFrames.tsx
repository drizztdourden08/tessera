/* @layer stories @kind component */
import { Image } from '../../../src/primitives';
import { axis } from '../../_template/axis';
import { Demonstrator } from '../../_template/Demonstrator';
import { FRAME_SIZES, MISSING_URI, RUINS_URI } from './image-frame-samples.constants';

const SOURCES = ['loaded', 'broken'] as const;

const ImageFrames = () => (
  <Demonstrator
    rows={axis(FRAME_SIZES)}
    columns={axis(SOURCES)}
    cell={(size, source) => (
      <Image frame className={`image-demo--${size}`} src={source === 'loaded' ? RUINS_URI : MISSING_URI} alt="Eastern ruins" />
    )}
  />
);

export { ImageFrames };
