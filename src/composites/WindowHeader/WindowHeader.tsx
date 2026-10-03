/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Box } from '../../primitives/Box';
import { Text } from '../../primitives/Text';
import { Glyph } from '../../primitives/Glyph';
import { IconButton } from '../../primitives/IconButton';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { useExtraFit } from './behavior/useExtraFit';
import './WindowHeader.css';
import { type WindowHeaderProps } from './WindowHeader.type';

const WindowHeader = (props: WindowHeaderProps) => {
  const { title, titleId, subtitle, onClose, extra, className = '' } = props;
  const { common } = useTesseraStrings();
  const headerRef = useRef<HTMLElement>(null);
  const extraFits = useExtraFit(headerRef, extra != null);
  return (
    <Box ref={headerRef} className={`window-header${className ? ` ${className}` : ''}`}>
      <Box className="window-header__titles">
        <Text as="h3" id={titleId} className="window-header__title">{title}</Text>
        {subtitle && <Text className="window-header__subtitle">{subtitle}</Text>}
      </Box>
      {extra != null && (
        <Box className={`window-header__extra${extraFits ? '' : ' window-header__extra--away'}`} aria-hidden={extraFits ? undefined : true}>{extra}</Box>
      )}
      {onClose && (
        <IconButton variant="ghost" size="md" label={common.close} className="window-header__close" onClick={onClose}><Glyph name="close" size={20} /></IconButton>
      )}
    </Box>
  );
};

export { WindowHeader };
