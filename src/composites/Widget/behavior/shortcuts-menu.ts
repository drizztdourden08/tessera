/* @layer renderer-components @kind logic */
import type { MenuItem } from '../../DropdownMenu';
import { SHORTCUTS } from './widget-options-menu.constants';
import type { WidgetWords } from './widget-options-menu.type';

const shortcutsMenu = (words: WidgetWords): MenuItem => ({
  id: 'shortcuts',
  label: words.shortcutsSection,
  icon: 'keyboard',
  children: SHORTCUTS.map(({ keys, gesture, does }) => ({
    id: `shortcuts:${does}`,
    label: words[does],
    description: gesture ? words[gesture] : undefined,
    shortcut: keys ? [keys] : undefined,
  })),
});

export { shortcutsMenu };
