/* @layer stories @kind component */
import { ListItemRow } from '../../../src/composites';
import { Box, Span } from '../../../src/primitives';
import { SESSIONS, STATUS_LABEL } from './sessions';

const LayerSample = () => (
  <Box className="screen-layer-story__body">
    <Span tone="muted">ScreenLayer draws the card and nothing inside it. A screen kind fills it.</Span>
    {SESSIONS.map((s) => <ListItemRow key={s.id} name={s.name} meta={`${STATUS_LABEL[s.status]}, ${s.players} players`} />)}
  </Box>
);

export { LayerSample };
