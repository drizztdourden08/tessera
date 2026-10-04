/* @layer renderer-components @kind logic */
import type { MenuItem } from '../../DropdownMenu';
import type { PinMode } from '../Widget.type';
import { choiceMenu } from './choice-menu';
import { PIN_CHOICES } from './widget-options-menu.constants';
import type { MenuWords, WidgetWindowRows } from './widget-options-menu.type';

const windowMenu = (rows: WidgetWindowRows, words: MenuWords): MenuItem[] => {
  const { pin, onPinChange, snap, onSnapChange, sync, onSyncChange } = rows;
  const { widgets } = words;
  const items: MenuItem[] = [];
  if (pin !== undefined && onPinChange) {
    items.push(choiceMenu<PinMode>({ id: 'pin', label: widgets.pin, value: pin, choices: PIN_CHOICES, words: widgets, onChange: onPinChange }));
  }
  if (snap !== undefined && onSnapChange) {
    items.push({
      id: 'snap', label: widgets.snapOn, icon: 'magnet', kind: 'check', checked: snap,
      description: snap ? widgets.snapOnHint : widgets.snapOffHint, onSelect: () => onSnapChange(!snap),
    });
  }
  if (sync !== undefined && onSyncChange) {
    items.push({
      id: 'sync', label: widgets.sync, icon: 'link', kind: 'check', checked: sync,
      description: sync ? widgets.syncOnHint : widgets.syncOffHint, onSelect: () => onSyncChange(!sync),
    });
  }
  return items;
};

export { windowMenu };
