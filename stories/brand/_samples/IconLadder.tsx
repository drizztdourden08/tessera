/* @layer stories @kind component */
import { Box, Image, Stack, Text } from '../../../src/primitives';
import { ICON_SIZES } from '../../../src/brand';
import type { IconArtFiles } from '../../../src/brand';
import { BRAND_FOLDER, ICON_URLS } from './icon-urls.constants';
import { ICO_COLUMN, ICO_SHOWN_AT } from './IconLadder.constants';
import type { IconLadderProps } from './IconLadder.type';
import './IconLadder.css';

const icoLine = (files: IconArtFiles): string => (files.ico
  ? `brand/${files.ico}: ${ICON_SIZES.ico.join(', ')}`
  : 'No .ico for this art');

const ladderLine = (files: IconArtFiles): string => {
  const { ladder } = ICON_SIZES;
  return `brand/${files.ladder(ladder[0] ?? 0)} to ${files.ladder(ladder[ladder.length - 1] ?? 0).split('/').pop() ?? ''}`;
};

const columnsOf = (files: IconArtFiles): string[] => [...ICON_SIZES.ladder.map(String), ...(files.ico ? [ICO_COLUMN] : [])];

const fileCell = (files: IconArtFiles, column: string) => {
  const ico = column === ICO_COLUMN;
  const path = ico ? files.ico : files.ladder(Number(column));
  const size = ico ? ICO_SHOWN_AT : Number(column);
  return <Image className="icon-ladder__png" src={ICON_URLS[`${BRAND_FOLDER}${path ?? ''}`]} width={size} height={size} alt="" placeholder="none" />;
};

const IconLadder = (props: IconLadderProps) => {
  const { files } = props;
  return (
    <Stack gap="sm" className="icon-ladder">
      <Box className="icon-ladder__row">
        {columnsOf(files).map((column) => (
          <Box key={column} className="icon-ladder__file">
            {fileCell(files, column)}
            <Text className="icon-ladder__size">{column}</Text>
          </Box>
        ))}
      </Box>
      <Text variant="caption">{ladderLine(files)}</Text>
      <Text variant="caption">{icoLine(files)}</Text>
    </Stack>
  );
};

export { IconLadder };
