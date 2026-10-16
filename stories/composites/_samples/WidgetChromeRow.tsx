/* @layer stories @kind component */
import type { ComponentProps } from 'react';
import type { WidgetChrome } from '../../../src/composites';
import { Box, Text } from '../../../src/primitives';
import { WidgetFrameDemo } from './WidgetFrameDemo';

const CHROMES: readonly WidgetChrome[] = ['full', 'compact', 'none'];

const CAPTIONS: Readonly<Record<WidgetChrome, string>> = {
  full: "chrome 'full', the default",
  compact: "chrome 'compact', a 20 px strip",
  none: "chrome 'none': point at it or tab in",
};

const WidgetChromeRow = (props: ComponentProps<typeof WidgetFrameDemo>) => (
  <Box className="widget-story__chromes">
    {CHROMES.map((chrome) => (
      <Box key={chrome} className="widget-story__chrome-cell" data-chrome={chrome}>
        <Text className="story-label">{CAPTIONS[chrome]}</Text>
        <WidgetFrameDemo {...props} chrome={chrome} />
      </Box>
    ))}
  </Box>
);

export { WidgetChromeRow };
