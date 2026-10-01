/* @layer renderer-components @kind hook */
import { SELF } from './hint.constants';
import type { HintTargetHandlers, UseHintTargetParams } from './hint.type';
import { useHintReport } from './useHintReport';

const useHintTarget = <E extends Element>(params: UseHintTargetParams<E>): HintTargetHandlers<E> => {
  const { hint, onHint, handlers = {} } = params;
  const own = useHintReport({ hintOf: () => hint, onHint }).handlersFor(SELF);
  return {
    onMouseEnter: (event) => {
      own.onMouseEnter();
      handlers.onMouseEnter?.(event);
    },
    onMouseLeave: (event) => {
      own.onMouseLeave();
      handlers.onMouseLeave?.(event);
    },
    onFocus: (event) => {
      own.onFocus(event);
      handlers.onFocus?.(event);
    },
    onBlur: (event) => {
      own.onBlur();
      handlers.onBlur?.(event);
    },
  };
};

export { useHintTarget };
