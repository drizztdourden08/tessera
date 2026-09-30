/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { Text } from '../../primitives/Text';
import { Glyph } from '../../primitives/Glyph';
import { IconButton } from '../../primitives/IconButton';
import './WindowHeader.css';
import { type WindowHeaderProps } from './WindowHeader.type';

const WindowHeader = (props: WindowHeaderProps) => {
  const { title, titleId, subtitle, onClose, extra, className = '' } = props;
  return (
    <Box className={`window-header${className ? ` ${className}` : ''}`}>
      <Box className="window-header__titles">
        <Text as="h3" id={titleId} className="window-header__title">{title}</Text>
        {subtitle && <Text className="window-header__subtitle">{subtitle}</Text>}
      </Box>
      {extra && <Box className="window-header__extra">{extra}</Box>}
      {onClose && (
        <IconButton variant="ghost" size="md" label="Close" className="window-header__close" onClick={onClose}><Glyph name="close" size={20} /></IconButton>
      )}
    </Box>
  );
};

export { WindowHeader };
