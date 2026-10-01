/* @layer renderer-components @kind hook */
import { typeaheadIndex } from './typeahead-index';
import { useTypeaheadText } from './useTypeaheadText';
import type { ListboxModel } from './listbox-state.type';

const useTypeahead = <T>(model: ListboxModel<T>) => {
  const typed = useTypeaheadText();

  return (key: string, time: number): number => {
    const text = typed(key, time);
    return text === null ? -1 : typeaheadIndex(model.labels, model.active.enabled, model.active.index, text);
  };
};

export { useTypeahead };
