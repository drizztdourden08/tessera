/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { HintLine } from '../../../primitives/HintLine';
import { Text } from '../../../primitives/Text';
import { ToolGroups } from '../../../primitives/ToolGroups';
import type { StudioLayoutHeaderProps } from './StudioLayoutHeader.type';

const StudioLayoutHeader = ({ bar }: StudioLayoutHeaderProps) => {
  const { title, caption, status, groups, idleHint, notices, level = 1 } = bar;
  return (
    <Box as="header" surface="raised" className="studio-layout__bar">
      <Box className="studio-layout__head">
        <Box className="studio-layout__title">
          {caption !== undefined && <Text variant="overline" tone="muted">{caption}</Text>}
          <Text as={`h${level}`} variant="title">{title}</Text>
        </Box>
        {status !== undefined && <Box className="studio-layout__status">{status}</Box>}
      </Box>
      {groups && groups.length > 0 && <ToolGroups groups={groups} />}
      <HintLine idle={idleHint} lines={1} />
      {notices}
    </Box>
  );
};

export { StudioLayoutHeader };
