/* @layer renderer-components @kind component */
import { Icon } from '../../primitives/Icon';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { EdgeButton } from '../edge-button/EdgeButton';
import { collapseToggleClass } from './behavior/collapse-toggle-class';
import { CHEVRON_SIZE } from './CollapseToggle.constants';
import type { CollapseToggleProps } from './CollapseToggle.type';
import './CollapseToggle.css';

const CollapseToggle = (props: CollapseToggleProps) => {
  const { collapsed, onToggle, label, side = 'start', controls, ref, className } = props;
  const { navigation } = useTesseraStrings();
  const name = collapsed ? navigation.showPane(label) : navigation.hidePane(label);
  return (
    <EdgeButton
      ref={ref}
      className={collapseToggleClass(side, collapsed, className)}
      label={name}
      title={name}
      aria-expanded={!collapsed}
      aria-controls={controls}
      onClick={onToggle}
    >
      <Icon name="chevron-right" size={CHEVRON_SIZE} />
    </EdgeButton>
  );
};

export { CollapseToggle };
