/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { ListDetailGuardLook } from '../../src/composites';
import { overviewStory } from '../_template/overview-story';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import type { StateProps } from '../_template/states/states.type';
import type { PresetsDemoProps } from './_samples/preset-samples.type';
import { PresetsDemo } from './_samples/PresetsDemo';
import './ListDetail.stories.css';

type ListDetailArgs = {
  guard: ListDetailGuardLook;
  startDirty: boolean;
  startCollapsed: boolean;
  narrow: boolean;
};

const ARGS: Partial<ListDetailArgs> = { guard: 'inline', startDirty: true, startCollapsed: false, narrow: false };

const ARG_TYPES: PlaygroundArgTypes<ListDetailArgs> = {
  guard: { group: 'Behaviour', control: 'select', options: ['inline', 'dialog'], description: 'Ask in a bar at the top of the editor, or in a dialog.' },
  startDirty: { group: 'State', control: 'boolean', description: 'Keysanity starts with three edits not saved: pick another preset to see the question.' },
  startCollapsed: { group: 'State', control: 'boolean', description: 'The list starts folded to a rail; its button brings it back.' },
  narrow: { group: 'Layout', control: 'boolean', description: 'A 512 px frame: the list, then the editor with Back, which asks too.' },
};

const meta = {
  title: 'Composites · Layout/ListDetail',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ListDetailArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <PresetsDemo key={`${args.guard}-${String(args.startDirty)}-${String(args.startCollapsed)}`} {...args} />,
} satisfies PlaygroundStory<ListDetailArgs>;

const Presets = {
  name: 'Presets: the list, the editor of the picked preset and its SaveBar',
  render: () => <PresetsDemo tall />,
} satisfies StoryLiteStoryDefinition<ListDetailArgs>;

const Collapsed = {
  name: 'The list folded to a rail, for more room to edit',
  render: () => <PresetsDemo tall startCollapsed />,
} satisfies StoryLiteStoryDefinition<ListDetailArgs>;

const Inline = {
  name: 'Unsaved edits: the question over the editor, the default',
  render: () => <PresetsDemo startDirty />,
} satisfies StoryLiteStoryDefinition<ListDetailArgs>;

const Dialog = {
  name: 'Unsaved edits: the question in a dialog',
  render: () => <PresetsDemo startDirty guard="dialog" />,
} satisfies StoryLiteStoryDefinition<ListDetailArgs>;

const Narrow = {
  name: 'A small window: Back asks too',
  render: () => <PresetsDemo startDirty narrow />,
} satisfies StoryLiteStoryDefinition<ListDetailArgs>;

const CODE = `import { ListDetail, SaveBar } from '@drizztdourden08/tessera';

<ListDetail
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
  detail={draft && (
    <>
      <PresetFields preset={draft} onChange={setDraft} />
      <SaveBar state={saveState} onSave={savePreset} onDiscard={() => setDraft(saved)} />
    </>
  )}
  dirty={draft !== saved}
  onSave={savePreset}
  onDiscard={() => setDraft(saved)}
  storageKey="presets.list"
/>`;

const Overview = overviewStory({
  component: 'ListDetail',
  description: 'An [ItemList] beside the editor of the picked item, that asks before a pick, New or Back throws unsaved edits away.',
  points: [
    '`list` takes the [ItemList] props; `selectedId` and `onSelect` pick the item the editor shows.',
    'With `dirty`, a pick, New or Back asks first: Keep editing, Discard, or Save and open with `onSave`.',
    '`onSave` may return a promise; false, or a failure, keeps the user on the edited item.',
    '`guard` is `inline`, a bar over the editor, by default, or `dialog`, the confirm dialog of Tessera.',
    'Put a [SaveBar] at the foot of the editor for Save and Discard while the user stays on the item.',
    'The panes, the resize, the fold to a rail and the small window are [ListDetailLayout]: its props pass through.',
  ],
  instead: '[ListDetailLayout] for a list and a detail with nothing to save.',
  playground: Playground,
  variants: [Presets, Collapsed, Inline, Dialog, Narrow],
  states: {
    render: (props: StateProps) => <PresetsDemo {...(props as PresetsDemoProps)} />,
    list: [
      { name: 'nothing picked', props: { startEmpty: true } },
      { name: 'saved', props: {} },
      { name: 'unsaved edits', props: { startDirty: true } },
      { name: 'list folded', props: { startCollapsed: true } },
    ],
  },
  code: CODE,
});

export default meta;
export { Collapsed, Dialog, Inline, Narrow, Overview, Playground, Presets };
