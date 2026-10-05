/* @layer renderer-components @kind types */
import type { CSSProperties, ImgHTMLAttributes, ReactEventHandler, ReactNode } from 'react';

type ImageStatus = 'empty' | 'loading' | 'loaded' | 'broken';

type ImageCoverStatus = Exclude<ImageStatus, 'loaded'>;

type ImagePlaceholderMode = 'auto' | 'none';

type ImageLength = number | string;

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallback?: ReactNode;
  aspectRatio?: ImageLength;
  placeholder?: ImagePlaceholderMode;
  pending?: boolean;
  frame?: boolean;
}

interface SettledImage {
  source: string;
  status: 'loaded' | 'broken';
  ratio?: string;
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
  ImageCoverProps,
  ImageLength,
  ImagePlaceholderProps,
  ImageProps,
  ImageStatus,
  SettledImage,
  UseImageStatusParams,
};
