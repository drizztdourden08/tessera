/* @layer renderer-components @kind component */
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { ListDetailLayoutFoldProps } from './ListDetailLayoutFold.type';

const ListDetailLayoutFold = (props: ListDetailLayoutFoldProps) => {
  const { pane, icon } = props;
  const { navigation } = useTesseraStrings();
  const { collapsed } = pane.fold;
  const label = collapsed ? navigation.showPane(pane.label) : navigation.hidePane(pane.label);
  return (
    <IconButton
      ref={pane.fold.toggleRef}
      size="sm"
      variant="ghost"
      className="list-detail-layout__toggle"
      label={label}
      title={label}
      aria-expanded={!collapsed}
      aria-controls={pane.id}
      onClick={pane.fold.toggle}
    >
      <Icon name={icon} />
    </IconButton>
  );
};

export { ListDetailLayoutFold };
