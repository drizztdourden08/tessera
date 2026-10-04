/* @layer renderer-components @kind component */
import { useMemo } from 'react';
import { Icon } from '../../../primitives/Icon';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { DropdownMenu } from '../../DropdownMenu';
import { pinMenuGroups } from '../behavior/pin-menu-groups';
import { PIN_CHOICES } from './WidgetOptions/WidgetOptions.constants';
import type { PinMenuProps } from './PinMenu.type';

const PinMenu = (props: PinMenuProps) => {
  const { pin, onChange } = props;
  const { widgets } = useTesseraStrings();
  const groups = useMemo(() => pinMenuGroups(pin, widgets, onChange), [pin, widgets, onChange]);
  const current = PIN_CHOICES.find((choice) => choice.value === pin) ?? PIN_CHOICES[0];
  if (!current) return null;
  const trigger = { label: widgets.pinTitle(widgets[current.label]), icon: <Icon name={current.icon} size={12} />, iconOnly: true };

  return (
    <DropdownMenu
      trigger={trigger}
      groups={groups}
      label={widgets.pin}
      variant="ghost"
      intensity="medium"
      className={`widget__btn widget__pin widget__pin--${pin}`}
    />
  );
};

export { PinMenu };
