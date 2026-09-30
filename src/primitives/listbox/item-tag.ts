/* @layer renderer-components @kind util */
import type { ReactNode } from 'react';
import { readField } from './read-field';
import { valueText } from './value-text';
import type { ItemAccessor } from './listbox.type';

const itemTag = <T>(item: T, tagField: ItemAccessor<T, ReactNode> | undefined, label: string): ReactNode => {
  if (tagField === undefined) return label;
  return typeof tagField === 'function' ? tagField(item) : valueText(readField(item, tagField));
};

export { itemTag };
