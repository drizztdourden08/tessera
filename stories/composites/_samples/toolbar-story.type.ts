/* @layer stories @kind types */
import type { ToolbarOrientation } from '../../../src/composites';

type ToolId = 'pencil' | 'eraser' | 'bucket' | 'pipette' | 'hand';

type ToolbarArgs = {
  orientation: ToolbarOrientation;
  handle: boolean;
  size: 'xs' | 'sm' | 'md';
  extent: string;
};

interface ToolbarDemoProps {
  orientation?: ToolbarOrientation;
  handle?: boolean;
  size?: 'xs' | 'sm' | 'md';
  extent?: string;
  captions?: boolean;
  readout?: boolean;
  pixel?: boolean;
}

export type { ToolbarArgs, ToolbarDemoProps, ToolId };
