/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Anchored } from '../../../primitives/Anchored';
import { useDismissListeners } from '../../../primitives/Portal';
import { ControlMenuPanel } from '../../ControlMenu/sub-components/ControlMenuPanel';
import { menuClasses } from '../../DropdownMenu/behavior/menu-classes';
import { useFocusReturn } from '../../DropdownMenu/behavior/useFocusReturn';
import { useMenuAnchor } from '../../DropdownMenu/behavior/useMenuAnchor';
import { PANEL_LOOK } from '../SplitButton.constants';
import { ignoreQuery } from '../behavior/ignore-query';
import type { SplitButtonPanelProps } from '../SplitButton.type';
import '../../../theme/focus-ring.css';
import '../../../theme/dropdown-menu.css';
import '../../../theme/dropdown-look.css';
import '../../../theme/control-menu.css';

const SplitButtonPanel = ({ id, anchorRef, label, render, onClose }: SplitButtonPanelProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const { anchor, placement, fallback } = useMenuAnchor({ anchorRef, align: 'end', inline: false, onOutOfView: onClose });
  useFocusReturn(panelRef, anchor);
  useDismissListeners({ open: true, onClose, contentRef: panelRef, triggerRef: anchor, level: 'menu' });

  return (
    <Anchored ref={panelRef} anchorRef={anchor} placement={placement} layer="overlay" fallback={fallback} className={menuClasses(PANEL_LOOK, false, 'control-menu')}>
      <ControlMenuPanel id={id} label={label} hints={false} filter={false} query="" look={PANEL_LOOK} onQueryChange={ignoreQuery}>
        {render(onClose)}
      </ControlMenuPanel>
    </Anchored>
  );
};

export { SplitButtonPanel };
