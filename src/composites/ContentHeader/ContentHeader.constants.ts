/* @layer renderer-components @kind data */
import type { ContentHeaderLevel } from './ContentHeader.type';

const HEADING_TAGS: Readonly<Record<ContentHeaderLevel, 'h1' | 'h2' | 'h3' | 'h4'>> = { 1: 'h1', 2: 'h2', 3: 'h3', 4: 'h4' };

const BACK_CLASS = 'content-header__back';

const TITLE_CLASS = 'content-header__title';

export { BACK_CLASS, HEADING_TAGS, TITLE_CLASS };
