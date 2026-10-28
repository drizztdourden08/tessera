/* @layer renderer-components @kind constants */
import type { TreeKeyDirection } from './move-request.type';

const DIRECTIONS: Readonly<Record<string, TreeKeyDirection>> = { ArrowUp: 'up', ArrowDown: 'down', ArrowRight: 'in', ArrowLeft: 'out' };

export { DIRECTIONS };
