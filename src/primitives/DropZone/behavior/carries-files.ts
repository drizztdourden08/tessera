/* @layer renderer-components @kind util */
import { FILE_DRAG_TYPES } from './useFileDrag.constants';

const carriesFiles = (data: DataTransfer | null): boolean => {
  if (!data) return false;
  if (Array.from(data.types).some((type) => FILE_DRAG_TYPES.includes(type))) return true;
  return Array.from(data.items).some((item) => item.kind === 'file');
};

export { carriesFiles };
