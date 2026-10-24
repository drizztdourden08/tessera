/* @layer stories @kind types */
import type { ToolbarShape, ToolbarOpenOn, ToolbarOrientation } from '../../../src/composites';

type ToolId = 'pencil' | 'eraser' | 'bucket' | 'pipette' | 'hand';

type ToolbarArgs = {
  orientation: ToolbarOrientation;
  handle: boolean;
  size: 'xs' | 'sm' | 'md';
  extent: string;
  layout: ToolbarShape;
  openOn: ToolbarOpenOn;
};

interface ToolbarDemoProps {
  orientation?: ToolbarOrientation;
  handle?: boolean;
  size?: 'xs' | 'sm' | 'md';
  extent?: string;
  captions?: boolean;
  readout?: boolean;
  pixel?: boolean;
  bitmap?: boolean;
  layout?: ToolbarShape;
  openOn?: ToolbarOpenOn;
}

interface DrawingToolOptions {
  captions?: boolean;
  pixel?: boolean;
  bitmap?: boolean;
  openOn?: ToolbarOpenOn;
}

export type { DrawingToolOptions, ToolbarArgs, ToolbarDemoProps, ToolId };
