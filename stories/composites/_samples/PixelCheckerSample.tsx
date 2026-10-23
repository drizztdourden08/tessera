/* @layer stories @kind component */
import { useEffect, useState } from 'react';
import { PixelViewport } from '../../../src/composites';
import { Stack, Text } from '../../../src/primitives';
import { SPRITE_SIZE } from './pixel-viewport-story.constants';
import { spriteImageData } from './sprite-image-data';

const PixelCheckerSample = () => {
  const [pixels, setPixels] = useState<ImageData | null>(null);
  useEffect(() => { setPixels(spriteImageData()); }, []);
  return (
    <Stack gap="sm" className="pixel-viewport-story">
      <PixelViewport label="Sprite with see-through pixels" width={SPRITE_SIZE} height={SPRITE_SIZE} source={pixels ?? undefined} gridFrom={4} className="pixel-viewport-story__view" />
      <Text as="span" variant="caption">The white of the cap is half see-through; the grid shows from 400%.</Text>
    </Stack>
  );
};

export { PixelCheckerSample };
