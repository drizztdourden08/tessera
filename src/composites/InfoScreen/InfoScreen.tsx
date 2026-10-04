/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { useHeaderOptOutCheck } from '../ScreenPage/behavior/useHeaderOptOutCheck';
import { ScreenPage } from '../ScreenPage';
import { ScreenWindow } from '../ScreenWindow';
import type { InfoScreenProps } from './InfoScreen.type';
import './InfoScreen.css';

const InfoScreen = (props: InfoScreenProps) => {
  const { title, icon, heading, onClose, children, lead, footer, width = 'readable', backdrop, floating, hidden, className = '' } = props;
  useHeaderOptOutCheck('InfoScreen', props);

  return (
    <ScreenWindow title={title} onClose={onClose} floating={floating} hidden={hidden} className={`info-screen${className ? ` ${className}` : ''}`}>
      <ScreenPage icon={icon} title={heading} backdrop={backdrop}>
        <Box className={`info-screen__column info-screen__column--${width}`}>
          {lead != null && <Box className="info-screen__lead">{lead}</Box>}
          <Box className="info-screen__sections">{children}</Box>
          {footer != null && <Box as="footer" className="info-screen__footer">{footer}</Box>}
        </Box>
      </ScreenPage>
    </ScreenWindow>
  );
};

export { InfoScreen };
