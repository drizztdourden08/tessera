/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { Button } from '../../primitives/Button';
import { ButtonRow } from '../../primitives/ButtonRow';
import { Callout } from '../../primitives/Callout';
import { ProgressBar } from '../../primitives/ProgressBar';
import { ScrollArea } from '../../primitives/ScrollArea';
import { ScreenWindow } from '../ScreenWindow';
import { NO_ACTIONS } from './UtilityScreen.constants';
import { UtilityStatus } from './sub-components/UtilityStatus';
import type { UtilityScreenProps } from './UtilityScreen.type';
import './UtilityScreen.css';

const UtilityScreen = (props: UtilityScreenProps) => {
  const { title, onClose, status, progress, settings, children, footnote, actions = NO_ACTIONS, hidden, className = '' } = props;

  return (
    <ScreenWindow title={title} onClose={onClose} hidden={hidden} size="compact" className={`utility-screen${className ? ` ${className}` : ''}`}>
      <ScrollArea className="utility-screen__body">
        <UtilityStatus status={status} />
        {progress && <ProgressBar value={progress.value} max={progress.max} label={progress.label} live />}
        {settings != null && <Box className="utility-screen__settings">{settings}</Box>}
        {children != null && <Box className="utility-screen__details">{children}</Box>}
      </ScrollArea>
      {footnote && <Callout variant="footnote" action={footnote.action} className="utility-screen__footnote">{footnote.text}</Callout>}
      {actions.length > 0 && (
        <ButtonRow className="utility-screen__actions">
          {actions.map((action) => (
            <Button key={action.label} variant={action.variant ?? 'secondary'} disabled={action.disabled} loading={action.loading} onClick={action.onClick}>
              {action.label}
            </Button>
          ))}
        </ButtonRow>
      )}
    </ScreenWindow>
  );
};

export { UtilityScreen };
