/* @layer stories @kind component */
import { PixelThumbnail } from '../../../src/primitives';
import { axis } from '../../_template/axis';
import { Demonstrator } from '../../_template/Demonstrator';
import { HEART_INDEXED, THUMBNAIL_BOX_KEYS, THUMBNAIL_BOXES } from './pixel-samples.constants';

const FITS = ['step', 'contain'] as const;

const PixelThumbnailBoxes = () => (
  <Demonstrator
    rows={axis(FITS)}
    columns={axis(THUMBNAIL_BOX_KEYS)}
    valign="end"
    cell={(fit, box) => <PixelThumbnail indexed={HEART_INDEXED} box={THUMBNAIL_BOXES[box]} fit={fit} label="A heart" />}
  />
);

export { PixelThumbnailBoxes };
