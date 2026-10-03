/* @layer renderer-components @kind util */
import { foldText } from '../../../primitives/listbox/fold-text';
import { menuLeaves } from './menu-leaves';
import type { MenuGroup } from '../DropdownMenu.type';
import type { MenuMatch } from './menu-match.type';

const searchTextOf = (match: MenuMatch): string =>
  foldText([...match.path, match.item.label, match.item.description ?? ''].join(' '));

const menuMatches = (groups: readonly MenuGroup[], query: string): MenuMatch[] => {
  const words = foldText(query).split(/\s+/).filter((word) => word !== '');
  if (words.length === 0) return [];
  return menuLeaves(groups).filter((match) => {
    const text = searchTextOf(match);
    return words.every((word) => text.includes(word));
  });
};

export { menuMatches };
