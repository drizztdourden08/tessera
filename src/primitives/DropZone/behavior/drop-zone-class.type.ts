/* @layer renderer-components @kind types */
import type { DropZoneTone } from '../DropZone.type';

interface DropZoneLook {
  inline: boolean;
  active: boolean;
  disabled: boolean;
  status?: DropZoneTone;
}

export type { DropZoneLook };
