/* @layer renderer-components @kind util */
import type { SegmentedClassInput } from './segmented-class.type';

const segmentedClass = (input: SegmentedClassInput): string => {
  const { size, tone, disabled, mixed, className } = input;
  return [
    'segmented',
    `control-size--${size === 'sm-plus' ? 'sm' : size}`,
    size === 'sm-plus' && 'segmented--sm-plus',
    tone === 'neutral' && 'segmented--neutral',
    disabled && 'segmented--disabled',
    mixed && 'segmented--mixed',
    className,
  ].filter(Boolean).join(' ');
};

export { segmentedClass };
