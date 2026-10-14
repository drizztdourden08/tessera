/* @layer renderer-components @kind logic */
import { rovingIndex } from '../../field-control/roving-index';
import { SEGMENT_SELECTOR, SEGMENT_STEPS } from '../SegmentedControl.constants';
import type { SegmentKeys, SegmentKeysInput } from '../SegmentedControl.type';

const segmentKeys = <T extends string>(input: SegmentKeysInput<T>): SegmentKeys => {
  const { trackRef, options, enabled, value, pick } = input;
  const checked = options.findIndex((option) => option.value === value);
  return {
    stop: enabled[checked] === true ? checked : enabled.indexOf(true),
    onKeyDown: (event) => {
      const buttons = [...trackRef.current?.querySelectorAll<HTMLElement>(SEGMENT_SELECTOR) ?? []];
      const current = buttons.findIndex((button) => button === event.target);
      const next = current < 0 ? null : rovingIndex(event.key, current, enabled, SEGMENT_STEPS);
      const option = next === null || next === current ? undefined : options[next];
      if (next === null || option === undefined) return;
      event.preventDefault();
      pick(option.value);
      buttons[next]?.focus();
    },
  };
};

export { segmentKeys };
