/* @layer stories @kind story */
import { useCallback } from 'react';
import { useWizard, WizardFrame, WizardReview } from '../../../src/composites';
import type { CreateOutcome, WizardApi, WizardOrientation, WizardPresentation } from '../../../src/composites';
import { Field, NumberInput, RadioGroup, Select, TextInput } from '../../../src/primitives';
import { INITIAL_SESSION_DRAFT, RELEASE_MODES, SESSION_PRESETS, SESSION_SERVERS, SESSION_STEPS, sessionReview } from './session-wizard-data';
import type { SessionDraft } from './session-wizard-data';

type SessionWizardProps = {
  title: string;
  orientation: WizardOrientation;
  presentation: WizardPresentation;
  compact: boolean;
  open?: boolean;
  onExit: () => void;
  onOpened?: (room: string) => void;
};

const SessionBody = ({ wizard }: { wizard: WizardApi<SessionDraft> }) => {
  const { values, setValue } = wizard;
  switch (wizard.current.id) {
    case 'preset':
      return <Field label="Game preset"><Select options={SESSION_PRESETS} value={values.preset} onChange={(value) => setValue('preset', value)} /></Field>;
    case 'players':
      return (
        <>
          <Field label="Player slots" hint="Up to 32."><NumberInput value={values.slots} min={1} max={40} onChange={(value) => setValue('slots', value)} /></Field>
          <RadioGroup label="Release" value={values.release} options={RELEASE_MODES} onChange={(value) => setValue('release', value)} />
        </>
      );
    case 'server':
      return (
        <>
          <Field label="Room name" required><TextInput value={values.name} placeholder="Friday async" onChange={(e) => setValue('name', e.target.value)} /></Field>
          <Field label="Server"><Select options={SESSION_SERVERS} value={values.server} onChange={(value) => setValue('server', value)} /></Field>
        </>
      );
    default:
      return <WizardReview sections={sessionReview(values)} onEdit={wizard.goTo} disabled={wizard.busy} />;
  }
};

const SessionWizard = (props: SessionWizardProps) => {
  const { title, orientation, presentation, compact, open, onExit, onOpened } = props;
  const onFinish = useCallback(async (draft: SessionDraft): Promise<CreateOutcome> => {
    await new Promise((resolve) => {
      setTimeout(resolve, 900);
    });
    return { success: true, id: draft.name };
  }, []);
  const wizard = useWizard({ steps: SESSION_STEPS, initialValues: INITIAL_SESSION_DRAFT, onFinish, onFinished: onOpened });
  return (
    <WizardFrame
      wizard={wizard}
      title={title}
      orientation={orientation}
      presentation={presentation}
      compactProgress={compact}
      open={open}
      onExit={onExit}
      finishLabel="Open room"
      busyLabel="Opening room..."
    >
      <SessionBody wizard={wizard} />
    </WizardFrame>
  );
};

export { SessionBody, SessionWizard };
