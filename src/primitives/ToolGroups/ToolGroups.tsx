/* @layer renderer-components @kind component */
import { Fragment } from 'react';
import { Box } from '../Box';
import { Divider } from '../Divider';
import { ToolGroupItem } from './sub-components/ToolGroupItem';
import type { ToolGroupsProps } from './ToolGroups.type';
import './ToolGroups.css';

const ToolGroups = (props: ToolGroupsProps) => {
  const { groups, label, className } = props;
  return (
    <Box role={label ? 'group' : undefined} aria-label={label} className={className ? `tool-groups ${className}` : 'tool-groups'}>
      {groups.map((group, index) => (
        <Fragment key={group.id}>
          {index > 0 && <Divider orientation="vertical" />}
          <ToolGroupItem group={group} />
        </Fragment>
      ))}
    </Box>
  );
};

export { ToolGroups };
