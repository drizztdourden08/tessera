/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { Span } from '../../../primitives/text-elements';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { GroupChipProps } from './GroupChip.type';

const GroupChip = (props: GroupChipProps) => {
  const { option, onRemove } = props;
  const { filters } = useTesseraStrings();

  return (
    <Box role="group" aria-label={option.label} className="filter-chip">
      <Span className="filter-chip__field group-bar__field">{option.label}</Span>
      <IconButton
        variant="ghost"
        size="sm"
        className="filter-chip__segment filter-chip__remove"
        label={filters.removeGroupNamed(option.label)}
        onClick={onRemove}
      >
        <Icon name="x" />
      </IconButton>
    </Box>
  );
};

export { GroupChip };
