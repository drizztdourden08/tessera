/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { Paragraph } from '../../primitives/text-elements';
import { useHeaderOptOutCheck } from '../ScreenPage/behavior/useHeaderOptOutCheck';
import { ScreenPage } from '../ScreenPage';
import { ScreenWindow } from '../ScreenWindow';
import { NO_ACTIONS } from './UtilityScreen.constants';
import { UtilityFooter } from './sub-components/UtilityFooter';
import { UtilityMark } from './sub-components/UtilityMark';
import { UtilityNotes } from './sub-components/UtilityNotes';
import { UtilityProgress } from './sub-components/UtilityProgress';
import type { UtilityScreenProps } from './UtilityScreen.type';
import './UtilityScreen.css';

const UtilityScreen = (props: UtilityScreenProps) => {
  const { title, onClose, status, progress, settings, notes, children, report, actions = NO_ACTIONS, backdrop, hidden, className = '' } = props;
  const hasFooter = report !== undefined || actions.length > 0;
  useHeaderOptOutCheck('UtilityScreen', props);

  return (
    <ScreenWindow title={title} onClose={onClose} hidden={hidden} size="compact" className={`utility-screen utility-screen--${status.tone}${className ? ` ${className}` : ''}`}>
      <ScreenPage
        icon={<UtilityMark status={status} />}
        title={status.title}
        live
        backdrop={backdrop}
        footer={hasFooter ? <UtilityFooter report={report} actions={actions} /> : undefined}
        bodyClassName="utility-screen__body"
      >
        <Box className="utility-screen__column">
          {status.message != null && <Paragraph className="utility-screen__message" aria-live="polite">{status.message}</Paragraph>}
          {settings != null && <Box className="utility-screen__settings">{settings}</Box>}
          {children}
          {notes && <UtilityNotes notes={notes} />}
          {progress && <UtilityProgress progress={progress} />}
        </Box>
      </ScreenPage>
    </ScreenWindow>
  );
};

export { UtilityScreen };
