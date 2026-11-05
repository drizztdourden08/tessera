/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { AddGroupButton } from './sub-components/AddGroupButton';
import { GroupChip } from './sub-components/GroupChip';
import type { GroupBarProps } from './GroupBar.type';
import '../../theme/filter-bar.css';
import './GroupBar.css';

const GroupBar = (props: GroupBarProps) => {
  const { options, value, onChange, maxLevels, className } = props;
  const chosen = value.flatMap((id) => options.filter((option) => option.id === id));
  const free = options.filter((option) => !value.includes(option.id));
  const full = maxLevels !== undefined && value.length >= maxLevels;

  return (
    <Box className={className === undefined ? 'group-bar' : `group-bar ${className}`}>
      {chosen.map((option) => (
        <GroupChip key={option.id} option={option} onRemove={() => onChange(value.filter((id) => id !== option.id))} />
      ))}
      {!full && free.length > 0 && (
        <AddGroupButton options={free} hasChips={value.length > 0} onAdd={(id) => onChange([...value, id])} />
      )}
    </Box>
  );
};

export { GroupBar };
