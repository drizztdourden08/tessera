/* @layer renderer-components @kind util */
import type { ReactNode } from 'react';
import { defaultColumns } from './default-columns';
import { itemReaders } from './item-readers';
import { selectionLimits } from './selection-limits';
import { valueBinding } from './value-binding';
import type { FieldOf, ValueOf } from './listbox.type';
import type { ListboxSetup } from './listbox-model.type';
import type { SetupSource } from './listbox-setup.type';

const listboxSetup = <T, F extends FieldOf<T>>(source: SetupSource<T, F>, emptyText: ReactNode): ListboxSetup<T, ValueOf<T, F>> => {
  const readers = itemReaders(source);
  const limits = selectionLimits(source.min, source.max);
  const custom = source.itemComponent !== undefined;
  return {
    ...readers,
    ...valueBinding(source, readers.keyOf, limits.max > 1),
    ...limits,
    items: source.items,
    columns: custom ? [] : source.columns ?? defaultColumns(source.items, readers.labelOf),
    categories: source.categories ?? {},
    itemComponent: source.itemComponent,
    valueComponent: source.valueComponent,
    valueDisplay: source.valueDisplay ?? 'label',
    loading: source.loading === true,
    emptyText: source.emptyText ?? emptyText,
  };
};

export { listboxSetup };
