/* @layer renderer-components @kind types */
import type { SwatchGroup } from '../ColorPicker.type';

interface QuickAssignProps {
  value: string;
  onChange: (hex: string) => void;
  swatchGroups?: readonly SwatchGroup[];
}

export type { QuickAssignProps };
