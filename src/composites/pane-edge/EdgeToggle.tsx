/* @layer renderer-components @kind component */
import { CollapseToggle } from '../CollapseToggle';
import type { EdgeToggleProps } from './EdgeToggle.type';

const EdgeToggle = ({ pane, side, across }: EdgeToggleProps) => {
  if (!pane?.collapsible || across?.fold.collapsed) return null;
  return (
    <CollapseToggle
      ref={pane.fold.toggleRef}
      collapsed={pane.fold.collapsed}
      onToggle={pane.fold.toggle}
      label={pane.label}
      side={side}
      controls={pane.id}
      className={`pane-edge__toggle pane-edge__toggle--${side}`}
    />
  );
};

export { EdgeToggle };
