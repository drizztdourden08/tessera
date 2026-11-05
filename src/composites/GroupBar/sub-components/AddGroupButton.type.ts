/* @layer renderer-components @kind types */
import type { ViewOption } from '../../GroupControl';

interface AddGroupButtonProps {
  options: readonly ViewOption[];
  hasChips: boolean;
  onAdd: (id: string) => void;
}

export type { AddGroupButtonProps };
