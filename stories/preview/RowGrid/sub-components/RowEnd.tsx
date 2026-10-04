/* @layer stories @kind component */
import { DropdownMenu } from '../../../../src/composites';
import type { MenuGroup } from '../../../../src/composites';
import { Box, Icon, IconButton } from '../../../../src/primitives';
import { ROW_GRID_STRINGS } from '../row-grid-strings.constants';
import type { RowEndProps } from '../RowGrid.type';

const menuGroups = ({ menu, index, total, onStep }: RowEndProps): MenuGroup[] => {
  const groups: MenuGroup[] = menu.length > 0 ? [{ id: 'row', items: menu }] : [];
  if (!onStep) return groups;
  return [...groups, {
    id: 'move',
    items: [
      { id: 'up', label: ROW_GRID_STRINGS.moveUp, icon: 'arrow-up', disabled: index === 0, onSelect: () => onStep(index - 1) },
      { id: 'down', label: ROW_GRID_STRINGS.moveDown, icon: 'arrow-down', disabled: index === total - 1, onSelect: () => onStep(index + 1) },
    ],
  }];
};

const RowEnd = (props: RowEndProps) => {
  const { name, onRemove } = props;
  const groups = menuGroups(props);
  return (
    <Box className="row-grid__end">
      {groups.length > 0 && (
        <DropdownMenu trigger={{ label: ROW_GRID_STRINGS.more(name), icon: 'ellipsis', iconOnly: true }} size="sm" variant="ghost" groups={groups} />
      )}
      {onRemove && (
        <IconButton variant="ghost" size="sm" label={ROW_GRID_STRINGS.remove(name)} className="row-grid__remove" onClick={onRemove}>
          <Icon name="x" size={16} />
        </IconButton>
      )}
    </Box>
  );
};

export { RowEnd };
