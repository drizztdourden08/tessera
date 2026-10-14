/* @layer stories @kind component */
import { Image } from '../../../src/primitives';
import { axis } from '../../_template/axis';
import { Demonstrator } from '../../_template/Demonstrator';
import { PIXEL_MODES, SPRITE_URI, VALLEY_URI } from './image-scenes.constants';

const SOURCES = { 'a 16 px sprite': SPRITE_URI, 'a 320 px screenshot': VALLEY_URI } as const;

const modeOf = (mode: (typeof PIXEL_MODES)[number]) => (mode === 'auto' ? 'auto' : mode === 'true');

const ImagePixels = () => (
  <Demonstrator
    rows={axis(Object.keys(SOURCES) as (keyof typeof SOURCES)[])}
    columns={PIXEL_MODES.map((mode) => ({ key: mode, label: `pixelated ${mode}` }))}
    cell={(source, mode) => (
      <Image frame className="image-demo--md image-demo__box" src={SOURCES[source]} fit="contain" pixelated={modeOf(mode)} alt={source} />
    )}
  />
);

export { ImagePixels };
