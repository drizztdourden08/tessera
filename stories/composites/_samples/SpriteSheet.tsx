/* @layer stories @kind component */
import { Box } from '../../../src/primitives';
import { FRAMES } from './studio-sample.constants';

const SpriteSheet = () => (
  <Box className="studio-demo__sheet" aria-label={`${FRAMES} frames`}>
    {Array.from({ length: FRAMES }, (_, index) => <Box key={index} className="studio-demo__frame" />)}
  </Box>
);

export { SpriteSheet };
