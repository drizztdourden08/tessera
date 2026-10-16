/* @layer stories @kind component */
import { Fragment } from 'react';
import { Box, Divider, Text } from '../../../../src/primitives';
import type { StudioGroupsProps } from '../StudioLayout.type';

const StudioGroups = (props: StudioGroupsProps) => {
  const { groups, className } = props;
  return (
    <Box className={className}>
      {groups.map((group, index) => (
        <Fragment key={group.id}>
          {index > 0 && <Divider orientation="vertical" />}
          <Box role="group" aria-label={group.label} className="studio-layout__group">
            <Text variant="overline" tone="muted">{group.label}</Text>
            <Box className="studio-layout__group-row">{group.content}</Box>
          </Box>
        </Fragment>
      ))}
    </Box>
  );
};

export { StudioGroups };
