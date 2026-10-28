/* @layer renderer-components @kind types */
import type { CSSProperties, ImgHTMLAttributes, ReactEventHandler, ReactNode } from 'react';

type ImageStatus = 'empty' | 'loading' | 'loaded' | 'broken';

type ImageCoverStatus = Exclude<ImageStatus, 'loaded'>;

type ImagePlaceholderMode = 'auto' | 'none';

type ImageLength = number | string;

type ImageFit = 'cover' | 'contain' | 'fill' | 'none' | 'integer';

type ImageBackdrop = 'none' | 'checker';

type ImagePixelated = boolean | 'auto';

interface ImageSize {
  width: number;
  height: number;
}

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallback?: ReactNode;
  aspectRatio?: ImageLength;
  placeholder?: ImagePlaceholderMode;
  pending?: boolean;
  frame?: boolean;
  fit?: ImageFit;
  pixelated?: ImagePixelated;
  backdrop?: ImageBackdrop;
}

interface ImageClassParams {
  status: ImageStatus;
  frame?: boolean;
  fit?: ImageFit;
  backdrop?: ImageBackdrop;
  pixelated?: ImagePixelated;
  natural?: ImageSize;
  className?: string;
}

interface PixelArt {
  pixelArt: boolean;
  onLoad: ReactEventHandler<HTMLImageElement>;
}

interface SettledImage {
  source: string;
  status: 'loaded' | 'broken';
  ratio?: string;
  natural?: ImageSize;
}

interface UseImageStatusParams {
  src?: string;
  srcSet?: string;
  pending: boolean;
  onLoad?: ReactEventHandler<HTMLImageElement>;
  onError?: ReactEventHandler<HTMLImageElement>;
}

interface FrameStyleParams {
  aspectRatio?: ImageLength;
  width?: ImageLength;
  height?: ImageLength;
  naturalRatio?: string;
  style?: CSSProperties;
}

interface ImageCoverProps {
  status: ImageCoverStatus;
  fallback?: ReactNode;
  placeholder: ImagePlaceholderMode;
}

interface ImagePlaceholderProps {
  status: ImageCoverStatus;
}

export type {
  FrameStyleParams,
  ImageBackdrop,
  ImageClassParams,
  ImageCoverProps,
  ImageFit,
  ImageLength,
  ImagePixelated,
  ImagePlaceholderProps,
  ImageProps,
  ImageSize,
  ImageStatus,
  PixelArt,
  SettledImage,
  UseImageStatusParams,
};
