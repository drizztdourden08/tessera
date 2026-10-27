/* @layer renderer-components @kind component */
import { WindowHeader } from '../../WindowHeader';
import type { DrawerHeaderProps } from '../Drawer.type';

const DrawerHeader = (props: DrawerHeaderProps) => {
  const { look, eyebrow, title, titleWrap = true, stackNarrow, titleId, subtitle, headerActions, onClose } = props;
  if (title === undefined && subtitle === undefined && eyebrow === undefined) return null;
  return (
    <WindowHeader
      look={look === 'record' ? 'record' : undefined}
      eyebrow={eyebrow}
      title={title}
      titleWrap={titleWrap}
      stackNarrow={stackNarrow}
      titleId={titleId}
      subtitle={subtitle}
      actions={headerActions}
      onClose={onClose}
      className="drawer__header"
    />
  );
};

export { DrawerHeader };
