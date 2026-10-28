/* @layer stories @kind component */
import { useState } from 'react';
import { Navigator } from '../../../src/composites';
import type { NavigatorViewport } from '../../../src/composites';
import { Box, Image, Text } from '../../../src/primitives';
import { DUSK_URI } from '../../primitives/_samples/image-scenes.constants';
import './NavigatorDemo.css';

const SURFACE = { width: 800, height: 500 };

type NavigatorDemoProps = {
  zoom?: number;
  step?: number;
  label?: string;
};

const NavigatorDemo = ({ zoom = 4, step, label }: NavigatorDemoProps) => {
  const size = { width: SURFACE.width / zoom, height: SURFACE.height / zoom };
  const [view, setView] = useState<NavigatorViewport>({ x: 200, y: 120, ...size });
  const shown = { ...view, ...size };
  return (
    <Box className="story-row navigator-demo">
      <Navigator surface={SURFACE} viewport={shown} onViewportChange={setView} step={step} label={label}>
        <Image src={DUSK_URI} alt="" fit="fill" />
      </Navigator>
      <Text className="story-label">{`Frame at ${String(Math.round(shown.x))}, ${String(Math.round(shown.y))} of ${String(SURFACE.width)} by ${String(SURFACE.height)}`}</Text>
    </Box>
  );
};

export { NavigatorDemo };
