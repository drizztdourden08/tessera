/* @layer renderer-components @kind util */
import type { CSSProperties } from 'react';

const cssVars = (vars: Record<`--${string}`, number | string>): CSSProperties => vars;

export { cssVars };
