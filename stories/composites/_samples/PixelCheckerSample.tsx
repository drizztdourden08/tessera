/* @layer stories @kind component */
import { useState } from 'react';
import { PixelViewport } from '../../../src/composites';
import { Stack, Text } from '../../../src/primitives';
import { spriteImageData } from './sprite-image-data';

const PixelCheckerSample = () => {
  const [pixels] = useState(spriteImageData);
  return (
    <Stack gap="sm" className="pixel-viewport-story">
      <PixelViewport label="Sprite with see-through pixels" width={pixels.width} height={pixels.height} source={pixels} gridFrom={4} className="pixel-viewport-story__view" />
      <Text as="span" variant="caption">The white of the cap is half see-through; the grid shows from 400%.</Text>
    </Stack>
  );
};

export { PixelCheckerSample };
