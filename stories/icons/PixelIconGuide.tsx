/* @layer stories @kind component */
import { Box, Text } from '../../src/primitives';
import { PIXEL_ICON_RULES } from './pixel-icon-guide.constants';
import './icons.stories.css';

const PixelIconGuide = () => (
  <Box className="icon-gallery">
    {PIXEL_ICON_RULES.map((rule) => <Text key={rule}>{rule}</Text>)}
  </Box>
);

export { PixelIconGuide };
