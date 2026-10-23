/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { CONTROLLER_SILHOUETTE_ANCHOR_IDS, CONTROLLER_SILHOUETTE_VARIANTS } from './ControllerSilhouette.constants';

type ControllerSilhouetteVariant = (typeof CONTROLLER_SILHOUETTE_VARIANTS)[number];

type ControllerSilhouetteAnchorId = (typeof CONTROLLER_SILHOUETTE_ANCHOR_IDS)[number];

interface ControllerSilhouetteAnchor {
  readonly x: number;
  readonly y: number;
  readonly r?: number;
}

type ControllerSilhouetteAnchorSet = Readonly<Partial<Record<ControllerSilhouetteAnchorId, ControllerSilhouetteAnchor>>>;

type ControllerSilhouetteAnchors = Readonly<Record<ControllerSilhouetteVariant, ControllerSilhouetteAnchorSet>>;

interface ControllerSilhouetteProps {
  variant: ControllerSilhouetteVariant;
  label?: string;
  className?: string;
  children?: ReactNode;
}

type Point = readonly [x: number, y: number];

type Cubic = readonly [c1x: number, c1y: number, c2x: number, c2y: number, x: number, y: number];

interface Outline {
  readonly start: Point;
  readonly curves: readonly Cubic[];
}

interface ArcSpec {
  readonly cx: number;
  readonly cy: number;
  readonly r: number;
  readonly from: number;
  readonly to: number;
}

interface BandSpec {
  readonly cx: number;
  readonly cy: number;
  readonly outer: number;
  readonly inner: number;
  readonly from: number;
  readonly to: number;
}

type SilhouettePartKind = 'trigger' | 'shoulder';

interface ShapePart {
  readonly kind: SilhouettePartKind;
  readonly outline: Outline;
}

interface SilhouetteShape {
  readonly half: Outline;
  readonly parts: readonly ShapePart[];
}

interface SilhouettePart {
  readonly kind: SilhouettePartKind;
  readonly d: string;
}

interface SilhouetteDrawing {
  readonly body: string;
  readonly parts: readonly SilhouettePart[];
}

type SilhouetteWellKind = 'stick' | 'dish' | 'button' | 'pill' | 'square';

interface SilhouetteWell {
  readonly id: ControllerSilhouetteAnchorId;
  readonly kind: SilhouetteWellKind;
  readonly x: number;
  readonly y: number;
  readonly r: number;
}

type SilhouetteTone = 'lift' | 'clear' | 'dusk' | 'shade' | 'deep' | 'recess' | 'glint';

interface SilhouetteStop {
  readonly offset: number;
  readonly tone: SilhouetteTone;
}

interface SilhouetteGradient {
  readonly key: SilhouettePaint;
  readonly stops: readonly SilhouetteStop[];
}

type SilhouettePaint = 'sheen' | 'bevel' | 'well' | 'dish' | 'rim';

type SilhouetteIds = Readonly<Record<SilhouettePaint | 'clip', string>>;

interface SilhouetteArtProps {
  drawing: SilhouetteDrawing;
  ids: SilhouetteIds;
}

interface SilhouetteGradientsProps {
  ids: SilhouetteIds;
}

interface SilhouetteWellsProps {
  wells: readonly SilhouetteWell[];
  ids: SilhouetteIds;
}

interface SilhouetteWellProps {
  well: SilhouetteWell;
  ids: SilhouetteIds;
}

export type {
  ArcSpec, BandSpec, ControllerSilhouetteAnchor, ControllerSilhouetteAnchorId, ControllerSilhouetteAnchors, ControllerSilhouetteAnchorSet,
  ControllerSilhouetteProps, ControllerSilhouetteVariant, Cubic, Outline, Point, ShapePart, SilhouetteArtProps, SilhouetteDrawing,
  SilhouetteGradient, SilhouetteGradientsProps, SilhouetteIds, SilhouettePaint, SilhouettePart, SilhouettePartKind, SilhouetteShape,
  SilhouetteStop, SilhouetteTone, SilhouetteWell, SilhouetteWellKind, SilhouetteWellProps, SilhouetteWellsProps,
};
