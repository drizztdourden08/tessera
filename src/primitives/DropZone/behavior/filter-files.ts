/* @layer renderer-components @kind util */
import { acceptsFile } from './accepts-file';

const filterFiles = (files: File[], accept: readonly string[] | undefined): File[] => {
  if (!accept || accept.length === 0) return files;
  return files.filter((file) => accept.some((entry) => acceptsFile(file, entry)));
};

export { filterFiles };
