/* @layer renderer-components @kind data */
import type { ContentHeaderLevel } from './ContentHeader.type';

const HEADING_TAGS: Readonly<Record<ContentHeaderLevel, 'h1' | 'h2' | 'h3' | 'h4'>> = { 1: 'h1', 2: 'h2', 3: 'h3', 4: 'h4' };

export { HEADING_TAGS };
