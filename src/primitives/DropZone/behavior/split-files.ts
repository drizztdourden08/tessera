/* @layer renderer-components @kind util */
import { filterFiles } from './filter-files';
import type { SplitFiles } from './split-files.type';

const splitFiles = (files: File[], accept: readonly string[] | undefined): SplitFiles => {
  const accepted = filterFiles(files, accept);
  return { accepted, rejected: files.filter((file) => !accepted.includes(file)) };
};

export { splitFiles };
