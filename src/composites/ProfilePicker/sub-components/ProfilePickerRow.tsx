/* @layer renderer-components @kind component */
import { Icon } from '../../../primitives/Icon';
import { ConfirmIconButton } from '../../ConfirmIconButton';
import { ListItemRow } from '../../ListItemRow';
import { CONFIRM_DELETE, KEEP } from '../ProfilePicker.constants';
import type { ProfilePickerRowProps } from './ProfilePickerRow.type';

const ProfilePickerRow = (props: ProfilePickerRowProps) => {
  const { profile, selected, onSelect, onDelete } = props;
  const { id, name, meta, aside, icon } = profile;
  const remove = onDelete && (
    <ConfirmIconButton
      icon={<Icon name="trash-2" size={14} />}
      label={`Delete ${name}`}
      confirmLabel={`${CONFIRM_DELETE} ${name}`}
      cancelLabel={KEEP}
      onConfirm={() => onDelete(id)}
    />
  );

  return (
    <ListItemRow
      role="listitem"
      name={name}
      meta={meta}
      aside={aside}
      icon={icon}
      selected={selected}
      onClick={() => onSelect(id)}
      action={remove}
      actionVisibility="always"
    />
  );
};

export { ProfilePickerRow };
