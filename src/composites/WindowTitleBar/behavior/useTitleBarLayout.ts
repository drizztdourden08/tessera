/* @layer renderer-components @kind hook */
import type { RefObject } from 'react';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { ALL_CONTROLS, NO_ACTIONS, NO_MENU } from '../WindowTitleBar.constants';
import type { WindowTitleBarProps } from '../WindowTitleBar.type';
import { hideOrder } from './hide-order';
import type { TitleBarLayout } from './title-bar-layout.type';
import { useTitleBarFit } from './useTitleBarFit';
import { useTitleBarMenu } from './useTitleBarMenu';

const useTitleBarLayout = (
  props: WindowTitleBarProps,
  barRef: RefObject<HTMLElement | null>,
  brandRef: RefObject<HTMLElement | null>,
): TitleBarLayout => {
  const { menu = NO_MENU, actions = NO_ACTIONS, controls = ALL_CONTROLS, pinned = false, fullscreen = false, onControl } = props;
  const { windows } = useTesseraStrings();
  const fit = useTitleBarFit(barRef, brandRef, hideOrder(actions, controls));
  const groups = useTitleBarMenu({
    menu, actions, pin: controls.pin !== false, fullscreenButton: controls.fullscreen !== false, pinned, fullscreen, onControl, strings: windows,
  });
  return { groups, actions, controls, hidden: new Set(fit.hidden), brand: fit.brand };
};

export { useTitleBarLayout };
