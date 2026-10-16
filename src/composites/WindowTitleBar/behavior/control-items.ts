/* @layer renderer-components @kind logic */
import type { MenuItem } from '../../DropdownMenu';
import { FULLSCREEN_ITEM, PIN_ITEM } from '../WindowTitleBar.constants';
import type { WindowTitleBarItemId } from '../WindowTitleBar.type';
import type { TitleBarMenuInput } from './title-bar-menu.type';

const controlItems = (input: TitleBarMenuInput, listed: (item: WindowTitleBarItemId) => boolean, idPrefix = ''): MenuItem[] => {
  const { pin, fullscreenButton, pinned, fullscreen, onControl, strings } = input;
  const items: MenuItem[] = [];
  if (pin && listed(PIN_ITEM)) {
    const [icon, label] = pinned ? ['pin-off', strings.unpin] as const : ['pin', strings.pinOnTop] as const;
    items.push({ id: `${idPrefix}pin`, icon, label, onSelect: () => onControl('pin') });
  }
  if (fullscreenButton && listed(FULLSCREEN_ITEM)) {
    const [icon, label] = fullscreen ? ['minimize-2', strings.exitFullscreen] as const : ['maximize-2', strings.fullscreen] as const;
    items.push({ id: `${idPrefix}fullscreen`, icon, label, onSelect: () => onControl('fullscreen') });
  }
  return items;
};

export { controlItems };
