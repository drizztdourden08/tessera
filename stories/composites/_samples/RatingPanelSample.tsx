/* @layer stories @kind component */
import { useState } from 'react';
import { Box, Button, Card, Flex, ProgressBar, Stack, Text } from '../../../src/primitives';
import { Rating } from '../../../src/composites';
import { RATING_PANEL } from './rating-story.constants';

const RatingPanelSample = () => {
  const [mine, setMine] = useState<number | null>(4);
  const top = Math.max(...RATING_PANEL.counts);
  return (
    <Card title={RATING_PANEL.title} className="rating-story__panel">
      <Stack gap="md" align="stretch">
        <Flex align="center" gap="lg" wrap>
          <Stack gap="xs" align="center">
            <Text as="span" className="rating-story__average">{RATING_PANEL.average.toFixed(1)}</Text>
            <Rating value={RATING_PANEL.average} size="lg" />
            <Text as="span" variant="caption">{RATING_PANEL.countLine}</Text>
          </Stack>
          <Stack gap="xs" align="stretch" className="rating-story__bars">
            {RATING_PANEL.counts.map((count, i) => (
              <Flex key={RATING_PANEL.rows[i]} align="center" gap="sm">
                <Text as="span" variant="caption">{RATING_PANEL.rows[i]}</Text>
                <Box className="rating-story__bar"><ProgressBar value={count} max={top} label={RATING_PANEL.barLabel(5 - i, count)} /></Box>
                <Text as="span" variant="caption">{count}</Text>
              </Flex>
            ))}
          </Stack>
        </Flex>
        <Text as="span" variant="label">{RATING_PANEL.mine}</Text>
        <Flex align="center" gap="md" wrap>
          <Rating value={mine} size="lg" onChange={setMine} />
          {mine !== null && <Button variant="ghost" size="sm" onClick={() => setMine(null)}>{RATING_PANEL.remove}</Button>}
        </Flex>
      </Stack>
    </Card>
  );
};

export { RatingPanelSample };
