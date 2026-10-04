/* @layer renderer-components @kind logic */
import type { MascotClip } from '../../../brand/motion/mascot-clip.type';

const mascotAnimation = (query: string, count: number): MascotClip => {
  if (query.trim() === '') return 'scan';
  return count > 0 ? 'idle' : 'alert';
};

export { mascotAnimation };
