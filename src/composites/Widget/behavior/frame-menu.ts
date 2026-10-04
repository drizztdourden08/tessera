/* @layer renderer-components @kind logic */
import type { MenuItem } from '../../DropdownMenu';
import type { WidgetVisibility } from '../Widget.type';
import { choiceMenu } from './choice-menu';
import { OPACITY_PERCENTS, OPACITY_TOLERANCE, PERCENT, ROOM_CHOICES, SHOW_CHOICES } from './widget-options-menu.constants';
import type { MenuWords, RoomChoice, WidgetOptionsMenuInput } from './widget-options-menu.type';

const opacityMenu = (input: WidgetOptionsMenuInput, words: MenuWords): MenuItem => {
  const percent = Math.round(input.opacity * PERCENT);
  return {
    id: 'opacity',
    label: words.widgets.opacity,
    description: words.widgets.opacityValue(percent),
    children: OPACITY_PERCENTS.map((value) => ({
      id: `opacity:${value}`,
      label: words.widgets.opacityValue(value),
      kind: 'radio' as const,
      checked: Math.abs(value - percent) < OPACITY_TOLERANCE,
      onSelect: () => input.onOpacityChange(value / PERCENT),
    })),
  };
};

const frameMenu = (input: WidgetOptionsMenuInput, words: MenuWords): MenuItem[] => {
  const { placement, makeRoom, onMakeRoomChange, show, onShowChange, makeRoomHint, contextLabel } = input;
  const own = { ...words.widgets, makeRoomHint: makeRoomHint ?? words.widgets.makeRoomHint, contextLabel: contextLabel ?? words.widgets.contextLabel };
  const room = choiceMenu<RoomChoice>({
    id: 'main-view', label: own.mainView, value: makeRoom ? 'room' : 'overlay', choices: ROOM_CHOICES, words: own,
    onChange: (next) => onMakeRoomChange(next === 'room'),
  });
  const shown = choiceMenu<WidgetVisibility>({ id: 'show', label: own.show, value: show, choices: SHOW_CHOICES, words: own, onChange: onShowChange });
  return [...(placement === 'docked' ? [room] : []), ...(placement === 'popped' ? [] : [shown]), opacityMenu(input, words)];
};

export { frameMenu };
