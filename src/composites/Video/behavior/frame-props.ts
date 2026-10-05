/* @layer renderer-components @kind logic */
import { KEY_SHORTCUTS } from '../Video.constants';
import type { FramePropsParams } from './useVideoPlayer.type';

const frameProps = (params: FramePropsParams) => {
  const { interactive, idle, theater, filled, className, attach, onKeyDown, wake, sleep } = params;
  return {
    ref: attach,
    role: 'group',
    className: ['video', theater && 'video--theater', className].filter(Boolean).join(' '),
    tabIndex: interactive ? 0 : undefined,
    'aria-keyshortcuts': interactive ? KEY_SHORTCUTS : undefined,
    'data-idle': idle || undefined,
    'data-filled': filled || undefined,
    onKeyDown: interactive ? onKeyDown : undefined,
    onPointerMove: wake,
    onPointerLeave: sleep,
    onFocus: wake,
  };
};

export { frameProps };
