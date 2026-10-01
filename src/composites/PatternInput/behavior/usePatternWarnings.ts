/* @layer renderer-components @kind hook */
import { useEffect } from 'react';
import { devWarn } from '../../../primitives/dom/dev-warn';

const usePatternWarnings = (problems: readonly string[]): void => {
  const key = problems.join('\n');
  useEffect(() => {
    for (const problem of problems) devWarn(problem);
  }, [key]);
};

export { usePatternWarnings };
