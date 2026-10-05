/* @layer renderer-components @kind logic */
import { filterFiles } from '../../../primitives/DropZone/behavior/filter-files';
import { KIND_PROBLEM } from '../PathInput.constants';
import type { PathDropResult, PathDropRules, PathProblem } from '../PathInput.type';
import { filePath } from './file-path';

const problemOf = (item: DataTransferItem, file: File, rules: PathDropRules): PathProblem | null => {
  const folder = item.webkitGetAsEntry()?.isDirectory === true;
  const wrongKind = KIND_PROBLEM[rules.kind](folder);
  if (wrongKind) return wrongKind;
  const accept = folder ? undefined : rules.accept;
  return accept?.length && filterFiles([file], accept).length === 0 ? 'type' : null;
};

const droppedPath = (data: DataTransfer, rules: PathDropRules): PathDropResult => {
  let first: PathProblem | null = null;
  for (const item of Array.from(data.items)) {
    const file = item.kind === 'file' ? item.getAsFile() : null;
    if (!file) continue;
    const problem = problemOf(item, file, rules);
    if (!problem) return { path: filePath(file, rules.resolvePath) };
    first ??= problem;
  }
  return first ? { problem: first } : null;
};

export { droppedPath };
