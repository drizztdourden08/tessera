/* @layer stories @kind component */
import { FloatingSwitch, FullScreenLayer, ListItemRow } from '../../../src/composites';
import { Box, Span, Text } from '../../../src/primitives';
import { LAYER_BREAKPOINTS } from './layer-breakpoints';
import { LAYER_WINDOWS } from './layer-windows';
import { SESSIONS, STATUS_LABEL } from './sessions';

const LayerBreakpoints = () => (
  <Box className="full-screen-layer-story__tiers">
    {LAYER_BREAKPOINTS.map((tier) => (
      <Box key={tier.id} className="full-screen-layer-story__tier">
        <Text className="story-label">{`${tier.name}, ${tier.size}`}</Text>
        <Box className={`full-screen-layer-story__shrink full-screen-layer-story__shrink--${tier.id}`}>
          <Box className={`full-screen-layer-story__real full-screen-layer-story__real--${tier.id}`}>
            <FullScreenLayer
              title="Sessions"
              onClose={() => undefined}
              floating={<FloatingSwitch items={LAYER_WINDOWS} activeId="sessions" onSelect={() => undefined} label="Switch window" />}
            >
              <Box className="full-screen-layer-story__body">
                {SESSIONS.map((s) => <ListItemRow key={s.id} name={s.name} meta={`${STATUS_LABEL[s.status]}, ${s.players} players`} />)}
              </Box>
            </FullScreenLayer>
          </Box>
        </Box>
        <Span tone="muted">{tier.rule}</Span>
      </Box>
    ))}
  </Box>
);

export { LayerBreakpoints };
