/* @layer renderer-components @kind logic */
import { KEY_SHORTCUTS } from '../Video.constants';
import type { FramePropsParams } from './useVideoPlayer.type';

const frameProps = (params: FramePropsParams) => {
  const { interactive, idle, attach, onKeyDown, wake, sleep } = params;
  return {
    ref: attach,
    role: 'group',
    tabIndex: interactive ? 0 : undefined,
    'aria-keyshortcuts': interactive ? KEY_SHORTCUTS : undefined,
    'data-idle': idle || undefined,
    onKeyDown: interactive ? onKeyDown : undefined,
    onPointerMove: wake,
    onPointerLeave: sleep,
    onFocus: wake,
  };
};

export { frameProps };
