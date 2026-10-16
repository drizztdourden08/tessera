/* @layer renderer-components @kind types */
import type { IconName } from '../../primitives/Icon/Icon.type';
import type { PaneFold } from './pane-fold.type';

interface PaneFoldButtonProps {
  fold: PaneFold;
  label: string;
  controls: string;
  icon: IconName;
  className?: string;
}

export type { PaneFoldButtonProps };
