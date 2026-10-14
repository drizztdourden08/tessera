/* @layer stories @kind types */
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
}

interface NaturalSize {
  width: number;
  height: number;
}

interface ZoomState {
  zoom: MediaViewerZoom;
  zoomIn: () => void;
  zoomOut: () => void;
  toggle: () => void;
  fit: () => void;
  canIn: boolean;
  canOut: boolean;
}

interface PanHandlers {
  onPointerDown: PointerEventHandler<HTMLElement>;
  onPointerMove: PointerEventHandler<HTMLElement>;
  onPointerUp: PointerEventHandler<HTMLElement>;
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
  MediaViewerItem, MediaViewerPixels, MediaViewerProps, MediaViewerStageProps, MediaViewerStepProps, MediaViewerToolsProps, MediaViewerZoom,
  MediaViewerZoomProps, NaturalSize, PanHandlers, ZoomState,
};
