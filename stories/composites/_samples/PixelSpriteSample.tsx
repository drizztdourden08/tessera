/* @layer stories @kind component */
import { useState } from 'react';
import { PixelViewport } from '../../../src/composites';
import type { PixelPoint, PixelWheel } from '../../../src/composites';
import { Stack, Text } from '../../../src/primitives';
import { paintSprite } from './paint-sprite';
import { SPRITE_SIZE } from './pixel-viewport-story.constants';

interface PixelSpriteSampleProps {
  grid?: boolean;
  gridFrom?: number;
  wheel?: PixelWheel;
}

const placeOf = (pixel: PixelPoint | null): string => (pixel ? `Pixel ${pixel.x}, ${pixel.y}` : 'Outside the sprite');

const PixelSpriteSample = ({ grid = true, gridFrom, wheel }: PixelSpriteSampleProps) => {
  const [pixel, setPixel] = useState<PixelPoint | null>(null);
  return (
    <Stack gap="sm" className="pixel-viewport-story">
      <PixelViewport
        label="Mushroom sprite"
        width={SPRITE_SIZE}
        height={SPRITE_SIZE}
        draw={paintSprite}
        grid={grid}
        gridFrom={gridFrom}
        wheel={wheel}
        onPointerPixel={setPixel}
        className="pixel-viewport-story__view"
      />
      <Text as="span" variant="caption" className="pixel-viewport-story__readout">{placeOf(pixel)}</Text>
    </Stack>
  );
};

export { PixelSpriteSample };
