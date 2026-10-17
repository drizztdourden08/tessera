/* @layer renderer-components @kind util */
import type { TesseraStrings } from '../../../primitives/strings/tessera-strings.type';
import type { TitleBarMenuStrings } from './title-bar-menu.type';

const titleBarStrings = (windows: TesseraStrings['windows'], common: TesseraStrings['common']): TitleBarMenuStrings => ({
  ...windows,
  mute: common.mute,
  unmute: common.unmute,
});

export { titleBarStrings };
