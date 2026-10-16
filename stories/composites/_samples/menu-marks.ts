/* @layer stories @kind data */
import type { MenuGroup } from '../../../src/composites/DropdownMenu';

type MarkKind = 'Check' | 'Radio';

type MarkShow = 'Off' | 'On' | 'Changing by itself' | 'Click to change';

const MARK_KINDS: readonly MarkKind[] = ['Check', 'Radio'];

const MARK_SHOWS: readonly MarkShow[] = ['Off', 'On', 'Changing by itself', 'Click to change'];

const MARK_TICK_MS = 1200;

const CHECKS = [
  { id: 'grid', label: 'Show the grid' },
  { id: 'hints', label: 'Show hints' },
] as const;

const SORTS = [
  { id: 'name', label: 'Name' },
  { id: 'progress', label: 'Progress' },
  { id: 'played', label: 'Last played' },
] as const;

type MarkMenu = {
  kind: MarkKind;
  count: number;
  isOn: (id: string) => boolean;
  onPick?: (id: string) => void;
};

const markMenu = ({ kind, count, isOn, onPick }: MarkMenu): MenuGroup[] => {
  const entries = kind === 'Check' ? CHECKS : SORTS;
  return [{
    id: kind,
    items: entries.slice(0, count).map((entry) => ({
      ...entry,
      kind: kind === 'Check' ? 'check' : 'radio',
      checked: isOn(entry.id),
      onSelect: onPick ? () => onPick(entry.id) : undefined,
    })),
  }];
};

const sortAt = (tick: number): string => SORTS[tick % SORTS.length]?.id ?? SORTS[0].id;

export { MARK_KINDS, MARK_SHOWS, MARK_TICK_MS, markMenu, sortAt };
export type { MarkKind, MarkShow };
