/* @layer renderer-components @kind component */
import { SegmentedControl } from '../../../../../primitives/SegmentedControl';
import { iconOptions } from '../behavior/icon-options';
import type { ChoiceRowProps } from '../WidgetOptions.type';
import { ControlMenuRow } from '../../../../ControlMenu';

const ChoiceRow = <T extends string>(props: ChoiceRowProps<T>) => {
  const { label, value, choices, words, onChange, children } = props;
  const choose = (next: T | '') => {
    if (next !== '') onChange(next);
  };
  return (
    <ControlMenuRow label={label}>
      <SegmentedControl<T | ''> size="sm" aria-label={label} value={value} options={iconOptions(choices, words)} onChange={choose} />
      {children}
    </ControlMenuRow>
  );
};

export { ChoiceRow };
