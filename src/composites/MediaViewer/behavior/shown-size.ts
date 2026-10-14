/* @layer renderer-components @kind logic */
import type { NaturalSize } from '../MediaViewer.type';

const shownSize = (natural: NaturalSize | null, scale: number | null): Partial<NaturalSize> => (natural && scale !== null
  ? { width: Math.round(natural.width * scale), height: Math.round(natural.height * scale) }
  : {});

export { shownSize };
