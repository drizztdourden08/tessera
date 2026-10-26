/* @layer renderer-components @kind hook */
import { useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { HISTORY_LIMIT, IDLE_WALK } from '../../CommandInput/CommandInput.constants';
import type { HistoryWalk } from '../../CommandInput/CommandInput.type';
import { addToHistory } from '../../CommandInput/behavior/add-to-history';
import { walkHistory } from '../../CommandInput/behavior/walk-history';
import { isPendingResult } from './is-pending-result';
import type { LogInputResult } from './log-input-result.type';

const useLogInput = (onInput: (text: string) => LogInputResult) => {
  const [value, setValue] = useState('');
  const [sent, setSent] = useState<readonly string[]>([]);
  const [walk, setWalk] = useState<HistoryWalk>(IDLE_WALK);
  const pending = useRef(false);

  const type = (text: string) => {
    setWalk(IDLE_WALK);
    setValue(text);
  };

  const accept = (text: string) => {
    if (text !== '') setSent((now) => addToHistory(now, text, HISTORY_LIMIT));
    setWalk(IDLE_WALK);
    setValue((now) => (now === text ? '' : now));
  };

  const settle = (text: string, accepted: boolean | void) => {
    pending.current = false;
    if (accepted !== false) accept(text);
  };

  const submit = (text: string): Promise<void> | undefined => {
    if (pending.current) return undefined;
    let result: LogInputResult;
    try {
      result = onInput(text);
    } catch (error) {
      result = Promise.reject(error);
    }
    if (!isPendingResult(result)) {
      if (result !== false) accept(text);
      return undefined;
    }
    pending.current = true;
    return result.then((accepted) => settle(text, accepted), () => settle(text, false));
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return;
    event.preventDefault();
    const step = walkHistory(event.key === 'ArrowUp' ? 'older' : 'newer', sent, walk, value);
    if (step === null) return;
    setWalk(step.walk);
    setValue(step.value);
  };

  return { value, type, submit, onKeyDown };
};

export { useLogInput };
