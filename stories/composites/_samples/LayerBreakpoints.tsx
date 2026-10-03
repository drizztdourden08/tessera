/* @layer stories @kind component */
import { FloatingSwitch, ScreenLayer } from '../../../src/composites';
import { Box, Span, Text } from '../../../src/primitives';
import { LAYER_BREAKPOINTS } from './layer-breakpoints';
import { LayerSample } from './LayerSample';
import { LAYER_WINDOWS } from './layer-windows';

const LayerBreakpoints = () => (
  <Box className="screen-layer-story__tiers">
    {LAYER_BREAKPOINTS.map((tier) => (
      <Box key={tier.id} className="screen-layer-story__tier">
        <Text className="story-label">{`${tier.name}, ${tier.size}`}</Text>
        <Box className={`screen-layer-story__shrink screen-layer-story__shrink--${tier.id}`}>
          <Box className={`screen-layer-story__real screen-layer-story__real--${tier.id}`}>
            <ScreenLayer
              label="Sessions"
              floating={<FloatingSwitch items={LAYER_WINDOWS} activeId="sessions" onSelect={() => undefined} label="Switch window" />}
            >
              <LayerSample />
            </ScreenLayer>
          </Box>
        </Box>
        <Span tone="muted">{tier.rule}</Span>
      </Box>
    ))}
  </Box>
);

export { LayerBreakpoints };
