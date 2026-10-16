/* @layer renderer-components @kind hook */
import { useMemo } from 'react';
import type { MenuGroup } from '../../DropdownMenu';
import type { WindowTitleBarTucked } from '../WindowTitleBar.type';
import { titleBarMenu } from './title-bar-menu';
import type { TitleBarMenuInput } from './title-bar-menu.type';
import { viewPlace } from './view-place';

const useTitleBarMenu = (input: TitleBarMenuInput): MenuGroup[] => {
  const { menu, actions, view, tucked, tuckedRows, pin, fullscreenButton, pinned, fullscreen, onControl, strings } = input;
  const shown = view !== false;
  const { group, position } = viewPlace(view);
  const rowsKey = JSON.stringify(tuckedRows ?? {});
  const rows = useMemo(() => JSON.parse(rowsKey) as WindowTitleBarTucked, [rowsKey]);
  return useMemo(
    () => titleBarMenu({ menu, actions, view: shown && { group, position }, tucked, tuckedRows: rows, pin, fullscreenButton, pinned, fullscreen, onControl, strings }),
    [menu, actions, shown, group, position, tucked, rows, pin, fullscreenButton, pinned, fullscreen, onControl, strings],
  );
};

export { useTitleBarMenu };
