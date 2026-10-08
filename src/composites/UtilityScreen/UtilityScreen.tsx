/* @layer renderer-components @kind component */
import { Paragraph } from '../../primitives/text-elements';
import { ScrollArea } from '../../primitives/ScrollArea';
import { Box } from '../../primitives/Box';
import { rawError } from '../LoadError/behavior/raw-error';
import { LoadErrorDetails } from '../LoadError/sub-components/LoadErrorDetails';
import { useHeaderOptOutCheck } from '../ScreenPage/behavior/useHeaderOptOutCheck';
import { ScreenWindow } from '../ScreenWindow';
import { NO_ACTIONS } from './UtilityScreen.constants';
import { UtilityFooter } from './sub-components/UtilityFooter';
import { UtilityMark } from './sub-components/UtilityMark';
import { UtilityNotes } from './sub-components/UtilityNotes';
import { UtilityProgress } from './sub-components/UtilityProgress';
import type { UtilityScreenProps } from './UtilityScreen.type';
import './UtilityScreen.css';

const UtilityScreen = (props: UtilityScreenProps) => {
  const { onClose, status, progress, settings, notes, children, report, actions = NO_ACTIONS, backdrop, hidden, className = '' } = props;
  useHeaderOptOutCheck('UtilityScreen', props);
  const raw = rawError(status.error);

  return (
    <ScreenWindow
      title={status.title}
      header={{ icon: <UtilityMark status={status} />, backdrop, live: true }}
      onClose={onClose}
      hidden={hidden}
      size="compact"
      className={`utility-screen utility-screen--${status.tone}${className ? ` ${className}` : ''}`}
    >
      <ScrollArea className="utility-screen__body">
        {status.message != null && <Paragraph className="utility-screen__message" aria-live="polite">{status.message}</Paragraph>}
        {raw !== null && <LoadErrorDetails raw={raw} center />}
        {settings != null && <Box className="utility-screen__settings">{settings}</Box>}
        {children}
        {notes && <UtilityNotes notes={notes} />}
        {progress && <UtilityProgress progress={progress} />}
      </ScrollArea>
      <UtilityFooter report={report} actions={actions} />
    </ScreenWindow>
  );
};

export { UtilityScreen };
