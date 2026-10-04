/* @layer renderer-components @kind hook */
import { useCallback, useRef, useState } from 'react';
import type { DragEvent } from 'react';
import type { PathDrop, PathDropRules, PathProblem } from '../PathField.type';
import { droppedPath } from './dropped-path';

const hasFiles = (event: DragEvent<HTMLElement>): boolean => Array.from(event.dataTransfer.types).includes('Files');

const usePathDrop = (rules: PathDropRules, enabled: boolean, onPath: (path: string) => void): PathDrop => {
  const [dropping, setDropping] = useState(false);
  const [problem, setProblem] = useState<PathProblem | null>(null);
  const depth = useRef(0);
  const take = (event: DragEvent<HTMLElement>): boolean => {
    if (!enabled || !hasFiles(event)) return false;
    event.preventDefault();
    return true;
  };
  const onDragEnter = (event: DragEvent<HTMLElement>) => {
    if (!take(event)) return;
    depth.current += 1;
    setDropping(true);
    setProblem(null);
  };
  const onDragOver = (event: DragEvent<HTMLElement>) => {
    if (take(event)) event.dataTransfer.dropEffect = 'copy';
  };
  const onDragLeave = (event: DragEvent<HTMLElement>) => {
    if (!take(event)) return;
    depth.current = Math.max(depth.current - 1, 0);
    if (depth.current === 0) setDropping(false);
  };
  const onDrop = (event: DragEvent<HTMLElement>) => {
    if (!take(event)) return;
    depth.current = 0;
    setDropping(false);
    const result = droppedPath(event.dataTransfer, rules);
    if (result?.path !== undefined) onPath(result.path);
    setProblem(result?.problem ?? null);
  };
  const clearProblem = useCallback(() => setProblem(null), []);
  return { dropping, problem, clearProblem, handlers: { onDragEnter, onDragOver, onDragLeave, onDrop } };
};

export { usePathDrop };
