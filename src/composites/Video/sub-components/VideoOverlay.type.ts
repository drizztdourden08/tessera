/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { MediaSnapshot } from '../Video.type';

interface VideoOverlayProps {
  media: MediaSnapshot;
  controls: boolean;
  errorMessage: ReactNode;
  onPlay: () => void;
}

export type { VideoOverlayProps };
