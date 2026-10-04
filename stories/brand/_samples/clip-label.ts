/* @layer stories @kind logic */
import type { MascotClip } from '../../../src/brand';

const clipLabel = (id: MascotClip): string => {
  const words = id.replace('-', ' ');
  return `${words.charAt(0).toUpperCase()}${words.slice(1)}`;
};

export { clipLabel };
