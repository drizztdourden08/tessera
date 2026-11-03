/* @layer renderer-components @kind logic */
import type { SpringOpenMode } from '../Breadcrumbs.type';

const springEnabled = (mode: SpringOpenMode, hasMenu: boolean, current: boolean): boolean => (mode === 'navigate' ? !current : hasMenu);

export { springEnabled };
