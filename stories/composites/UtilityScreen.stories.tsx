/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { UtilityScreen } from '../../src/composites';
import { Callout, Icon, SegmentedControl } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { ReleaseNotes } from './_samples/ReleaseNotes';
import { ScreenDemo } from './_samples/ScreenDemo';
import { updateActions } from './_samples/update-actions';
import { UPDATE_STATUS, UPDATE_STEP_LABEL, UPDATE_STEPS } from './_samples/update-states';
import type { UpdateStep } from './_samples/update-states';
import { UpdateSettings } from './_samples/UpdateSettings';
import { isPrerelease, NEWEST_STABLE } from './_samples/update-versions';

type UtilityArgs = {
  step: UpdateStep;
};

const STEP_OPTIONS = UPDATE_STEPS.map((id) => ({ value: id, label: UPDATE_STEP_LABEL[id] }));

const PICKABLE: readonly UpdateStep[] = ['available', 'downloading', 'current'];

const PRERELEASE_NOTE = 'This is a pre-release. It ships before the usual testing, so expect rough edges the stable builds do not have.';

const REPORT = { onClick: () => undefined };

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
      tall
      tools={<SegmentedControl aria-label="Update step" size="sm" options={STEP_OPTIONS} value={step} onChange={setStep} />}
    >
      <UtilityScreen
        title="Check for updates"
        hidden={hidden}
        onClose={() => setHidden(true)}
        status={UPDATE_STATUS[step]}
        progress={step === 'downloading' ? { value: 62, label: 'Downloaded' } : undefined}
        settings={settings}
        notes={notes ? { title: `What is new in ${version}`, children: <ReleaseNotes /> } : undefined}
        report={REPORT}
        actions={updateActions(step, setStep, () => setHidden(true))}
      >
        {settings && isPrerelease(version) && <Callout tone="warning" icon={<Icon name="triangle-alert" size={16} />}>{PRERELEASE_NOTE}</Callout>}
      </UtilityScreen>
    </ScreenDemo>
  );
};

const ARGS: Partial<UtilityArgs> = { step: 'available' };

const ARG_TYPES: PlaygroundArgTypes<UtilityArgs> = {
  step: { group: 'State', control: 'select', options: [...UPDATE_STEPS], description: 'The first step shown. The buttons move between steps.' },
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
} satisfies PlaygroundStory<UtilityArgs>;

const Checking = {
  name: 'Checking',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: () => <UpdateDemo step="checking" />,
} satisfies PlaygroundStory<UtilityArgs>;

const Downloading = {
  name: 'Downloading, with progress',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: () => <UpdateDemo step="downloading" />,
} satisfies PlaygroundStory<UtilityArgs>;

const Failed = {
  name: 'Failed',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: () => <UpdateDemo step="failed" />,
} satisfies PlaygroundStory<UtilityArgs>;

const CODE = `import { Field, Icon, Select, Strong, Toggle, UtilityScreen } from '@drizztdourden08/tessera';

<UtilityScreen
  title="Check for updates"
  onClose={close}
  status={{ tone: 'info', icon: <Icon name="download" />, title: 'Update available', message: <>Version <Strong>0.10.0</Strong> is available</> }}
  settings={<>
    <Toggle label="Include pre-releases" checked={prereleases} onChange={setPrereleases} />
    <Field label="Version to install"><Select value={version} onChange={setVersion} groups={versions} /></Field>
  </>}
  notes={{ title: 'What is new in 0.10.0', children: <ReleaseNotes /> }}
  report={{ onClick: openBugReport }}
  actions={[
    { label: 'Later', variant: 'ghost', onClick: close },
    { label: 'Install', variant: 'primary', onClick: install },
  ]}
/>`;

const Overview = overviewStory({
  component: 'UtilityScreen',
  description: 'A screen for one short task the app runs for the user, such as checking for updates, importing a file or testing a connection. It is a compact ScreenWindow centred over the app, sized to its content up to a readable width, and it holds the page header every screen kind has. The header is the status: a spinner while the task runs or an icon by tone, then the status title, over the fading backdrop. Under it the message sits centred, such as the version line. settings holds the choices that shape the task, such as a toggle for pre-releases and a picker for the version to install. The children are the details, such as a warning. notes is a framed box with a tinted title and its own scroll, for release notes or a log. progress is a bar with its percent under it. The footer stays in view: a red bug button to report an issue on the left, and the buttons on the right, main action last.',
  playground: Playground,
  points: [
    'The status title and the message are live regions: a screen reader reads each new one.',
    'Tones: busy shows a spinner; info, success, warning and danger show their icon and colour. status.icon swaps the icon, such as a download arrow for an update.',
    'report adds one ghost icon button in the danger tone, with a bug icon, Report an issue as its name and the same words in a tooltip.',
    'For a question with two answers, use Dialog. For pages with a side list, use WorkspaceScreen.',
  ],
  variants: [Checking, Downloading, Failed],
  code: CODE,
});

export default meta;
export { Checking, Downloading, Failed, Overview, Playground };
