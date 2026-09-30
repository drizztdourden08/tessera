/* @layer renderer-components @kind util */
import type { ListboxModel } from './listbox-state.type';

const activeOptionId = <T>(shown: boolean, model: ListboxModel<T>): string | undefined =>
  shown && model.active.index >= 0 ? model.optionId(model.active.index) : undefined;

export { activeOptionId };
