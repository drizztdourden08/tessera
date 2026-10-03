/* @layer renderer-components @kind logic */
import type { CSSProperties } from 'react';
import type { ResolvedEmphasis } from '../Emphasis.type';

const emphasisVars = ({ from, to, duration }: ResolvedEmphasis): CSSProperties =>
  ({ '--emphasis-from': from, '--emphasis-to': to, '--emphasis-duration': `${duration}ms` }) as CSSProperties;

export { emphasisVars };
