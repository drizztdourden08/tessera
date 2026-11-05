/* @layer renderer-components @kind types */
import type { RefObject } from 'react';
import type { IconName } from '../../../primitives/Icon';
import type { IconFileProblem } from '../behavior/read-icon-file.type';

interface IconPickerPanelProps {
  anchorRef: RefObject<HTMLElement | null>;
  icons: readonly IconName[];
  selected: IconName | null;
  query: string;
  problem: IconFileProblem | null;
  allowUpload: boolean;
  onQuery: (query: string) => void;
  onPick: (name: IconName) => void;
  onUpload: (files: File[]) => void;
  onClose: () => void;
}

export type { IconPickerPanelProps };
