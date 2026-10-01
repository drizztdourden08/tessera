/* @layer renderer-components @kind util */
import { listboxSetup } from '../../listbox/listbox-setup';
import { allOptionsOf } from './all-options';
import { groupCategories } from './group-categories';
import type { ListboxSetup } from '../../listbox/listbox-model.type';
import type { SelectOption, SelectOptionsProps } from '../Select.type';

const optionsSetup = (props: SelectOptionsProps, noOptions: string): ListboxSetup<SelectOption, string> => {
  const { groups, renderOption, onChange } = props;
  const groupOf = new Map(groups?.flatMap((group) => group.options.map((option) => [option, group.label] as const)));
  const setup = listboxSetup<SelectOption, 'value'>({
    items: allOptionsOf(groups, props.options),
    valueField: 'value',
    value: props.value === '' ? null : props.value,
    onChange: (next) => onChange?.(next ?? ''),
    values: props.values,
    onValuesChange: props.onValuesChange,
    columns: renderOption ? [] : props.columns,
    groupBy: groups ? (option) => groupOf.get(option) : undefined,
    categories: groups ? groupCategories(groups) : undefined,
    min: props.min,
    max: props.max,
    loading: props.loading,
    emptyText: props.emptyText,
    valueDisplay: props.valueDisplay,
  }, noOptions);
  if (!renderOption) return setup;
  return { ...setup, renderItem: (context) => renderOption(context.item, context.selected) };
};

export { optionsSetup };
