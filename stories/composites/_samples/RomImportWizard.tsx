/* @layer stories @kind story */
import { useCallback } from 'react';
import { useWizard, WizardDialog, WizardFrame, WizardReview } from '../../../src/composites';
import type { CreateOutcome, WizardApi } from '../../../src/composites';
import { Button, Callout, DropZone, Field, Icon, TermList, TextInput, Toggle } from '../../../src/primitives';
import type { StepperOrientation } from '../../../src/primitives';
import { INITIAL_ROM_IMPORT, ROM_CHECKS, ROM_FILE, ROM_IMPORT_STEPS, romImportReview } from './rom-import-data';
import type { RomImportDraft } from './rom-import-data';

type RomImportWizardProps = {
  title: string;
  orientation: StepperOrientation;
  compact: boolean;
  open?: boolean;
  onExit: () => void;
  onOpened?: (label: string) => void;
};

const RomImportBody = ({ wizard }: { wizard: WizardApi<RomImportDraft> }) => {
  const { values, setValue } = wizard;
  switch (wizard.current.id) {
    case 'file':
      return (
        <>
          <DropZone accept={['.sfc', '.smc']} label="Drop a .sfc or .smc file here" hint={values.file || 'Nothing chosen yet'} onDrop={(files) => setValue('file', files[0]?.name ?? '')} />
          <Button variant="secondary" icon={<Icon name="folder-open" />} onClick={() => setValue('file', ROM_FILE)}>{`Use ${ROM_FILE}`}</Button>
        </>
      );
    case 'check':
      return (
        <>
          <TermList items={ROM_CHECKS} />
          <Callout tone="success" icon={<Icon name="circle-check" />}>This is the ROM Relic of the Past expects. Every check passed.</Callout>
        </>
      );
    case 'assets':
      return (
        <>
          <Field label="Name in the ROM list" required><TextInput value={values.label} onChange={(e) => setValue('label', e.target.value)} /></Field>
          <Toggle checked={values.extractMusic} label="Extract the music" description="Lets an MSU pack replace single tracks." onChange={(on) => setValue('extractMusic', on)} />
          <Toggle checked={values.backupCopy} label="Keep a backup copy" description="Stores an untouched copy next to your profiles." onChange={(on) => setValue('backupCopy', on)} />
        </>
      );
    default:
      return <WizardReview sections={romImportReview(values)} onEdit={wizard.goTo} disabled={wizard.busy} />;
  }
};

const RomImportWizard = (props: RomImportWizardProps) => {
  const { title, orientation, compact, open, onExit, onOpened } = props;
  const onFinish = useCallback(async (draft: RomImportDraft): Promise<CreateOutcome> => {
    await new Promise((resolve) => {
      setTimeout(resolve, 1200);
    });
    return { success: true, id: draft.label };
  }, []);
  const wizard = useWizard({ steps: ROM_IMPORT_STEPS, initialValues: INITIAL_ROM_IMPORT, onFinish, onFinished: onOpened });
  const frame = { wizard, orientation, compactProgress: compact, onExit };
  const body = <RomImportBody wizard={wizard} />;
  return open === undefined
    ? <WizardFrame {...frame} title={title}>{body}</WizardFrame>
    : <WizardDialog {...frame} open={open} title={title}>{body}</WizardDialog>;
};

export { RomImportBody, RomImportWizard };
