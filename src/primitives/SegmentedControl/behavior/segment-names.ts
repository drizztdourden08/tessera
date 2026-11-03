/* @layer renderer-components @kind util */
import type { SegmentOption } from '../SegmentedControl.type';
import type { SegmentNames } from './segment-names.type';

const segmentNames = <T extends string>(option: SegmentOption<T>): SegmentNames => {
  if (option.icon === undefined) return { name: option.title, shown: option.label };
  const name = option.title ?? option.hint.label;
  return { name, shown: name };
};

export { segmentNames };
