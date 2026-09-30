/* @layer renderer-components @kind hook */
import type { KeyboardEvent } from 'react';
import { navTarget } from '../../listbox/nav-target';
import { useTypeahead } from '../../listbox/useTypeahead';
import { CLEAR_KEYS, OPEN_KEYS } from '../Select.constants';
import type { SelectKeyParams } from './useSelectKeys.type';

const onClosedKey = <T>(event: KeyboardEvent, params: SelectKeyParams<T>) => {
  const { key } = event;
  if (CLEAR_KEYS.has(key) && params.clear) {
    event.preventDefault();
    params.clear();
    return;
  }
  const found = params.typeahead(key, event.timeStamp);
  const target = navTarget(key, true);
  if (!OPEN_KEYS.has(key) && target === undefined && found === -1) return;
  event.preventDefault();
  params.drop.show();
  if (found !== -1) params.model.active.activate(found);
  else if (target === 'first' || target === 'last') params.model.active.move(target);
};

const onOpenKey = <T>(event: KeyboardEvent, params: SelectKeyParams<T>) => {
  const { key } = event;
  const target = navTarget(key, !params.searching);
  if (target !== undefined) {
    event.preventDefault();
    params.model.active.move(target);
    return;
  }
  if (key === 'Enter' || (key === ' ' && !params.searching)) {
    event.preventDefault();
    params.pickActive();
    return;
  }
  if (key === 'Tab') {
    params.drop.close();
    return;
  }
  const found = params.searching ? -1 : params.typeahead(key, event.timeStamp);
  if (found !== -1) params.model.active.activate(found);
};

const useSelectKeys = <T>(params: Omit<SelectKeyParams<T>, 'typeahead'>) => {
  const typeahead = useTypeahead(params.model);
  return (event: KeyboardEvent) => {
    const full = { ...params, typeahead };
    if (params.drop.open) onOpenKey(event, full);
    else onClosedKey(event, full);
  };
};

export { useSelectKeys };
