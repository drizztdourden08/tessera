/* @layer stories @kind component */
import { useState } from 'react';
import { TransientReadout } from '../../../src/composites';
import type { TransientReadoutProps } from '../../../src/composites';
import { Box, Button } from '../../../src/primitives';
import './TransientReadoutDemo.css';

const ZOOM_STEP = 25;

const TransientReadoutDemo = (props: Omit<TransientReadoutProps, 'value'>) => {
  const [zoom, setZoom] = useState(100);
  return (
    <Box className="readout-demo">
      <Box className="story-row">
        <Button size="sm" variant="secondary" onClick={() => setZoom(zoom - ZOOM_STEP)}>Zoom out</Button>
        <Button size="sm" variant="secondary" onClick={() => setZoom(zoom + ZOOM_STEP)}>Zoom in</Button>
      </Box>
      <TransientReadout {...props} value={`${zoom}%`} onActivate={() => setZoom(100)} title="Double click to reset" />
    </Box>
  );
};

export { TransientReadoutDemo };
