/* @layer stories @kind story */
import { useState } from 'react';
import { Box, Span } from '../../../src/primitives';
import type { StepperOrientation } from '../../../src/primitives';
import { RomImportWizard } from './RomImportWizard';

type RomImportPanelProps = {
  title: string;
  orientation: StepperOrientation;
  compact: boolean;
  short?: boolean;
};

const RomImportPanel = (props: RomImportPanelProps) => {
  const { title, orientation, compact, short = false } = props;
  const [run, setRun] = useState(0);
  const [note, setNote] = useState('No ROM imported yet.');
  const restart = (message: string) => {
    setNote(message);
    setRun(run + 1);
  };
  return (
    <Box className="story-column">
      <Box className={`rom-import-story${short ? ' rom-import-story--short' : ''}`}>
        <RomImportWizard
          key={run}
          title={title}
          orientation={orientation}
          compact={compact}
          onExit={() => restart('Left without importing.')}
          onOpened={(label) => restart(`${label} is imported and its assets are extracted.`)}
        />
      </Box>
      <Span tone="muted" className="story-label">{note}</Span>
    </Box>
  );
};

export { RomImportPanel };
