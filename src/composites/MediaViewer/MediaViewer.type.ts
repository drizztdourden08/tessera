/* @layer renderer-components @kind types */
import type { PointerEventHandler, RefObject } from 'react';

type MediaViewerKind = 'image' | 'video';

type MediaViewerZoom = 'fit' | number;

type MediaViewerPixels = boolean | 'auto';

interface MediaViewerItem {
  id: string;
  kind: MediaViewerKind;
  src: string;
  name: string;
  poster?: string;
}

interface MediaViewerProps {
  open: boolean;
  items: readonly MediaViewerItem[];
  index?: number;
  defaultIndex?: number;
  onIndexChange?: (index: number) => void;
  startAt?: number;
  pixelated?: MediaViewerPixels;
  onClose: () => void;
  className?: string;
}

interface NaturalSize {
  width: number;
  height: number;
}

interface StageCentre {
  x: number;
  y: number;
}

interface ZoomState {
  zoom: MediaViewerZoom;
  scale: number | null;
  zoomIn: () => void;
  zoomOut: () => void;
  toggle: () => void;
  fit: () => void;
  canIn: boolean;
  canOut: boolean;
}

interface PanStart {
  x: number;
  y: number;
  left: number;
  top: number;
}

interface PanHandlers {
  onPointerDown: PointerEventHandler<HTMLElement>;
  onPointerMove: PointerEventHandler<HTMLElement>;
  onPointerUp: PointerEventHandler<HTMLElement>;
  onPointerCancel: PointerEventHandler<HTMLElement>;
}

interface ViewerMediaParams {
  open: boolean;
  items: readonly MediaViewerItem[];
  index?: number;
  defaultIndex: number;
  onIndexChange?: (index: number) => void;
}

interface ViewerMedia {
  stageRef: RefObject<HTMLElement | null>;
  current: number;
  item: MediaViewerItem | undefined;
  natural: NaturalSize | null;
  zoom: ZoomState;
  step: (by: number) => void;
  measure: (size: NaturalSize) => void;
}

interface MediaViewerZoomProps {
  state: ZoomState;
}

interface MediaViewerStageProps {
  item: MediaViewerItem;
  zoom: ZoomState;
  startAt: number;
  pixelated: MediaViewerPixels;
  natural: NaturalSize | null;
  onNatural: (size: NaturalSize) => void;
  stageRef: RefObject<HTMLElement | null>;
}

interface MediaViewerStepProps {
  onStep: (by: number) => void;
}

interface MediaViewerToolsProps {
  at: number;
  count: number;
  zoom: ZoomState | null;
}

export type {
  MediaViewerItem, MediaViewerKind, MediaViewerPixels, MediaViewerProps, MediaViewerStageProps, MediaViewerStepProps, MediaViewerToolsProps,
  MediaViewerZoom, MediaViewerZoomProps, NaturalSize, PanHandlers, PanStart, StageCentre, ViewerMedia, ViewerMediaParams, ZoomState,
};
