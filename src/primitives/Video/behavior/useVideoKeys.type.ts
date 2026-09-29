/* @layer renderer-components @kind types */
import type { VideoActions } from '../Video.type';

interface UseVideoKeysParams {
  actions: VideoActions;
  toggleFullscreen: () => void;
  wake: () => void;
}

export type { UseVideoKeysParams };
