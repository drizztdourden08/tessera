/* @layer stories @kind component */
import { Box, Flex, PixelThumbnail } from '../../../src/primitives';
import { HEART_INDEXED } from './pixel-samples.constants';
import './PixelThumbnailFluid.css';

const PixelThumbnailFluid = () => (
  <Flex gap="md" align="start">
    <PixelThumbnail indexed={HEART_INDEXED} box={128} label="A heart at 128 pixels" />
    <Box className="pixel-thumbnail-demo__panel">
      <PixelThumbnail indexed={HEART_INDEXED} box="fluid" label="A heart filling its panel" />
    </Box>
  </Flex>
);

export { PixelThumbnailFluid };
