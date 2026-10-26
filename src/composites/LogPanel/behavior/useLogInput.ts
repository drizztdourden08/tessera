/* @layer renderer-components @kind hook */
import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import { HISTORY_LIMIT, IDLE_WALK } from '../../CommandInput/CommandInput.constants';
import type { HistoryWalk } from '../../CommandInput/CommandInput.type';
import { addToHistory } from '../../CommandInput/behavior/add-to-history';
import { walkHistory } from '../../CommandInput/behavior/walk-history';

const useLogInput = (onInput: (text: string) => void) => {
  const [value, setValue] = useState('');
  const [sent, setSent] = useState<readonly string[]>([]);
  const [walk, setWalk] = useState<HistoryWalk>(IDLE_WALK);

  const type = (text: string) => {
    setWalk(IDLE_WALK);
    setValue(text);
  };

  const submit = (text: string) => {
    onInput(text);
    if (text !== '') setSent((now) => addToHistory(now, text, HISTORY_LIMIT));
    type('');
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
