/* @layer renderer-components @kind types */
import type { ReactNode, RefObject } from 'react';
import type { PixelSize, RgbaImage } from '../../primitives/pixel-image/pixel-image.type';
import type { PixelThumbnailFrame } from '../../primitives/PixelThumbnail';

type PixelPlayerMode = 'compact' | 'large';

type PixelPlayerZoom = 'fit' | number;

type PixelPlayerBackdrop = 'checker' | 'none';

type PixelPlayerDirection = 'forward' | 'reverse' | 'pingpong';

interface PixelPlayerLoop {
  direction: PixelPlayerDirection;
  repeat: number;
}

interface PixelPlayerTag {
  id: string;
  name: string;
  from: number;
  to: number;
}

interface PixelPlayerCell {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label?: string;
}

interface PixelPlayerProps {
  frames: readonly PixelThumbnailFrame[];
  label: string;
  mode?: PixelPlayerMode;
  zoom?: PixelPlayerZoom;
  backdrop?: PixelPlayerBackdrop;
  loop?: PixelPlayerLoop;
  speeds?: readonly number[];
  tags?: readonly PixelPlayerTag[];
  tagId?: string | null;
  onTagChange?: (id: string | null) => void;
  cells?: readonly PixelPlayerCell[];
  onCellHover?: (id: string | null) => void;
  controls?: boolean;
  autoPlay?: boolean;
  placeholder?: ReactNode;
  className?: string;
}

interface PlayRange {
  from: number;
  to: number;
}

type PlayerStep = 1 | -1;

interface PlayerState {
  index: number;
  dir: PlayerStep;
  cycles: number;
  playing: boolean;
  finished: boolean;
}

type PlayerAction =
  | { type: 'play'; range: PlayRange; loop: PixelPlayerLoop }
  | { type: 'pause' }
  | { type: 'advance'; range: PlayRange; loop: PixelPlayerLoop }
  | { type: 'step'; delta: number; range: PlayRange }
  | { type: 'jump'; to: 'first' | 'last'; range: PlayRange }
  | { type: 'restart'; range: PlayRange; loop: PixelPlayerLoop };

type PlayFace = 'replay' | 'pause' | 'play';

type PlayerKeyAction = 'toggle' | 'back' | 'forward' | 'first' | 'last';

interface FramePlayerParams {
  frames: readonly PixelThumbnailFrame[];
  range: PlayRange;
  loop: PixelPlayerLoop;
  speed: number;
  autoPlay: boolean;
}

interface FramePlayer {
  index: number;
  playing: boolean;
  finished: boolean;
  toggle: () => void;
  step: (delta: number) => void;
  jump: (to: 'first' | 'last') => void;
}

type PixelPlaybackParams = Pick<PixelPlayerProps, 'frames' | 'loop' | 'speeds' | 'tags' | 'tagId' | 'onTagChange' | 'autoPlay'>;

interface PixelPlayback {
  player: FramePlayer;
  range: PlayRange;
  speeds: readonly number[];
  speed: number;
  setSpeed: (speed: number) => void;
  tags: readonly PixelPlayerTag[];
  tagValue: string | null;
  chooseTag: (id: string | null) => void;
  onKeyAction: (action: PlayerKeyAction) => void;
  image: RgbaImage | null;
  animated: boolean;
}

interface TagChoiceParams {
  tagId: string | null | undefined;
  onTagChange: ((id: string | null) => void) | undefined;
}

interface HoveredCellParams {
  cells: readonly PixelPlayerCell[];
  zoom: number;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  onCellHover: ((id: string | null) => void) | undefined;
}

interface HoveredCell {
  cell: PixelPlayerCell | null;
  onPointerMove: (event: { clientX: number; clientY: number }) => void;
  onPointerLeave: () => void;
}

interface StageDrawParams {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  image: RgbaImage | null;
  zoom: number;
  cell: PixelPlayerCell | null;
}

interface PixelPlayerStageProps {
  frames: readonly PixelThumbnailFrame[];
  image: RgbaImage | null;
  label: string;
  zoom: PixelPlayerZoom;
  backdrop: PixelPlayerBackdrop;
  showZoom: boolean;
  cells: readonly PixelPlayerCell[];
  onCellHover: ((id: string | null) => void) | undefined;
  onKeyAction: (action: PlayerKeyAction) => void;
  placeholder: ReactNode;
}

interface PixelPlayerBarProps {
  player: FramePlayer;
  range: PlayRange;
  speeds: readonly number[];
  speed: number;
  onSpeed: (speed: number) => void;
  tags: readonly PixelPlayerTag[];
  tagValue: string | null;
  onTag: (id: string | null) => void;
}

interface PixelPlayerBarTagsProps {
  tags: readonly PixelPlayerTag[];
  value: string | null;
  onChange: (id: string | null) => void;
}

interface PixelPlayerBarSpeedProps {
  speeds: readonly number[];
  speed: number;
  onSpeed: (speed: number) => void;
}

interface PixelPlayerBarTransportProps {
  player: FramePlayer;
}

interface ZoomParams {
  zoom: PixelPlayerZoom;
  stage: PixelSize;
  frames: readonly PixelThumbnailFrame[];
}

export type {
  FramePlayer,
  FramePlayerParams,
  HoveredCell,
  HoveredCellParams,
  PixelPlayback,
  PixelPlaybackParams,
  PixelPlayerBackdrop,
  PixelPlayerBarProps,
  PixelPlayerBarSpeedProps,
  PixelPlayerBarTagsProps,
  PixelPlayerBarTransportProps,
  PixelPlayerCell,
  PixelPlayerDirection,
  PixelPlayerLoop,
  PixelPlayerMode,
  PixelPlayerProps,
  PixelPlayerStageProps,
  PixelPlayerTag,
  PixelPlayerZoom,
  PlayerAction,
  PlayFace,
  PlayerKeyAction,
  PlayerState,
  PlayRange,
  StageDrawParams,
  TagChoiceParams,
  ZoomParams,
};
