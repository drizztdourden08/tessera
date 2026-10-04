/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { ScrollArea } from '../../primitives/ScrollArea';
import { ScreenWindow } from '../ScreenWindow';
import type { InfoScreenProps } from './InfoScreen.type';
import './InfoScreen.css';

const InfoScreen = (props: InfoScreenProps) => {
  const { title, onClose, children, lead, footer, width = 'readable', floating, hidden, className = '' } = props;

  return (
    <ScreenWindow title={title} onClose={onClose} floating={floating} hidden={hidden} className={`info-screen${className ? ` ${className}` : ''}`}>
      <ScrollArea className="info-screen__scroll">
        <Box className={`info-screen__column info-screen__column--${width}`}>
          {lead != null && <Box className="info-screen__lead">{lead}</Box>}
          <Box className="info-screen__sections">{children}</Box>
          {footer != null && <Box as="footer" className="info-screen__footer">{footer}</Box>}
        </Box>
      </ScrollArea>
    </ScreenWindow>
  );
};

export { InfoScreen };
