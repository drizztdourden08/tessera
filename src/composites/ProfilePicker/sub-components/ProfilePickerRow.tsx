/* @layer renderer-components @kind component */
import { Icon } from '../../../primitives/Icon';
import { ConfirmIconButton } from '../../ConfirmIconButton';
import { ListItemRow } from '../../ListItemRow';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { ProfilePickerRowProps } from './ProfilePickerRow.type';

const ProfilePickerRow = (props: ProfilePickerRowProps) => {
  const { profile, selected, onSelect, onDelete } = props;
  const { id, name, meta, aside, icon } = profile;
  const { common, panels } = useTesseraStrings();
  const remove = onDelete && (
    <ConfirmIconButton
      icon={<Icon name="trash-2" size={14} />}
      label={panels.deleteNamed(name)}
      confirmLabel={panels.deleteNamed(name)}
      cancelLabel={common.keep}
      onConfirm={() => onDelete(id)}
      placement="end"
    />
  );

  return (
    <ListItemRow
      role="listitem"
      name={name}
      meta={meta}
      columns={aside == null ? undefined : [{ primary: aside, align: 'end' }]}
      icon={icon}
      selected={selected}
      onClick={() => onSelect(id)}
      action={remove}
      actionVisibility="always"
    />
  );
};

export { ProfilePickerRow };
