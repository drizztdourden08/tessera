/* @layer renderer-components @kind logic */
import type { SentriAnimation } from '../../../brand/sentri/sentri-motion.type';

const mascotAnimation = (query: string, count: number): SentriAnimation => {
  if (query.trim() === '') return 'scan';
  return count > 0 ? 'idle' : 'alert';
};

export { mascotAnimation };
