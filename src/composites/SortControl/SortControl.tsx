/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { Icon } from '../../primitives/Icon';
import { IconButton } from '../../primitives/IconButton';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { DropdownMenu } from '../DropdownMenu';
import { choiceMenuItems } from '../GroupControl/behavior/choice-menu-items';
import type { SortControlProps } from './SortControl.type';
import '../../theme/view-controls.css';

const SortControl = (props: SortControlProps) => {
  const { options, value, onChange, label, className } = props;
  const { views } = useTesseraStrings();
  const current = options.find((option) => option.id === value.key);
  const trigger = current === undefined ? views.sort : views.sortedBy(current.label);
  const ascending = value.direction === 'asc';
  const switchLabel = ascending ? views.switchToDescending : views.switchToAscending;

  return (
    <Box className={`sort-control${className ? ` ${className}` : ''}`}>
      <DropdownMenu
        label={label ?? views.sortBy}
        trigger={{ label: trigger, icon: 'arrow-up-down' }}
        variant="tertiary"
        size="sm"
        groups={[{
          id: 'sort',
          label: label ?? views.sortBy,
          items: choiceMenuItems(options, value.key, views.none, (key) => onChange({ ...value, key })),
        }]}
      />
      <IconButton
        variant="tertiary"
        size="sm"
        label={switchLabel}
        title={ascending ? views.ascending : views.descending}
        onClick={() => onChange({ ...value, direction: ascending ? 'desc' : 'asc' })}
      >
        <Icon name={ascending ? 'arrow-up' : 'arrow-down'} />
      </IconButton>
    </Box>
  );
};

export { SortControl };
