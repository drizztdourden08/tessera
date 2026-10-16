/* @layer renderer-components @kind util */
import type { DragEvent } from 'react';
import { carriesFiles } from './carries-files';

const takeFileDrag = (event: DragEvent<HTMLElement>, enabled: boolean): boolean => {
  if (!carriesFiles(event.dataTransfer)) return false;
  event.preventDefault();
  event.stopPropagation();
  if (enabled) return true;
  event.dataTransfer.dropEffect = 'none';
  return false;
};

export { takeFileDrag };
