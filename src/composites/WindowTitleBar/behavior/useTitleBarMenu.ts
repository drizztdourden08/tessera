/* @layer renderer-components @kind hook */
import { useMemo } from 'react';
import type { MenuGroup } from '../../DropdownMenu';
import { titleBarMenu } from './title-bar-menu';
import type { TitleBarMenuInput } from './title-bar-menu.type';
import { viewPlace } from './view-place';

const useTitleBarMenu = (input: TitleBarMenuInput): MenuGroup[] => {
  const { menu, actions, view, pin, fullscreenButton, pinned, fullscreen, onControl, strings } = input;
  const shown = view !== false;
  const { group, position } = viewPlace(view);
  return useMemo(
    () => titleBarMenu({ menu, actions, view: shown && { group, position }, pin, fullscreenButton, pinned, fullscreen, onControl, strings }),
    [menu, actions, shown, group, position, pin, fullscreenButton, pinned, fullscreen, onControl, strings],
  );
};

export { useTitleBarMenu };
