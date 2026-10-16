/* @layer renderer-components @kind component */
import { useId } from 'react';
import { Box } from '../../Box';
import { Text } from '../../Text';
import type { ToolGroupItemProps } from './ToolGroupItem.type';

const ToolGroupItem = ({ group }: ToolGroupItemProps) => {
  const labelId = useId();
  return (
    <Box role="group" aria-labelledby={labelId} className="tool-groups__group">
      <Text id={labelId} variant="overline" tone="muted">{group.label}</Text>
      <Box className="tool-groups__row">{group.content}</Box>
    </Box>
  );
};

export { ToolGroupItem };
