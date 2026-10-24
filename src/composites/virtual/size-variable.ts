/* @layer renderer-components @kind logic */
import type { VirtualSize } from './virtual.type';

const sizeVariable = (token: VirtualSize): string => `var(--${token})`;

export { sizeVariable };
