/* @layer renderer-components @kind util */
import { matchesText } from '../../../data/text/matches-text';
import { menuLeaves } from './menu-leaves';
import type { MenuGroup } from '../DropdownMenu.type';
import type { MenuMatch } from './menu-match.type';

const searchTextOf = (match: MenuMatch): string =>
  [...match.path, match.item.label, match.item.description ?? ''].join(' ');

const menuMatches = (groups: readonly MenuGroup[], query: string): MenuMatch[] => {
  if (query.trim() === '') return [];
  return menuLeaves(groups).filter((match) => matchesText(searchTextOf(match), query));
};

export { menuMatches };
