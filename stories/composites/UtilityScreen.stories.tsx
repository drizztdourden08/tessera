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

const REPORT = {
  onSelect: () => undefined,
  footnote: 'Any earlier version can be picked above if something stops working. Please report it either way, so it gets fixed.',
};

const UpdateDemo = (props: UtilityArgs & { phone?: boolean }) => {
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
      phone={props.phone}
      tools={<SegmentedControl aria-label="Update step" size="sm" options={STEP_OPTIONS} value={step} onChange={setStep} />}
    >
      <UtilityScreen
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

const Narrow = {
  name: 'In a narrow box',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: () => <UpdateDemo step="available" phone />,
} satisfies PlaygroundStory<UtilityArgs>;

const CODE = `import { Field, Icon, Select, Strong, Toggle, UtilityScreen } from '@drizztdourden08/tessera';

<UtilityScreen
  onClose={close}
  status={{ tone: 'info', icon: <Icon name="download" />, title: 'Update available', message: <>Version <Strong>0.10.0</Strong> is available</> }}
  settings={<>
    <Toggle label="Include pre-releases" checked={prereleases} onChange={setPrereleases} />
    <Field label="Version to install"><Select value={version} onChange={setVersion} groups={versions} /></Field>
  </>}
  notes={{ title: 'What is new in 0.10.0', children: <ReleaseNotes /> }}
  report={{ onSelect: openBugReport, footnote: 'Any earlier version can be picked above if something stops working.' }}
  actions={[
    { label: 'Later', tone: 'tertiary', onSelect: close },
    { label: 'Install', tone: 'primary', onSelect: install },
  ]}
/>`;

const Overview = overviewStory({
  component: 'UtilityScreen',
  description: 'A compact screen for one short task the app runs, such as checking for updates, importing a file or testing a connection.',
  points: [
    '`status` is the window header, beside the close button: a spinner while `busy`, or the icon of its tone.',
    '`settings` holds the choices that shape the task; the children hold details such as a warning.',
    '`notes` is a framed box with its own scroll, for release notes or a log; `progress` adds a bar.',
    '`report` adds a red bug button over a rule, with an optional `footnote`; `actions` sit under it, main action last.',
    'The layout copies the rotp update dialog: one column with one gap, and no card inside the window.',
    'In a narrow or short box the card fills it, the body scrolls and the actions stay in view.',
  ],
  instead: '[Dialog] for a question with two answers, or [WorkspaceScreen] for pages with a side list.',
  playground: Playground,
  variants: [Checking, Downloading, Failed, Narrow],
  code: CODE,
});

export default meta;
export { Checking, Downloading, Failed, Narrow, Overview, Playground };
