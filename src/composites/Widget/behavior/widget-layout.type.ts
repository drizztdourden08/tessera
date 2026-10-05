/* @layer renderer-components @kind types */
import type { LayoutEdit, SplitNode, WidgetId } from '../../DockLayout';
import type { SnapSide, WidgetDefinition, WidgetVisibility } from '../Widget.type';

type WidgetContextActive<D extends WidgetDefinition = WidgetDefinition> = boolean | ((definition: D) => boolean);

interface WidgetGates<D extends WidgetDefinition = WidgetDefinition> {
  definitions: readonly D[];
  contextActive: WidgetContextActive<D>;
  pageOpen: boolean;
  developerToolsEnabled: boolean;
  forcedIds: readonly WidgetId[];
  contentIds: readonly WidgetId[];
}

interface ResolvedSplit {
  node: SplitNode;
  index: number;
}

interface FlatWidgetState {
  id: string;
  mode: 'docked' | 'floating';
  side: SnapSide;
  order: number;
  opacity: number;
  visibility: WidgetVisibility;
  visible: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  dockedSize: number;
  exclusive: boolean;
}

type SplitEdit = Extract<LayoutEdit, { type: 'resize' | 'even' }>;

interface FlatWidgetLayout {
  widgets: FlatWidgetState[];
}

interface DockPlace {
  makeRoom?: boolean;
  size?: number;
}

export type { DockPlace, FlatWidgetLayout, FlatWidgetState, ResolvedSplit, SplitEdit, WidgetContextActive, WidgetGates };
