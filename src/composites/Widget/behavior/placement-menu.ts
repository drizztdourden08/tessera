/* @layer renderer-components @kind logic */
import type { MenuItem, MenuNode } from '../../DropdownMenu';
import { choiceMenu } from './choice-menu';
import { PLACEMENT_CHOICES } from './widget-options-menu.constants';
import type { MenuWords, PlacementChoice, WidgetOptionsMenuInput } from './widget-options-menu.type';

const currentChoice = (input: WidgetOptionsMenuInput): PlacementChoice | '' => {
  if (input.placement === 'popped') return 'window';
  if (input.placement === 'floating') return 'float';
  return input.dockEdge ?? '';
};

const popInItems = (input: WidgetOptionsMenuInput, words: MenuWords): MenuNode[] => {
  const { placement, onPopOut } = input;
  if (placement !== 'popped' || !onPopOut) return [];
  return [
    { separator: true },
    { id: 'placement:pop-in', label: words.common.popIn, description: words.widgets.popInHint, icon: 'minimize-2', onSelect: onPopOut },
  ];
};

const placementMenu = (input: WidgetOptionsMenuInput, words: MenuWords): MenuItem => {
  const { placement, onDock, onFloat, onPopOut, canPopOut = true } = input;
  const popped = placement === 'popped';
  const windowShown = onPopOut !== undefined && (popped || canPopOut);
  const choices = windowShown ? PLACEMENT_CHOICES : PLACEMENT_CHOICES.filter((choice) => choice.value !== 'window');
  const choose = (next: PlacementChoice): void => {
    if (next === 'float') onFloat();
    else if (next !== 'window') onDock(next);
    else if (!popped) onPopOut?.();
  };
  const menu = choiceMenu<PlacementChoice>({
    id: 'placement', label: words.widgets.placement, value: currentChoice(input), choices, words: words.widgets, onChange: choose,
  });
  return { ...menu, children: [...(menu.children ?? []), ...popInItems(input, words)] };
};

export { placementMenu };
