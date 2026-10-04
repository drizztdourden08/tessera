/* @layer renderer-components @kind component */
import { useMemo } from 'react';
import { Icon } from '../../../primitives/Icon';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { pinMenuGroups } from '../behavior/pin-menu-groups';
import { PIN_CHOICES } from '../behavior/widget-options-menu.constants';
import { WidgetMenu } from './WidgetMenu';
import type { PinMenuProps } from './PinMenu.type';

const PinMenu = (props: PinMenuProps) => {
  const { pin, onChange } = props;
  const { widgets } = useTesseraStrings();
  const groups = useMemo(() => pinMenuGroups(pin, widgets, onChange), [pin, widgets, onChange]);
  const current = PIN_CHOICES.find((choice) => choice.value === pin) ?? PIN_CHOICES[0];
  if (!current) return null;

  return (
    <WidgetMenu
      label={widgets.pinTitle(widgets[current.label])}
      menuLabel={widgets.pin}
      icon={<Icon name={current.icon} size={12} />}
      groups={groups}
      lit={pin === 'top'}
      className={`widget__pin widget__pin--${pin}`}
    />
  );
};

export { PinMenu };
