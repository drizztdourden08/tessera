/* @layer stories @kind story */
import { useState } from 'react';
import type { WizardOrientation, WizardPresentation } from '../../../src/composites';
import { Box, Button, Icon, Span } from '../../../src/primitives';
import { SessionWizard } from './SessionWizard';

type SessionWizardPanelProps = {
  title: string;
  orientation: WizardOrientation;
  presentation: WizardPresentation;
  compact: boolean;
  short?: boolean;
};

const SessionWizardPanel = (props: SessionWizardPanelProps) => {
  const { title, orientation, presentation, compact, short = false } = props;
  const [run, setRun] = useState(0);
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState('Nothing opened yet.');
  const restart = (message: string) => {
    setNote(message);
    setOpen(false);
    setRun(run + 1);
  };
  const wizard = (
    <SessionWizard
      key={run}
      title={title}
      orientation={orientation}
      presentation={presentation}
      compact={compact}
      open={open}
      onExit={() => restart('Left without opening a room.')}
      onOpened={(room) => restart(`${room} is open.`)}
    />
  );
  return (
    <Box className="story-column">
      {presentation === 'dialog'
        ? <Box className="story-row"><Button variant="secondary" icon={<Icon name="plus" />} onClick={() => setOpen(true)}>New session</Button>{wizard}</Box>
        : <Box className={`session-wizard-story${short ? ' session-wizard-story--short' : ''}`}>{wizard}</Box>}
      <Span tone="muted" className="story-label">{note}</Span>
    </Box>
  );
};

export { SessionWizardPanel };
