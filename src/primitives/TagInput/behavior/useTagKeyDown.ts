/* @layer renderer-components @kind hook */
import { useCallback } from 'react';
import type { KeyboardEvent } from 'react';
import { removeLast } from './removeLast';
import type { UseTagKeyDownParams } from './useTagKeyDown.type';

const useTagKeyDown = (params: UseTagKeyDownParams) => {
  const {
    value, onChange, query, filtered, highlightIdx, setHighlightIdx, commit, commitTyped, popup,
  } = params;

  const handleEnter = useCallback(() => {
    const highlighted = highlightIdx >= 0 ? filtered[highlightIdx] : undefined;
    if (highlighted !== undefined) commit(highlighted);
    else commitTyped();
  }, [filtered, highlightIdx, commit, commitTyped]);

  const handleBackspace = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (query !== '') return;
    const next = removeLast(value);
    if (next !== value) {
      e.preventDefault();
      onChange(next);
    }
  }, [query, value, onChange]);

  return useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case 'ArrowDown': {
          e.preventDefault();
          popup.handleOpen();
          setHighlightIdx((i) => Math.min(i + 1, filtered.length - 1));
          break;
        }
        case 'ArrowUp': {
          e.preventDefault();
          setHighlightIdx((i) => Math.max(i - 1, -1));
          break;
        }
        case 'Enter': {
          e.preventDefault();
          handleEnter();
          break;
        }
        case 'Backspace': {
          handleBackspace(e);
          break;
        }
        case 'Tab': {
          popup.handleClose();
          break;
        }
      }
    },
    [popup, filtered, setHighlightIdx, handleEnter, handleBackspace],
  );
};

export { useTagKeyDown };
