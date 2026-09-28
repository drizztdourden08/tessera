/* @layer renderer-components @kind hook */
import { useCallback } from 'react';
import type { KeyboardEvent } from 'react';
import { OPEN_KEYS } from './useSelectKeyDown.constants';
import type { UseSelectKeyDownParams } from './useSelectKeyDown.type';

const useSelectKeyDown = (params: UseSelectKeyDownParams) => {
  const { open, highlightIdx, filtered, setHighlightIdx, handleOpen, handleSelect } = params;

  return useCallback(
    (e: KeyboardEvent) => {
      if (!open) {
        if (OPEN_KEYS.has(e.key)) {
          e.preventDefault();
          handleOpen();
        }
        return;
      }
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setHighlightIdx((i) => Math.min(i + 1, filtered.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setHighlightIdx((i) => Math.max(i - 1, 0));
          break;
        case 'Enter': {
          e.preventDefault();
          const highlighted = highlightIdx >= 0 ? filtered[highlightIdx] : undefined;
          if (highlighted) handleSelect(highlighted.value);
          break;
        }
      }
    },
    [open, highlightIdx, filtered, setHighlightIdx, handleOpen, handleSelect],
  );
};

export { useSelectKeyDown };
