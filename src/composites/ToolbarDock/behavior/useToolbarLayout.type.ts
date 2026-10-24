/* @layer renderer-components @kind types */
import type { ToolbarDefinition, ToolbarLayout, ToolbarSide } from '../ToolbarDock.type';

interface UseToolbarLayoutParams {
  value: ToolbarLayout;
  onChange: (layout: ToolbarLayout) => void;
  definitions: readonly ToolbarDefinition[];
}

interface ToolbarLayoutApi {
  layout: ToolbarLayout;
  move: (id: string, side: ToolbarSide, index: number) => void;
  show: (id: string) => void;
  hide: (id: string) => void;
  toggle: (id: string) => void;
  isShown: (id: string) => boolean;
  canShow: (id: string) => boolean;
  reset: () => void;
}

export type { ToolbarLayoutApi, UseToolbarLayoutParams };
