/* @layer stories @kind component */
import { DisabledOverlay, ListItemRow } from '../../../src/composites';
import { Box, ScrollArea, Text } from '../../../src/primitives';
import { PLAYERS } from './sessions';

const ROUNDS = [1, 2, 3, 4, 5];

const SeatRows = () => (
  <Box className="disabled-overlay-story__block">
    {ROUNDS.flatMap((round) => PLAYERS.map((p) => (
      <ListItemRow key={`${round}-${p.slot}`} name={p.name} meta={`Round ${round} · ${p.game}`} />
    )))}
  </Box>
);

const MESSAGE = 'Seats open once the host starts the next round.';

const OverlayTopDemo = () => (
  <Box className="disabled-overlay-story__pair">
    <Box className="story-column">
      <Text className="story-label">A pane that scrolls</Text>
      <Box className="disabled-overlay-story__scroller" data-overlay-demo="pane">
        <DisabledOverlay active contained placement="top" tone="warning" message={MESSAGE}>
          <SeatRows />
        </DisabledOverlay>
      </Box>
    </Box>
    <Box className="story-column">
      <Text className="story-label">A body that scrolls inside</Text>
      <DisabledOverlay active contained placement="top" tone="warning" message={MESSAGE} className="disabled-overlay-story__body">
        <ScrollArea axis="y" scrollbar="slim" fade={false}>
          <SeatRows />
        </ScrollArea>
      </DisabledOverlay>
    </Box>
  </Box>
);

export { OverlayTopDemo };
