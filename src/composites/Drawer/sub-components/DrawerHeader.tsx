/* @layer renderer-components @kind component */
import { WindowHeader } from '../../WindowHeader';
import type { DrawerHeaderProps } from '../Drawer.type';

const DrawerHeader = (props: DrawerHeaderProps) => {
  const { eyebrow, title, titleWrap = true, titleId, subtitle, headerActions, onClose } = props;
  if (title === undefined && subtitle === undefined && eyebrow === undefined) return null;
  return (
    <WindowHeader
      eyebrow={eyebrow}
      title={title}
      titleWrap={titleWrap}
      titleId={titleId}
      subtitle={subtitle}
      actions={headerActions}
      onClose={onClose}
      className="drawer__header"
    />
  );
};

export { DrawerHeader };
