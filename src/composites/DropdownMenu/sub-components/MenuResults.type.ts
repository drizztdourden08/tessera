/* @layer renderer-components @kind types */
import type { MenuMatch } from '../behavior/menu-match.type';

interface MenuResultsProps {
  matches: readonly MenuMatch[];
  query: string;
}

export type { MenuResultsProps };
