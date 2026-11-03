/* @layer stories @kind component */
import { useState } from 'react';
import { Navigator } from '../../../src/composites';
import type { NavigatorOverlay, NavigatorStep, NavigatorViewport } from '../../../src/composites';
import { Box, Image, Text } from '../../../src/primitives';
import { DUSK_URI } from '../../primitives/_samples/image-scenes.constants';
import './NavigatorDemo.css';

const SURFACE = { width: 800, height: 500 };

const MARKS: readonly NavigatorOverlay[] = [
  { id: 'sprite', rect: { x: 80, y: 60, width: 160, height: 100 }, kind: 'selection', label: 'Sprite', interactive: true },
  { id: 'room', rect: { x: 400, y: 250, width: 240, height: 160 }, kind: 'region', label: 'Room' },
];

type NavigatorDemoProps = {
  zoom?: number;
  step?: NavigatorStep;
  bigStep?: NavigatorStep;
  unclamped?: boolean;
  label?: string;
  marked?: boolean;
};

const NavigatorDemo = ({ zoom = 4, step, bigStep, unclamped, label, marked = false }: NavigatorDemoProps) => {
  const size = { width: SURFACE.width / zoom, height: SURFACE.height / zoom };
  const [view, setView] = useState<NavigatorViewport>({ x: 200, y: 120, ...size });
  const shown = { ...view, ...size };
  const [pressed, setPressed] = useState('none');
  return (
    <Box className="story-row navigator-demo">
      <Navigator surface={SURFACE} viewport={shown} onViewportChange={setView}
        step={step}
        bigStep={bigStep}
        unclamped={unclamped}
        label={label}
        overlays={marked ? MARKS : undefined}
        onOverlayPress={marked ? setPressed : undefined}
        onWheelZoom={marked ? (direction) => setPressed(direction === 1 ? 'zoom in' : 'zoom out') : undefined}
        caption={marked ? `Last press: ${pressed}` : undefined}
        describe={marked ? 'The sprite is marked near the top left and the room near the middle.' : undefined}
      >
        <Image src={DUSK_URI} alt="" fit="fill" />
      </Navigator>
      <Text className="story-label">{`Frame at ${String(Math.round(shown.x))}, ${String(Math.round(shown.y))} of ${String(SURFACE.width)} by ${String(SURFACE.height)}`}</Text>
    </Box>
  );
};

export { NavigatorDemo };
