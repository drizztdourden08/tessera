/* @layer stories @kind component */
import { useState } from 'react';
import { MASCOT_CLIP_GROUPS } from '../../../src/brand';
import { MascotStage } from '../MascotStage';
import type { MascotClipGroupId } from '../../../src/brand';
import { Box, Flex, Grid, SegmentedControl, Stack, Text } from '../../../src/primitives';
import { BRAND_OF, MASCOT_OPTIONS } from './stage-mascots.constants';
import type { MascotKey } from './stage-mascots.constants';

const StageFlips = () => {
  const [who, setWho] = useState<MascotKey>('sentri');
  const [group, setGroup] = useState<MascotClipGroupId>('motion');
  const clips = MASCOT_CLIP_GROUPS.find((g) => g.id === group)?.clips ?? [];
  return (
    <Stack gap="md">
      <Flex gap="sm" align="center" wrap>
        <SegmentedControl aria-label="Mascot" size="sm" value={who} options={MASCOT_OPTIONS} onChange={setWho} />
        <SegmentedControl aria-label="Clip group" size="sm" value={group} options={MASCOT_CLIP_GROUPS.map((g) => ({ value: g.id, label: g.label }))} onChange={setGroup} />
      </Flex>
      <Grid columns={3} gap="md">
        {clips.map((clip) => (
          <Stack key={`${who}-${clip}`} gap="xs" align="center">
            <Box className="stage-lab__frame stage-lab__frame--plain">
              <MascotStage
                cast={[{ id: 'right', brand: BRAND_OF[who], x: 70, face: 'right', rest: clip }, { id: 'left', brand: BRAND_OF[who], x: 210, face: 'left', rest: clip }]}
                height={110}
                label={`${clip}, facing right and facing left`}
              />
            </Box>
            <Text variant="caption">{`${clip}: facing right, then left`}</Text>
          </Stack>
        ))}
      </Grid>
    </Stack>
  );
};

export { StageFlips };
