/* @layer stories @kind story */
import { useState } from 'react';
import { Box, Button, Icon, Span } from '../../../src/primitives';
import type { StepperOrientation } from '../../../src/primitives';
import { RomImportWizard } from './RomImportWizard';

type RomImportDialogDemoProps = { title: string; orientation: StepperOrientation; compact: boolean };

const RomImportDialogDemo = (props: RomImportDialogDemoProps) => {
  const { title, orientation, compact } = props;
  const [run, setRun] = useState(0);
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState('No ROM imported yet.');
  const restart = (message: string) => {
    setNote(message);
    setOpen(false);
    setRun(run + 1);
  };
  return (
    <Box className="story-column">
      <Box className="story-row">
        <Button variant="secondary" icon={<Icon name="upload" />} onClick={() => setOpen(true)}>Import ROM</Button>
      </Box>
      <RomImportWizard
        key={run}
        title={title}
        orientation={orientation}
        compact={compact}
        open={open}
        onExit={() => restart('Left without importing.')}
        onOpened={(label) => restart(`${label} is imported and its assets are extracted.`)}
      />
      <Span tone="muted" className="story-label">{note}</Span>
    </Box>
  );
};

export { RomImportDialogDemo };
