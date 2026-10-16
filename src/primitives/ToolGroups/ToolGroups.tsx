/* @layer renderer-components @kind component */
import { Fragment } from 'react';
import { Box } from '../Box';
import { DensityScope } from '../DensityScope';
import { Divider } from '../Divider';
import { ToolGroupItem } from './sub-components/ToolGroupItem';
import type { ToolGroupsProps } from './ToolGroups.type';
import './ToolGroups.css';

const ToolGroups = (props: ToolGroupsProps) => {
  const { groups, label, compact = false, className } = props;
  const rootClass = ['tool-groups', compact && 'tool-groups--compact', className].filter(Boolean).join(' ');
  const items = groups.map((group, index) => (
    <Fragment key={group.id}>
      {index > 0 && <Divider orientation="vertical" />}
      <ToolGroupItem group={group} compact={compact} />
    </Fragment>
  ));
  return (
    <Box role={label ? 'group' : undefined} aria-label={label} className={rootClass}>
      {compact ? <DensityScope density="compact">{items}</DensityScope> : items}
    </Box>
  );
};

export { ToolGroups };
