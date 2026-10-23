/* @layer stories @kind component */
import { useRef, useState } from 'react';
import { PixelViewport } from '../../../src/composites';
import type { PixelViewportHandle } from '../../../src/composites';
import { Button, Flex, Stack, Text } from '../../../src/primitives';
import { paintSprite } from './paint-sprite';
import { SPRITE_SIZE } from './pixel-viewport-story.constants';

const PixelControlledSample = () => {
  const viewport = useRef<PixelViewportHandle>(null);
  const [zoom, setZoom] = useState(4);
  return (
    <Stack gap="sm" className="pixel-viewport-story">
      <Flex align="center" gap="sm">
        <Button size="sm" variant="secondary" onClick={() => viewport.current?.zoomOut()}>Zoom out</Button>
        <Button size="sm" variant="secondary" onClick={() => viewport.current?.zoomIn()}>Zoom in</Button>
        <Button size="sm" variant="ghost" onClick={() => viewport.current?.fit()}>Fit</Button>
        <Button size="sm" variant="ghost" onClick={() => setZoom(1)}>100%</Button>
        <Text as="span" variant="caption" className="pixel-viewport-story__readout">{`Zoom ${Math.round(zoom * 100)}%`}</Text>
      </Flex>
      <PixelViewport
        ref={viewport}
        label="Mushroom sprite, zoom held by the page"
        width={SPRITE_SIZE}
        height={SPRITE_SIZE}
        draw={paintSprite}
        zoom={zoom}
        onZoomChange={setZoom}
        className="pixel-viewport-story__view"
      />
    </Stack>
  );
};

export { PixelControlledSample };
