/* @layer renderer-components @kind logic */
import { VIDEO_KEYS } from '../Video.constants';
import type { VideoKeyAction } from '../Video.type';

const videoKeyAction = (key: string, onFrame: boolean): VideoKeyAction | null => {
  const binding = VIDEO_KEYS[key.toLowerCase()];
  if (!binding || (binding.frameOnly && !onFrame)) return null;
  return binding.action;
};

export { videoKeyAction };
