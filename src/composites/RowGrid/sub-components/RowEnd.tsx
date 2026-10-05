/* @layer renderer-components @kind component */
import { DropdownMenu } from '../../DropdownMenu';
import type { MenuGroup } from '../../DropdownMenu';
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { TesseraStrings } from '../../../primitives/strings/tessera-strings.type';
import type { RowEndProps } from '../RowGrid.type';
import './RowEnd.css';

const menuGroups = ({ menu, index, total, onStep }: RowEndProps, records: TesseraStrings['records']): MenuGroup[] => {
  const groups: MenuGroup[] = menu.length > 0 ? [{ id: 'row', items: menu }] : [];
  if (!onStep) return groups;
  return [...groups, {
    id: 'move',
    items: [
      { id: 'up', label: records.moveUp, icon: 'arrow-up', disabled: index === 0, onSelect: () => onStep(index - 1) },
      { id: 'down', label: records.moveDown, icon: 'arrow-down', disabled: index === total - 1, onSelect: () => onStep(index + 1) },
    ],
  }];
};

const RowEnd = (props: RowEndProps) => {
  const { name, onRemove } = props;
  const { rowGrid, records, common } = useTesseraStrings();
  const groups = menuGroups(props, records);
  return (
    <Box className="row-grid__end">
      {groups.length > 0 && (
        <DropdownMenu trigger={{ label: rowGrid.more(name), icon: 'ellipsis', iconOnly: true }} size="sm" variant="ghost" groups={groups} />
      )}
      {onRemove && (
        <IconButton variant="ghost" size="sm" label={common.removeNamed(name)} className="row-grid__remove" onClick={onRemove}>
          <Icon name="x" size={16} />
        </IconButton>
      )}
    </Box>
  );
};

export { RowEnd };
