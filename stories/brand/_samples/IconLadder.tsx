/* @layer stories @kind component */
import { Box, Flex, Image, Stack, Text } from '../../../src/primitives';
import { ICON_SIZES } from '../../../src/brand';
import type { IconArtFiles } from '../../../src/brand';
import { BRAND_FOLDER, ICON_PNGS } from './icon-pngs.constants';
import './IconLadder.css';

interface IconLadderProps {
  files: IconArtFiles;
}

const icoLine = (files: IconArtFiles): string => (files.ico
  ? `brand/${files.ico}: ${ICON_SIZES.ico.join(', ')}`
  : 'No .ico: only an app has one');

const ladderLine = (files: IconArtFiles): string => {
  const { ladder } = ICON_SIZES;
  return `brand/${files.ladder(ladder[0] ?? 0)} to ${files.ladder(ladder[ladder.length - 1] ?? 0).split('/').pop() ?? ''}`;
};

const IconLadder = (props: IconLadderProps) => {
  const { files } = props;
  return (
    <Stack gap="sm">
      <Flex gap="md" align="end" wrap>
        {ICON_SIZES.ladder.map((size) => (
          <Box key={size} className="icon-ladder__rung">
            <Image className="icon-ladder__png" src={ICON_PNGS[`${BRAND_FOLDER}${files.ladder(size)}`]} width={size} height={size} alt="" placeholder="none" />
            <Text className="story-label">{size}</Text>
          </Box>
        ))}
      </Flex>
      <Text variant="caption">{ladderLine(files)}</Text>
      <Text variant="caption">{icoLine(files)}</Text>
    </Stack>
  );
};

export { IconLadder };
