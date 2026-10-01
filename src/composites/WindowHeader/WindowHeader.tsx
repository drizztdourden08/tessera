/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { Text } from '../../primitives/Text';
import { Glyph } from '../../primitives/Glyph';
import { IconButton } from '../../primitives/IconButton';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import './WindowHeader.css';
import { type WindowHeaderProps } from './WindowHeader.type';

const WindowHeader = (props: WindowHeaderProps) => {
  const { title, titleId, subtitle, onClose, extra, className = '' } = props;
  const { common } = useTesseraStrings();
  return (
    <Box className={`window-header${className ? ` ${className}` : ''}`}>
      <Box className="window-header__titles">
        <Text as="h3" id={titleId} className="window-header__title">{title}</Text>
        {subtitle && <Text className="window-header__subtitle">{subtitle}</Text>}
      </Box>
      {extra && <Box className="window-header__extra">{extra}</Box>}
      {onClose && (
        <IconButton variant="ghost" size="md" label={common.close} className="window-header__close" onClick={onClose}><Glyph name="close" size={20} /></IconButton>
      )}
    </Box>
  );
};

export { WindowHeader };
