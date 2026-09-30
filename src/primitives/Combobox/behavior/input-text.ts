/* @layer renderer-components @kind util */
import type { ListboxDisplay } from '../../listbox/listbox-model.type';

const inputText = <T>(text: string | null, multi: boolean, displays: readonly ListboxDisplay<T>[]): string => {
  if (text !== null) return text;
  if (multi) return '';
  return displays[0]?.label ?? '';
};

export { inputText };
