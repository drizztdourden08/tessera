/* @layer stories @kind component */
import { Box, HintLine, Text } from '../../../../src/primitives';
import type { StudioBarProps } from '../StudioLayout.type';
import { StudioGroups } from './StudioGroups';

const StudioBar = (props: StudioBarProps) => {
  const { caption, title, status, groups, idleHint } = props;
  return (
    <Box as="header" surface="raised" className="studio-layout__bar">
      <Box className="studio-layout__bar-head">
        <Box className="studio-layout__bar-title">
          <Text variant="overline" tone="muted">{caption}</Text>
          <Text as="h1" variant="title">{title}</Text>
        </Box>
        {status}
      </Box>
      <StudioGroups groups={groups} className="studio-layout__groups" />
      <HintLine idle={idleHint} lines={1} />
    </Box>
  );
};

export { StudioBar };
