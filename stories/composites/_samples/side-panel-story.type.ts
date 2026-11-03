/* @layer stories @kind types */
import type { SidePanelRailSize } from '../../../src/composites';

interface OutlinePanelSampleProps {
  folded?: boolean;
  collapsible?: boolean;
  actions?: boolean;
  railSize?: SidePanelRailSize;
}

export type { OutlinePanelSampleProps };
