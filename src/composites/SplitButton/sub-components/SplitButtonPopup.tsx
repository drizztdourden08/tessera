/* @layer renderer-components @kind component */
import { DropdownMenu } from '../../DropdownMenu';
import { SplitButtonPanel } from './SplitButtonPanel';
import type { SplitButtonPopupProps } from '../SplitButton.type';

const SplitButtonPopup = ({ id, anchorRef, label, items = [], panel, onClose }: SplitButtonPopupProps) => {
  if (panel !== undefined) return <SplitButtonPanel id={id} anchorRef={anchorRef} label={label} render={panel} onClose={onClose} />;
  if (items.length === 0) return null;
  return <DropdownMenu groups={[{ id: 'split-items', items }]} anchorRef={anchorRef} align="end" onClose={onClose} />;
};

export { SplitButtonPopup };
