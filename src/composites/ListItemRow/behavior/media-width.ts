/* @layer renderer-components @kind logic */
import { LIST_ITEM_MEDIA_ASPECT } from '../ListItemRow.constants';
import type { MediaWidthInput } from './media-width.type';

const mediaWidth = (input: MediaWidthInput, height: number): number =>
  input.width ?? Math.round(height * (input.aspect ?? LIST_ITEM_MEDIA_ASPECT));

export { mediaWidth };
