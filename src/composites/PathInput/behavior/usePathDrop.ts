/* @layer renderer-components @kind hook */
import { useCallback, useState } from 'react';
import { useFileDrag } from '../../../primitives/DropZone/behavior/useFileDrag';
import type { PathDrop, PathDropRules, PathProblem } from '../PathInput.type';
import { droppedPath } from './dropped-path';

const usePathDrop = (rules: PathDropRules, enabled: boolean, onPath: (path: string) => void): PathDrop => {
  const [problem, setProblem] = useState<PathProblem | null>(null);
  const drag = useFileDrag({
    enabled,
    onEnter: () => setProblem(null),
    onDrop: (data) => {
      const result = droppedPath(data, rules);
      if (result?.path !== undefined) onPath(result.path);
      setProblem(result?.problem ?? null);
    },
  });
  const clearProblem = useCallback(() => setProblem(null), []);
  return { dropping: drag.active, problem, clearProblem, handlers: drag.handlers };
};

export { usePathDrop };
