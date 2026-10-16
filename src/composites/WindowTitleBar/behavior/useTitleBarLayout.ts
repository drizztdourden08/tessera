/* @layer renderer-components @kind hook */
import type { RefObject } from 'react';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { ALL_CONTROLS, NO_ACTIONS, NO_CONTROLS, NO_MENU } from '../WindowTitleBar.constants';
import type { WindowTitleBarProps } from '../WindowTitleBar.type';
import { hideOrder } from './hide-order';
import { useFitChange } from './useFitChange';
import type { TitleBarLayout } from './title-bar-layout.type';
import { useBarSlide } from './useBarSlide';
import { useTitleBarFit } from './useTitleBarFit';
import { useTitleBarMenu } from './useTitleBarMenu';

const useTitleBarLayout = (
  props: WindowTitleBarProps,
  barRef: RefObject<HTMLElement | null>,
  brandRef: RefObject<HTMLElement | null>,
): TitleBarLayout => {
  const { menu = NO_MENU, actions = NO_ACTIONS, view, tucked, pinned = false, fullscreen = false, onControl, onFitChange } = props;
  const controls = props.controls === false ? NO_CONTROLS : props.controls ?? ALL_CONTROLS;
  const { windows } = useTesseraStrings();
  const captureSlide = useBarSlide(barRef);
  const fit = useTitleBarFit(barRef, brandRef, hideOrder(actions, controls), captureSlide);
  useFitChange(fit.hidden, onFitChange);
  const groups = useTitleBarMenu({
    menu, actions, view, tucked: fit.hidden, tuckedRows: tucked, pin: controls.pin !== false, fullscreenButton: controls.fullscreen !== false, pinned, fullscreen, onControl, strings: windows,
  });
  return { groups, actions, controls, hidden: new Set(fit.hidden), brand: fit.brand };
};

export { useTitleBarLayout };
