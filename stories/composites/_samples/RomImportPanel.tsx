/* @layer stories @kind story */
import { useState } from 'react';
import type { WizardOrientation, WizardPresentation } from '../../../src/composites';
import { Box, Button, Icon, Span } from '../../../src/primitives';
import { RomImportWizard } from './RomImportWizard';

type RomImportPanelProps = {
  title: string;
  orientation: WizardOrientation;
  presentation: WizardPresentation;
  compact: boolean;
  short?: boolean;
};

const RomImportPanel = (props: RomImportPanelProps) => {
  const { title, orientation, presentation, compact, short = false } = props;
  const [run, setRun] = useState(0);
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState('No ROM imported yet.');
  const restart = (message: string) => {
    setNote(message);
    setOpen(false);
    setRun(run + 1);
  };
  const wizard = (
    <RomImportWizard
      key={run}
      title={title}
      orientation={orientation}
      presentation={presentation}
      compact={compact}
      open={open}
      onExit={() => restart('Left without importing.')}
      onOpened={(label) => restart(`${label} is imported and its assets are extracted.`)}
    />
  );
  return (
    <Box className="story-column">
      {presentation === 'dialog'
        ? <Box className="story-row"><Button variant="secondary" icon={<Icon name="upload" />} onClick={() => setOpen(true)}>Import ROM</Button>{wizard}</Box>
        : <Box className={`rom-import-story${short ? ' rom-import-story--short' : ''}`}>{wizard}</Box>}
      <Span tone="muted" className="story-label">{note}</Span>
    </Box>
  );
};

export { RomImportPanel };
