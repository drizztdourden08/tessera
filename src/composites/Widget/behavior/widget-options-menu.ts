/* @layer renderer-components @kind logic */
import type { MenuGroup } from '../../DropdownMenu';
import { frameMenu } from './frame-menu';
import { placementMenu } from './placement-menu';
import { shortcutsMenu } from './shortcuts-menu';
import type { MenuWords, WidgetOptionsMenuInput } from './widget-options-menu.type';
import { windowMenu } from './window-menu';

const widgetOptionsMenu = (input: WidgetOptionsMenuInput, words: MenuWords): MenuGroup[] => {
  const { widgets } = words;
  const windowItems = input.placement === 'popped' ? windowMenu(input, words) : [];
  return [
    { id: 'layout', items: [placementMenu(input, words), ...frameMenu(input, words)] },
    ...(windowItems.length > 0 ? [{ id: 'window', label: widgets.ownWindow, items: windowItems }] : []),
    ...(input.own ?? []),
    {
      id: 'more',
      items: [
        shortcutsMenu(widgets),
        { id: 'reset', label: widgets.resetWidget, description: widgets.resetHint, icon: 'rotate-ccw', onSelect: input.onReset },
      ],
    },
  ];
};

export { widgetOptionsMenu };
