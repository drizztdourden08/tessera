/* @layer renderer-components @kind logic */
import type { ThreadRig } from './pelago.type';

const threadLabel = ({ from, to }: ThreadRig): string =>
  (from === 'core' ? `Spoke ${to.toUpperCase()}` : `Thread ${from.toUpperCase()}${to.toUpperCase()}`);

export { threadLabel };
