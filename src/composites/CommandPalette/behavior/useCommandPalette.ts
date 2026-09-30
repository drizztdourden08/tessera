/* @layer renderer-components @kind hook */
import { useEffect, useMemo, useRef } from 'react';
import type { KeyboardEvent } from 'react';
import { navIndex } from '../../../primitives/listbox/nav-index';
import { navTarget } from '../../../primitives/listbox/nav-target';
import type { CommandPaletteItem, CommandPaletteModel, CommandPaletteProps } from '../CommandPalette.type';
import { flatItems } from './flat-items';
import { runItem } from './run-item';
import { scrollOptionIntoList } from './scroll-option-into-list';
import { useActiveIndex } from './useActiveIndex';
import { usePaletteFocus } from './usePaletteFocus';

const useCommandPalette = <T extends CommandPaletteItem>(props: CommandPaletteProps<T>): CommandPaletteModel<T> => {
  const { open, onClose, query, groups, onSelect, activeIndex, onActiveIndexChange } = props;
  const items = useMemo(() => flatItems(groups), [groups]);
  const enabled = useMemo(() => items.map((item) => item.disabled !== true), [items]);
  const { active: wanted, setActive } = useActiveIndex(query, activeIndex, onActiveIndexChange);
  const active = wanted < items.length ? wanted : -1;
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  usePaletteFocus(open, inputRef);

  useEffect(() => {
    if (listRef.current && active >= 0) scrollOptionIntoList(listRef.current, active);
  }, [active]);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
      return;
    }
    const target = navTarget(event.key, false);
    if (target !== undefined) {
      event.preventDefault();
      setActive(navIndex(enabled, active, target));
      return;
    }
    const item = active >= 0 ? items[active] : undefined;
    if (event.key !== 'Enter' || item === undefined || item.disabled === true) return;
    event.preventDefault();
    runItem(item, event.ctrlKey || event.metaKey, onSelect);
  };

  return { items, active, setActive, inputRef, listRef, handleKeyDown };
};

export { useCommandPalette };
