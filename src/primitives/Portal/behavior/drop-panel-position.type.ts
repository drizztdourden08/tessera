/* @layer renderer-components @kind types */
interface DropPanelPosition {
  top: number;
  left: number;
  width: number;
  dropUp: boolean;
}

interface DropPanelPositionOptions {
  roomForDropDown: number;
  gap: number;
  minPanelWidth: number;
}

export type { DropPanelPosition, DropPanelPositionOptions };
