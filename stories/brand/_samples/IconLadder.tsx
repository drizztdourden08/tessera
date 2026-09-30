/* @layer stories @kind component */
import { Image, Stack, Text } from '../../../src/primitives';
import { ICON_SIZES } from '../../../src/brand';
import type { IconArtFiles } from '../../../src/brand';
import { BRAND_FOLDER, ICON_PNGS } from './icon-pngs.constants';
import { axis } from '../../_template/axis';
import { Demonstrator } from '../../_template/Demonstrator';
import { ICON_LADDER_ROW_MAX } from './IconLadder.constants';
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

const ladderRows = (): number[][] => [
  ICON_SIZES.ladder.filter((size) => size <= ICON_LADDER_ROW_MAX),
  ICON_SIZES.ladder.filter((size) => size > ICON_LADDER_ROW_MAX),
].filter((sizes) => sizes.length > 0);

const IconLadder = (props: IconLadderProps) => {
  const { files } = props;
  return (
    <Stack gap="sm">
      {ladderRows().map((sizes) => (
        <Demonstrator
          key={sizes.join('-')}
          columns={axis(sizes.map(String))}
          valign="end"
          cell={(_row, size) => (
            <Image className="icon-ladder__png" src={ICON_PNGS[`${BRAND_FOLDER}${files.ladder(Number(size))}`]} width={Number(size)} height={Number(size)} alt="" placeholder="none" />
          )}
        />
      ))}
      <Text variant="caption">{ladderLine(files)}</Text>
      <Text variant="caption">{icoLine(files)}</Text>
    </Stack>
  );
};

export { IconLadder };
