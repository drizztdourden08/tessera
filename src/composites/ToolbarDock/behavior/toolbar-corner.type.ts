/* @layer renderer-components @kind types */
import type { ToolbarCorner, ToolbarCornerClaim, ToolbarLayout, ToolbarSide } from '../ToolbarDock.type';
import type { ToolbarEnd, ToolbarGrip, ToolbarMetrics } from './toolbar-resize.type';

interface ToolbarCornerCandidate {
  lane: number;
  thickness: number;
}

interface ToolbarCornerScene {
  layout: ToolbarLayout;
  corner: ToolbarCorner;
  axis: ToolbarCornerClaim;
  side: ToolbarSide;
  lane: number;
  end: ToolbarEnd;
  candidates: ToolbarCornerCandidate[];
}

interface ToolbarCornerRebuild {
  scene: ToolbarCornerScene;
  metrics: ToolbarMetrics;
  from: readonly ToolbarCornerClaim[];
  to: readonly ToolbarCornerClaim[];
  px: number;
}

interface ToolbarCornerSession {
  id: string;
  end: ToolbarEnd;
  origin: ToolbarLayout;
  metrics: ToolbarMetrics;
  result: ToolbarLayout;
  count: number;
}

interface ToolbarCornerStepInput {
  layout: ToolbarLayout;
  metrics: ToolbarMetrics;
  grip: ToolbarGrip;
  px: number;
  session: ToolbarCornerSession | null;
}

interface ToolbarCornerStep {
  layout: ToolbarLayout;
  count: number;
  origin: ToolbarLayout;
  metrics: ToolbarMetrics;
}

export type { ToolbarCornerCandidate, ToolbarCornerRebuild, ToolbarCornerScene, ToolbarCornerSession, ToolbarCornerStep, ToolbarCornerStepInput };
