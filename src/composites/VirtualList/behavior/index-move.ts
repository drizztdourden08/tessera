/* @layer renderer-components @kind logic */
import type { IndexKeys, IndexPress } from './index-move.type';

const indexMove = (press: IndexPress, keys: IndexKeys): number | undefined => {
  const { key, active, count, page } = press;
  if (count <= 0) return undefined;
  const last = count - 1;
  switch (key) {
    case keys.after: return Math.min(active + 1, last);
    case keys.before: return Math.max(active - 1, 0);
    case 'PageDown': return Math.min(active + page, last);
    case 'PageUp': return Math.max(active - page, 0);
    case 'Home': return 0;
    case 'End': return last;
    default: return undefined;
  }
};

export { indexMove };
