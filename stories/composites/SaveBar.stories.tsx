/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { SaveBar } from '../../src/composites';
import type { SaveBarState } from '../../src/composites';
import { Box } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import type { StateProps } from '../_template/states/states.type';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { PresetsDemo } from './_samples/PresetsDemo';
import { SaveBarPresetDemo } from './_samples/SaveBarPresetDemo';
import './ListDetail.stories.css';
import './SaveBar.stories.css';

type SaveBarArgs = {
  state: SaveBarState;
  error: string;
  discard: boolean;
};

const STATES: readonly SaveBarState[] = ['clean', 'dirty', 'saving', 'saved', 'error'];

const DISK_FULL = 'The disk is full. Free some space and save again.';

const noop = (): void => undefined;

const ARGS: Partial<SaveBarArgs> = { state: 'dirty', error: DISK_FULL, discard: true };

const ARG_TYPES: PlaygroundArgTypes<SaveBarArgs> = {
  state: { group: 'State', control: 'select', options: [...STATES] },
  error: { group: 'Content', control: 'text', description: 'Why the save failed, shown with the error state.' },
  discard: { group: 'Behaviour', control: 'boolean', description: 'Passes onDiscard, which adds Discard.' },
};

const meta = {
  title: 'Composites · Forms/SaveBar',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<SaveBarArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <Box className="save-bar-story save-bar-story--strip">
      <SaveBar state={args.state} error={args.error || undefined} onSave={noop} onDiscard={args.discard ? noop : undefined} />
    </Box>
  ),
} satisfies PlaygroundStory<SaveBarArgs>;

const Preset = {
  name: 'The preset editor: change a value, then Save or Discard; a tower with no crystal fails to save',
  render: () => <SaveBarPresetDemo />,
} satisfies StoryLiteStoryDefinition<SaveBarArgs>;

const Beside = {
  name: 'In ListDetail: the bar at the foot of the editor, the question over it on a pick',
  render: () => <PresetsDemo startDirty />,
} satisfies StoryLiteStoryDefinition<SaveBarArgs>;

const CODE = `import { SaveBar } from '@drizztdourden08/tessera';

<section>
  <PresetFields preset={draft} onChange={setDraft} />
  <SaveBar state={saveState} error={saveError} onSave={save} onDiscard={() => setDraft(saved)} />
</section>`;

const Overview = overviewStory({
  component: 'SaveBar',
  description: 'The bar at the foot of an editor: whether its edits are saved, why a save failed, and Save and Discard.',
  points: [
    'Put it last in the editor: it sticks to the foot of the scrolling area.',
    '`state` is `clean`, `dirty`, `saving`, `saved` or `error`; the app owns it and the bar draws it.',
    'In the `error` state the bar says Not saved and shows the reason from `error` beside it.',
    'Save and Discard are off while there is nothing to save, and Save spins while it saves.',
    '`onDiscard` adds Discard; `saveLabel` and `discardLabel` rename the buttons.',
    '**Leaving is another question:** [ListDetail] asks before a pick throws the edits away.',
  ],
  instead: '[WizardNav] for the steps of one task, or [SettingsRow] for settings that apply at once.',
  playground: Playground,
  variants: [Preset, Beside],
  states: {
    render: (props: StateProps) => (
      <Box className="save-bar-story save-bar-story--strip">
        <SaveBar state="clean" onSave={noop} onDiscard={noop} {...props} />
      </Box>
    ),
    list: STATES.map((state) => ({ name: state, props: { state, error: state === 'error' ? DISK_FULL : undefined } })),
  },
  code: CODE,
});

export default meta;
export { Beside, Overview, Playground, Preset };
