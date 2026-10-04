/* @layer renderer-components @kind util */
import type { FileEntry } from '../FileList.type';

const fileName = (file: FileEntry): string => file.name ?? file.path.split(/[\\/]/).pop() ?? file.path;

export { fileName };
