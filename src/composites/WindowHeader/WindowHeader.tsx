/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Box } from '../../primitives/Box';
import { Icon } from '../../primitives/Icon';
import { IconButton } from '../../primitives/IconButton';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { headerClass } from './behavior/header-class';
import { useExtraFit } from './behavior/useExtraFit';
import { WindowHeaderBack } from './sub-components/WindowHeaderBack';
import { WindowHeaderTitles } from './sub-components/WindowHeaderTitles';
import '../../theme/window-chrome.css';
import './WindowHeader.css';
import { type WindowHeaderProps } from './WindowHeader.type';

const WindowHeader = (props: WindowHeaderProps) => {
  const { look, eyebrow, title, titleWrap, titleId, subtitle, onClose, back, extra, actions, className = '' } = props;
  const { common } = useTesseraStrings();
  const headerRef = useRef<HTMLElement>(null);
  const extraFits = useExtraFit(headerRef, extra != null);
  return (
    <Box ref={headerRef} className={headerClass(titleWrap, className, look)}>
      {back && <WindowHeaderBack back={back} />}
      <WindowHeaderTitles eyebrow={eyebrow} title={title} titleId={titleId} subtitle={subtitle} />
      {extra != null && (
        <Box className={`window-header__extra${extraFits ? '' : ' window-header__extra--away'}`} aria-hidden={extraFits ? undefined : true}>{extra}</Box>
      )}
      {actions != null && <Box className="window-header__actions">{actions}</Box>}
      {onClose && (
        <IconButton variant="ghost" size="md" label={common.close} className="window-header__close" onClick={onClose}><Icon name="x" size={20} /></IconButton>
      )}
    </Box>
  );
};

export { WindowHeader };
