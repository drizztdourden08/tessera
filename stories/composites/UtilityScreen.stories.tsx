/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { ReleaseNotesPanel, UtilityScreen } from '../../src/composites';
import { Button, Callout, Icon, SegmentedControl } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { ScreenDemo } from './_samples/ScreenDemo';
import { updateActions } from './_samples/update-actions';
import { RELEASE_NOTES, UPDATE_STATUS, UPDATE_STEP_LABEL, UPDATE_STEPS } from './_samples/update-states';
import type { UpdateStep } from './_samples/update-states';
import { UpdateSettings } from './_samples/UpdateSettings';
import { isPrerelease, NEWEST_STABLE } from './_samples/update-versions';

type UtilityArgs = {
  step: UpdateStep;
};

const STEP_OPTIONS = UPDATE_STEPS.map((id) => ({ value: id, label: UPDATE_STEP_LABEL[id] }));

const PICKABLE: readonly UpdateStep[] = ['available', 'downloading', 'current'];

const PRERELEASE_NOTE = 'This is a pre-release. It ships before the usual testing, so expect rough edges the stable builds do not have.';

const FOOTNOTE = {
  text: 'Any earlier version can be picked above if something stops working. Please report it either way, so it gets fixed.',
  action: <Button size="sm" variant="secondary" icon={<Icon name="bug" size={14} />}>Report an issue</Button>,
};

const UpdateDemo = (props: UtilityArgs) => {
  const [step, setStep] = useState<UpdateStep>(props.step);
  const [hidden, setHidden] = useState(false);
  const [prereleases, setPrereleases] = useState(false);
  const [version, setVersion] = useState(NEWEST_STABLE);
  const notes = step === 'available' || step === 'downloading';
  const showPrereleases = (on: boolean) => {
    setPrereleases(on);
    if (!on && isPrerelease(version)) setVersion(NEWEST_STABLE);
  };
  const settings = PICKABLE.includes(step) ? (
    <UpdateSettings prereleases={prereleases} onPrereleases={showPrereleases} version={version} onVersion={setVersion} disabled={step === 'downloading'} />
  ) : undefined;
  return (
    <ScreenDemo
      hidden={hidden}
      onReopen={() => setHidden(false)}
      note="The buttons move between the steps"
      tools={<SegmentedControl aria-label="Update step" size="sm" options={STEP_OPTIONS} value={step} onChange={setStep} />}
    >
      <UtilityScreen
        title="Check for updates"
        hidden={hidden}
        onClose={() => setHidden(true)}
        status={UPDATE_STATUS[step]}
        progress={step === 'downloading' ? { value: 62, label: 'Downloaded' } : undefined}
        settings={settings}
        footnote={FOOTNOTE}
        actions={updateActions(step, setStep, () => setHidden(true))}
      >
        {settings && isPrerelease(version) && <Callout tone="warning" icon={<Icon name="triangle-alert" size={16} />}>{PRERELEASE_NOTE}</Callout>}
        {notes && <ReleaseNotesPanel title={`What is new in ${version}`}>{RELEASE_NOTES}</ReleaseNotesPanel>}
      </UtilityScreen>
    </ScreenDemo>
  );
};

const ARGS: Partial<UtilityArgs> = { step: 'available' };

const ARG_TYPES: StoryLiteArgTypes<UtilityArgs> = {
  step: { control: 'select', options: [...UPDATE_STEPS], description: 'The first step shown. The buttons move between steps.' },
};

const meta = {
  title: 'Composites · Screens/UtilityScreen',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<UtilityArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <UpdateDemo key={args.step} step={args.step} />,
} satisfies StoryLiteStoryDefinition<UtilityArgs>;

const Checking = {
  name: 'Checking',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: () => <UpdateDemo step="checking" />,
} satisfies StoryLiteStoryDefinition<UtilityArgs>;

const Downloading = {
  name: 'Downloading, with progress',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: () => <UpdateDemo step="downloading" />,
} satisfies StoryLiteStoryDefinition<UtilityArgs>;

const Failed = {
  name: 'Failed',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: () => <UpdateDemo step="failed" />,
} satisfies StoryLiteStoryDefinition<UtilityArgs>;

const CODE = `import { Button, Field, ReleaseNotesPanel, Select, Toggle, UtilityScreen } from '@drizztdourden08/tessera';

<UtilityScreen
  title="Check for updates"
  onClose={close}
  status={{ tone: 'info', title: 'Version 0.10.0 is ready', message: 'You have 0.9.2.' }}
  settings={<>
    <Toggle label="Include pre-releases" checked={prereleases} onChange={setPrereleases} />
    <Field label="Version to install"><Select value={version} onChange={setVersion} groups={versions} /></Field>
  </>}
  footnote={{ text: 'Please report anything that stops working.', action: <Button size="sm" variant="secondary">Report an issue</Button> }}
  actions={[
    { label: 'Later', variant: 'ghost', onClick: close },
    { label: 'Install', variant: 'primary', onClick: install },
  ]}
>
  <ReleaseNotesPanel>{notes}</ReleaseNotesPanel>
</UtilityScreen>`;

const Overview = overviewStory({
  component: 'UtilityScreen',
  description: 'A screen for one short task the app runs for the user, such as checking for updates, importing a file or testing a connection. It is a compact ScreenWindow centred over the app, sized to its content up to a readable width. The status sits on top: a spinner while the task runs, or an icon by tone, then a title and a message. progress adds a bar under it. settings holds the choices that shape the task, such as a toggle for pre-releases and a picker for the version to install. The children are the details, such as release notes, and they scroll with the settings. footnote is a fine print bar above the buttons that stays in view, with an optional action at its end, such as a button to report an issue. actions is the row of buttons at the bottom, main action last.',
  playground: Playground,
  points: [
    'The status is a live region: a screen reader reads each new title and message.',
    'Tones: busy shows a spinner; info, success, warning and danger show their icon and colour.',
    'For a question with two answers, use Dialog. For pages with a side list, use WorkspaceScreen.',
  ],
  variants: [Checking, Downloading, Failed],
  code: CODE,
});

export default meta;
export { Checking, Downloading, Failed, Overview, Playground };
