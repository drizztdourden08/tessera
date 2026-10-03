/* @layer renderer-components @kind util */
import type { FrameClassParams } from './frame-class.type';

const frameClass = (params: FrameClassParams): string => {
  const { size, start, end, className } = params;
  return [
    'text-input-frame',
    `control-size--${size}`,
    start ? 'text-input-frame--start' : '',
    end ? 'text-input-frame--end' : '',
    className,
  ].filter(Boolean).join(' ');
};

export { frameClass };
