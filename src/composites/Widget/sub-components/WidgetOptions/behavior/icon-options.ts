/* @layer renderer-components @kind logic */
import type { SegmentOption } from '../../../../../primitives/SegmentedControl';
import type { IconChoice, WidgetWords } from '../WidgetOptions.type';

const iconOptions = <T extends string>(choices: readonly IconChoice<T>[], words: WidgetWords): SegmentOption<T>[] =>
  choices.map(({ value, icon, label, hint }) => ({ value, icon, hint: { label: words[label], description: words[hint] } }));

export { iconOptions };
