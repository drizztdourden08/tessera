/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Box } from '../../primitives/Box';
import { Text } from '../../primitives/Text';
import { Icon } from '../../primitives/Icon';
import { IconButton } from '../../primitives/IconButton';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { useExtraFit } from './behavior/useExtraFit';
import './WindowHeader.css';
import { type WindowHeaderProps } from './WindowHeader.type';

const WindowHeader = (props: WindowHeaderProps) => {
  const { title, titleId, subtitle, onClose, back, extra, className = '' } = props;
  const { common, navigation } = useTesseraStrings();
  const headerRef = useRef<HTMLElement>(null);
  const extraFits = useExtraFit(headerRef, extra != null);
  return (
    <Box ref={headerRef} className={`window-header${className ? ` ${className}` : ''}`}>
      {back && (
        <IconButton variant="ghost" size="md" label={back.label === undefined ? navigation.back : navigation.backTo(back.label)} className="window-header__back" onClick={back.onSelect}>
          <Icon name="arrow-left" size={18} />
        </IconButton>
      )}
      <Box className="window-header__titles">
        <Text as="h3" id={titleId} className="window-header__title">{title}</Text>
        {subtitle && <Text className="window-header__subtitle">{subtitle}</Text>}
      </Box>
      {extra != null && (
        <Box className={`window-header__extra${extraFits ? '' : ' window-header__extra--away'}`} aria-hidden={extraFits ? undefined : true}>{extra}</Box>
      )}
      {onClose && (
        <IconButton variant="ghost" size="md" label={common.close} className="window-header__close" onClick={onClose}><Icon name="x" size={20} /></IconButton>
      )}
    </Box>
  );
};

export { WindowHeader };
