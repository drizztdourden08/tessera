/* @layer renderer-components @kind logic */
import { LAYER_SELECTOR } from '../ScreenLayer.constants';

const layerScope = (dialog: HTMLElement): Element =>
  dialog.closest(LAYER_SELECTOR)?.parentElement ?? dialog.ownerDocument.body;

export { layerScope };
