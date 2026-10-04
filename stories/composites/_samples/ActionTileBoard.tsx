/* @layer stories @kind component */
import { useMemo, useState } from 'react';
import { ActionTile } from '../../../src/composites';
import { Box, Stack, Text } from '../../../src/primitives';
import { actionTileSamples } from './action-tile-samples';
import type { ActionTileBoardProps } from './ActionTileBoard.type';

const ActionTileBoard = (props: ActionTileBoardProps) => {
  const { set } = props;
  const [said, setSaid] = useState('Press a button on a tile.');
  const tiles = useMemo(() => actionTileSamples(setSaid)[set], [set]);
  return (
    <Stack gap="sm" className="action-tile-story">
      <Box className="action-tile-story__grid">
        {tiles.map((tile) => <ActionTile key={String(tile.label)} {...tile} />)}
      </Box>
      <Text variant="caption" role="status">{said}</Text>
    </Stack>
  );
};

export { ActionTileBoard };
