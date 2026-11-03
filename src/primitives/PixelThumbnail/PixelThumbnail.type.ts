/* @layer renderer-components @kind types */
import type { Ref, RefObject } from 'react';
import type { IndexedImage, PixelSize, RgbaImage } from '../pixel-image/pixel-image.type';

interface PixelThumbnailFrame {
  image: RgbaImage;
  durationMs: number;
}

type PixelThumbnailBox = 16 | 24 | 32 | 40 | 48 | 64;

type PixelThumbnailFit = 'step' | 'contain';

type PixelThumbnailBackdrop = 'checker' | 'none';

interface PixelThumbnailProps {
  image?: RgbaImage | null;
  indexed?: IndexedImage;
  box?: PixelThumbnailBox;
  fit?: PixelThumbnailFit;
  backdrop?: PixelThumbnailBackdrop;
  lazy?: boolean;
  throttleMs?: number;
  frames?: readonly PixelThumbnailFrame[];
  playing?: boolean;
  label?: string;
  ref?: Ref<HTMLCanvasElement>;
  className?: string;
}

interface FitSizeParams {
  source: PixelSize;
  box: number;
  fit: PixelThumbnailFit;
}

interface FrameClockParams {
  frames: readonly PixelThumbnailFrame[] | undefined;
  playing: boolean;
  frameRef: RefObject<Element | null>;
}

interface ThumbnailSourceParams {
  image: RgbaImage | null;
  indexed: IndexedImage | undefined;
  frames: readonly PixelThumbnailFrame[] | undefined;
  frameIndex: number;
}

export type {
  FitSizeParams,
  FrameClockParams,
  PixelThumbnailBackdrop,
  PixelThumbnailBox,
  PixelThumbnailFit,
  PixelThumbnailFrame,
  PixelThumbnailProps,
  ThumbnailSourceParams,
};
