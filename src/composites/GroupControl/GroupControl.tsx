/* @layer renderer-components @kind component */
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { DropdownMenu } from '../DropdownMenu';
import { choiceMenuItems } from './behavior/choice-menu-items';
import type { GroupControlProps } from './GroupControl.type';

const GroupControl = (props: GroupControlProps) => {
  const { options, value, onChange, label, className } = props;
  const { views } = useTesseraStrings();
  const current = options.find((option) => option.id === value);
  const trigger = current === undefined ? views.group : views.groupedBy(current.label);

  return (
    <DropdownMenu
      className={className}
      label={label ?? views.groupBy}
      trigger={{ label: trigger, icon: 'layers' }}
      variant="tertiary"
      size="sm"
      groups={[{ id: 'group', label: label ?? views.groupBy, items: choiceMenuItems(options, value, views.none, onChange) }]}
    />
  );
};

export { GroupControl };
