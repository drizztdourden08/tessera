/* @layer renderer-components @kind hook */
import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import { PROBLEM_SELECTOR } from '../ValidationSummary.constants';

const useShowAll = (listRef: RefObject<HTMLElement | null>, firstHidden: number) => {
  const [all, setAll] = useState(false);
  const focusAt = useRef<number | null>(null);

  useEffect(() => {
    if (!all || focusAt.current === null) return;
    listRef.current?.querySelectorAll<HTMLElement>(PROBLEM_SELECTOR)[focusAt.current]?.focus();
    focusAt.current = null;
  }, [all, listRef]);

  const showAll = (): void => {
    focusAt.current = firstHidden;
    setAll(true);
  };

  return { all, showAll };
};

export { useShowAll };
