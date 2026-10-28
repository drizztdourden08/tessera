/* @layer renderer-components @kind logic */
import type { TesseraStrings } from '../../../primitives/strings/tessera-strings.type';
import type { NavigatorSurface, NavigatorViewport } from '../Navigator.type';
import { viewportPercent } from './viewport-percent';

const viewportText = (viewport: NavigatorViewport, surface: NavigatorSurface, words: TesseraStrings['navigation']): string => {
  const { across, down } = viewportPercent(viewport, surface);
  return words.viewing(words.span(...across), words.span(...down));
};

export { viewportText };
