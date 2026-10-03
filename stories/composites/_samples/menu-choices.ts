/* @layer stories @kind data */
import type { MenuGroup } from '../../../src/composites/DropdownMenu';

type MenuChoices = {
  flags: Readonly<Record<string, boolean>>;
  sort: string;
  onFlag: (id: string) => void;
  onSort: (id: string) => void;
};

const FLAGS = [
  { id: 'grid', icon: 'layout-grid', label: 'Show the grid' },
  { id: 'hints', icon: 'sparkles', label: 'Show hints' },
] as const;

const SORTS = [
  { id: 'name', label: 'Name' },
  { id: 'progress', label: 'Progress' },
  { id: 'played', label: 'Last played' },
] as const;

const choiceMenu = ({ flags, sort, onFlag, onSort }: MenuChoices): MenuGroup[] => [
  { id: 'show', label: 'Show', items: FLAGS.map((flag) => ({ ...flag, checked: flags[flag.id] === true, onSelect: () => onFlag(flag.id) })) },
  { id: 'sort', label: 'Sort by', items: SORTS.map((entry) => ({ ...entry, kind: 'radio', checked: sort === entry.id, onSelect: () => onSort(entry.id) })) },
];

export { choiceMenu };
