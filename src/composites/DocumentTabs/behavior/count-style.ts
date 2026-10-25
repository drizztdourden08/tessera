/* @layer renderer-components @kind util */
import type { CSSProperties } from 'react';
import { COUNT_VAR } from '../DocumentTabs.constants';

const countStyle = (count: number): CSSProperties => ({ [COUNT_VAR]: count }) as CSSProperties;

export { countStyle };
