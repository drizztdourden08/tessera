/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Box } from '../../primitives/Box';
import { headerClass } from './behavior/header-class';
import { useExtraFit } from './behavior/useExtraFit';
import { WindowHeaderActions } from './sub-components/WindowHeaderActions';
import { WindowHeaderBack } from './sub-components/WindowHeaderBack';
import { WindowHeaderTitles } from './sub-components/WindowHeaderTitles';
import { WindowHeaderTools } from './sub-components/WindowHeaderTools';
import '../../theme/window-chrome.css';
import './WindowHeader.css';
import { type WindowHeaderProps } from './WindowHeader.type';

const WindowHeader = (props: WindowHeaderProps) => {
  const { look, eyebrow, title, titleWrap, titleId, subtitle, onClose, back, extra, actions, actionsRow, stackNarrow, className = '' } = props;
  const headerRef = useRef<HTMLElement>(null);
  const extraFits = useExtraFit(headerRef, extra != null);
  const inEyebrow = actionsRow === 'eyebrow' && eyebrow != null && actions != null;
  const tools = <WindowHeaderTools extra={extra} extraFits={extraFits} actions={inEyebrow ? undefined : actions} onClose={onClose} />;
  return (
    <Box ref={headerRef} className={headerClass(titleWrap, className, look, stackNarrow)}>
      {back && <WindowHeaderBack back={back} />}
      <WindowHeaderTitles
        eyebrow={eyebrow}
        title={title}
        titleId={titleId}
        subtitle={subtitle}
        eyebrowActions={inEyebrow ? <WindowHeaderActions>{actions}</WindowHeaderActions> : undefined}
      />
      {stackNarrow ? <Box className="window-header__tools">{tools}</Box> : tools}
    </Box>
  );
};

export { WindowHeader };
