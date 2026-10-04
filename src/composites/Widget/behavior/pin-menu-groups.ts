/* @layer renderer-components @kind logic */
import type { MenuGroup } from '../../DropdownMenu';
import { PIN_CHOICES } from '../sub-components/WidgetOptions/WidgetOptions.constants';
import type { WidgetWords } from '../sub-components/WidgetOptions/WidgetOptions.type';
import type { PinMode } from '../Widget.type';

const pinMenuGroups = (pin: PinMode, words: WidgetWords, onChange: (mode: PinMode) => void): MenuGroup[] => [{
  id: 'pin',
  label: words.pin,
  items: PIN_CHOICES.map((choice) => ({
    id: choice.value,
    label: words[choice.label],
    description: words[choice.hint],
    icon: choice.icon,
    kind: 'radio' as const,
    checked: choice.value === pin,
    onSelect: () => onChange(choice.value),
  })),
}];

export { pinMenuGroups };
