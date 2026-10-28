/* @layer stories @kind component */
import { Image } from '../../../src/primitives';
import { axis } from '../../_template/axis';
import { Demonstrator } from '../../_template/Demonstrator';
import { SPRITE_URI } from './image-scenes.constants';

const FITS = ['contain', 'integer'] as const;
const BACKDROPS = ['none', 'checker'] as const;

const ImageBackdrops = () => (
  <Demonstrator
    rows={axis(FITS)}
    columns={axis(BACKDROPS)}
    cell={(fit, backdrop) => (
      <Image frame className="image-demo--lg" src={SPRITE_URI} fit={fit} backdrop={backdrop} pixelated alt="A 16 px sprite" />
    )}
  />
);

export { ImageBackdrops };
