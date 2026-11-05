/* @layer renderer-components @kind component */
import { Button } from '../../../primitives/Button';
import { Icon } from '../../../primitives/Icon';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { DropdownMenu } from '../../DropdownMenu';
import type { MenuNode } from '../../DropdownMenu';
import { useAnchorMenu } from '../../FilterBar/behavior/useAnchorMenu';
import type { AddGroupButtonProps } from './AddGroupButton.type';

const AddGroupButton = (props: AddGroupButtonProps) => {
  const { options, hasChips, onAdd } = props;
  const menu = useAnchorMenu<HTMLButtonElement>('.dropdown-menu');
  const { filters } = useTesseraStrings();
  const items = options.map((option): MenuNode => ({
    id: option.id,
    label: option.label,
    onSelect: () => {
      onAdd(option.id);
      menu.close();
    },
  }));

  return (
    <>
      <Button
        ref={menu.anchorRef}
        variant="tertiary"
        size="sm"
        className="filter-bar__add"
        icon={<Icon name="plus" />}
        aria-haspopup="menu"
        aria-expanded={menu.open}
        aria-label={filters.addGroup}
        title={filters.addGroup}
        onClick={menu.toggle}
      >
        {hasChips ? null : filters.addGroup}
      </Button>
      {menu.open && (
        <DropdownMenu groups={[{ id: 'fields', label: filters.groupBy, items }]} anchorRef={menu.anchorRef} onClose={menu.close} />
      )}
    </>
  );
};

export { AddGroupButton };
