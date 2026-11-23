/* @layer renderer-components @kind component */
import { Card } from '../../../primitives/Card';
import { WindowHeader } from '../../WindowHeader';
import type { DrawerHeaderProps } from '../Drawer.type';

const DrawerHeader = (props: DrawerHeaderProps) => {
  const { look, eyebrow, title, titleWrap = true, stackNarrow, titleId, subtitle, headerActions, headerActionsRow, onClose } = props;
  if (title === undefined && subtitle === undefined && eyebrow === undefined) return null;
  const header = (
    <WindowHeader
      look={look === 'record' ? 'record' : undefined}
      eyebrow={eyebrow}
      title={title}
      titleWrap={titleWrap}
      stackNarrow={stackNarrow}
      titleId={titleId}
      subtitle={subtitle}
      actions={headerActions}
      actionsRow={headerActionsRow}
      onClose={onClose}
      className="drawer__header"
    />
  );
  return look === 'split' ? <Card surface="glass" flush className="drawer__head-card">{header}</Card> : header;
};

export { DrawerHeader };
