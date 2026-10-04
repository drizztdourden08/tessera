/* @layer renderer-components @kind hook */
import { useMemo } from 'react';
import type { MenuGroup } from '../../DropdownMenu';
import { titleBarMenu } from './title-bar-menu';
import type { TitleBarMenuInput } from './title-bar-menu.type';

const useTitleBarMenu = (input: TitleBarMenuInput): MenuGroup[] => {
  const { menu, actions, pin, fullscreenButton, pinned, fullscreen, onControl, strings } = input;
  return useMemo(
    () => titleBarMenu({ menu, actions, pin, fullscreenButton, pinned, fullscreen, onControl, strings }),
    [menu, actions, pin, fullscreenButton, pinned, fullscreen, onControl, strings],
  );
};

export { useTitleBarMenu };
