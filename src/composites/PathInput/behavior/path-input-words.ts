/* @layer renderer-components @kind logic */
import type { TesseraStrings } from '../../../primitives/strings/tessera-strings.type';
import type { PathInputProps, PathProblem } from '../PathInput.type';

const pathInputWords = (strings: TesseraStrings, props: PathInputProps, problem: PathProblem | null) => {
  const { paths } = strings;
  const folder = props.kind === 'folder';
  const problems: Record<PathProblem, string> = { file: paths.notFolder, folder: paths.notFile, type: paths.notType(props.accept ?? []) };
  return {
    placeholder: props.placeholder ?? (folder ? paths.noFolder : paths.noFile),
    drop: folder ? paths.dropFolder : paths.dropFile,
    problem: problem ? problems[problem] : null,
  };
};

export { pathInputWords };
