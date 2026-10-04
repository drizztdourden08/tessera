/* @layer renderer-components @kind data */
import type { PathKind, PathProblem } from './PathField.type';

const TAIL_MIN = 16;

const SEPARATORS = /[/\\]/g;

const KIND_PROBLEM: Readonly<Record<PathKind, (folder: boolean) => PathProblem | null>> = {
  file: (folder) => (folder ? 'folder' : null),
  folder: (folder) => (folder ? null : 'file'),
  any: () => null,
};

export { KIND_PROBLEM, SEPARATORS, TAIL_MIN };
