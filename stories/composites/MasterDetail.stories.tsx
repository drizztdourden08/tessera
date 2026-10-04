/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { MasterDetailGuardLook } from '../../src/composites';
import { overviewStory } from '../_template/overview-story';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import type { StateProps } from '../_template/states/states.type';
import type { PresetsDemoProps } from './_samples/preset-samples.type';
import { PresetsDemo } from './_samples/PresetsDemo';
import './MasterDetail.stories.css';

type MasterDetailArgs = {
  guard: MasterDetailGuardLook;
  startDirty: boolean;
  narrow: boolean;
};

const ARGS: Partial<MasterDetailArgs> = { guard: 'dialog', startDirty: true, narrow: false };

const ARG_TYPES: PlaygroundArgTypes<MasterDetailArgs> = {
  guard: { group: 'Behaviour', control: 'select', options: ['dialog', 'inline'], description: 'Ask in a dialog, or in a bar at the top of the editor.' },
  startDirty: { group: 'State', control: 'boolean', description: 'Keysanity starts with two edits not saved: pick another preset to see the question.' },
  narrow: { group: 'Layout', control: 'boolean', description: 'A 512 px frame: the list, then the editor with Back, which asks too.' },
};

const meta = {
  title: 'Composites · Layout/MasterDetail',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<MasterDetailArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <PresetsDemo key={`${args.guard}-${String(args.startDirty)}`} {...args} />,
} satisfies PlaygroundStory<MasterDetailArgs>;

const Dialog = {
  name: 'Unsaved edits: the question in a dialog',
  render: () => <PresetsDemo startDirty />,
} satisfies StoryLiteStoryDefinition<MasterDetailArgs>;

const Inline = {
  name: 'Unsaved edits: the question over the editor',
  render: () => <PresetsDemo startDirty guard="inline" />,
} satisfies StoryLiteStoryDefinition<MasterDetailArgs>;

const Narrow = {
  name: 'A small window: Back asks too',
  render: () => <PresetsDemo startDirty narrow guard="inline" />,
} satisfies StoryLiteStoryDefinition<MasterDetailArgs>;

const CODE = `import { MasterDetail } from '@drizztdourden08/tessera';

<MasterDetail
  list={{
    title: 'Presets',
    items: presets,
    getId: (preset) => preset.id,
    getName: (preset) => preset.name,
    groupBy: (preset) => preset.game,
    onCreate: createPreset,
    onRename: renamePreset,
    onDelete: deletePreset,
  }}
  selectedId={selectedId}
  onSelect={setSelectedId}
  detail={<PresetEditor preset={draft} onChange={setDraft} />}
  dirty={draft !== saved}
  onSave={savePreset}
  onDiscard={() => setDraft(saved)}
  storageKey="presets.list-width"
/>`;

const Overview = overviewStory({
  component: 'MasterDetail',
  description: 'A [ManagedList] beside the editor of the picked item, that asks before a pick, New or Back throws unsaved edits away.',
  points: [
    '`list` takes the [ManagedList] props; `selectedId` and `onSelect` pick the item the editor shows.',
    'With `dirty`, a pick, New or Back asks first: Stay here, Discard, or Save and open with `onSave`.',
    '`onSave` may return a promise; false, or a failure, keeps the user on the edited item.',
    '`guard` is `dialog`, the confirm dialog of Tessera, or `inline`, a bar at the top of the editor.',
    'The layout is [MasterDetailLayout]: it stacks under 768 px, with Back, and `storageKey` keeps its width.',
  ],
  instead: '[MasterDetailLayout] for a list and a detail with nothing to save.',
  playground: Playground,
  variants: [Dialog, Inline, Narrow],
  states: {
    render: (props: StateProps) => <PresetsDemo {...(props as PresetsDemoProps)} />,
    list: [
      { name: 'nothing picked', props: { startEmpty: true } },
      { name: 'saved', props: {} },
      { name: 'unsaved edits', props: { startDirty: true } },
    ],
  },
  code: CODE,
});

export default meta;
export { Dialog, Inline, Narrow, Overview, Playground };
