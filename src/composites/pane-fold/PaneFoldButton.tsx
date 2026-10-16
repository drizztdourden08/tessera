/* @layer renderer-components @kind component */
import { Icon } from '../../primitives/Icon';
import { IconButton } from '../../primitives/IconButton';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { PaneFoldButtonProps } from './PaneFoldButton.type';

const PaneFoldButton = (props: PaneFoldButtonProps) => {
  const { fold, label, controls, icon, className } = props;
  const { navigation } = useTesseraStrings();
  const { collapsed } = fold;
  const name = collapsed ? navigation.showPane(label) : navigation.hidePane(label);
  return (
    <IconButton
      ref={fold.toggleRef}
      size="sm"
      variant="ghost"
      className={className ? `pane-fold-button ${className}` : 'pane-fold-button'}
      label={name}
      title={name}
      aria-expanded={!collapsed}
      aria-controls={controls}
      onClick={fold.toggle}
    >
      <Icon name={icon} />
    </IconButton>
  );
};

export { PaneFoldButton };
