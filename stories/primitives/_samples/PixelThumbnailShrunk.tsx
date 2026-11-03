/* @layer stories @kind component */
import { PixelThumbnail } from '../../../src/primitives';
import { axis } from '../../_template/axis';
import { Demonstrator } from '../../_template/Demonstrator';
import { discImage } from './disc-image';
import { DISC_SIZE, THUMBNAIL_BOX_KEYS, THUMBNAIL_BOXES } from './pixel-samples.constants';

const BACKDROPS = ['checker', 'none'] as const;

const DISC = discImage(DISC_SIZE);

const PixelThumbnailShrunk = () => (
  <Demonstrator
    rows={axis(BACKDROPS)}
    columns={axis(THUMBNAIL_BOX_KEYS)}
    valign="end"
    cell={(backdrop, box) => <PixelThumbnail image={DISC} box={THUMBNAIL_BOXES[box]} backdrop={backdrop} label="A round badge" />}
  />
);

export { PixelThumbnailShrunk };
