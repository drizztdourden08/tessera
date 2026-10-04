/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PathKind } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { DATA_PATH, KEY_PATH, ZIP_PATH } from './_samples/path-samples.constants';
import { PathFieldDemo } from './_samples/PathFieldDemo';
import type { PathFieldDemoProps } from './_samples/PathFieldDemo.type';
import './PathField.stories.css';

type PathFieldArgs = {
  kind: PathKind;
  value: string;
  accept: string;
  placeholder: string;
  browse: boolean;
  reveal: boolean;
  readOnly: boolean;
  disabled: boolean;
  invalid: boolean;
};

const ARGS: Partial<PathFieldArgs> = {
  kind: 'file', value: KEY_PATH, accept: '', placeholder: 'No key file yet', browse: true, reveal: true, readOnly: false, disabled: false, invalid: false,
};

const ARG_TYPES: PlaygroundArgTypes<PathFieldArgs> = {
  kind: { group: 'Behaviour', control: 'select', options: ['file', 'folder', 'any'], description: 'What a drop must be: a file, a folder, or either.' },
  value: { group: 'Content', control: 'text', description: 'The path; empty shows the placeholder.' },
  accept: { group: 'Behaviour', control: 'text', description: 'Endings a dropped file must have, split by commas, such as .yaml, .yml.' },
  placeholder: { group: 'Content', control: 'text' },
  browse: { group: 'Behaviour', control: 'boolean', description: 'onBrowse: the app opens its own file dialog; here a path comes back after 300 ms.' },
  reveal: { group: 'Behaviour', control: 'boolean', description: 'onReveal: the app shows the file in its folder.' },
  readOnly: { group: 'State', control: 'boolean' },
  disabled: { group: 'State', control: 'boolean' },
  invalid: { group: 'State', control: 'boolean' },
};

const meta = {
  title: 'Primitives · Inputs/PathField',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<PathFieldArgs>;

const endings = (text: string): string[] => text.split(',').map((part) => part.trim()).filter(Boolean);

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <PathFieldDemo key={`${args.value}-${String(args.readOnly)}`} {...args} start={args.value || null} accept={endings(args.accept)} aria-label="Path" />
  ),
} satisfies PlaygroundStory<PathFieldArgs>;

const KeyFile = {
  name: 'Server editor: the key file, cut in the middle',
  render: () => <PathFieldDemo start={KEY_PATH} label="Key file" hint="Only the path is stored." />,
} satisfies StoryLiteStoryDefinition<PathFieldArgs>;

const NoKey = {
  name: 'No key file yet: type, drop or browse',
  render: () => <PathFieldDemo start={null} label="Key file" hint="Only the path is stored." placeholder="No key file yet" />,
} satisfies StoryLiteStoryDefinition<PathFieldArgs>;

const PlayerFile = {
  name: 'A player file: drop a .yaml file on it',
  render: () => <PathFieldDemo start={null} label="Player file" accept={['.yaml', '.yml']} placeholder="Drop a player file, or browse" />,
} satisfies StoryLiteStoryDefinition<PathFieldArgs>;

const Folder = {
  name: 'A folder: a dropped file is turned away',
  render: () => <PathFieldDemo start={null} kind="folder" label="Output folder" placeholder="No folder yet" />,
} satisfies StoryLiteStoryDefinition<PathFieldArgs>;

const ReadOnly = {
  name: 'Read only: the data folder and a room output, with copy and reveal',
  render: () => (
    <>
      <PathFieldDemo start={DATA_PATH} kind="folder" readOnly aria-label="Data folder" />
      <PathFieldDemo start={ZIP_PATH} readOnly aria-label="Room output" />
    </>
  ),
} satisfies StoryLiteStoryDefinition<PathFieldArgs>;

const CODE = `import { Field, PathField } from '@drizztdourden08/tessera';

<Field label="Key file" hint="Only the path is stored.">
  <PathField
    value={keyPath}
    onChange={setKeyPath}
    onBrowse={() => window.brock.pickFile({ title: 'Key file' })}
    onReveal={(path) => window.brock.showInFolder(path)}
    resolvePath={(file) => window.brock.pathOf(file)}
    placeholder="No key file yet"
  />
</Field>`;

const Overview = overviewStory({
  component: 'PathField',
  description: 'A file or folder path the user can type, drop from the desktop or pick with Browse, all in one field.',
  points: [
    'Typing edits the path; a drop sets it; `onBrowse` opens the dialog of the app and its result is used.',
    '`kind` and `accept` say what a drop must be; anything else is turned away with a line that says why.',
    '`resolvePath` reads the full path of a dropped file, such as `webUtils.getPathForFile` in Electron.',
    'A long path is cut in the middle, so the file name stays in view; the whole path is its title.',
    'Copy, Reveal with `onReveal`, and Clear sit at the end; `readOnly` keeps copy and reveal only.',
  ],
  instead: '[DropZone] for a box that takes the files themselves, not their path.',
  playground: Playground,
  variants: [KeyFile, NoKey, PlayerFile, Folder, ReadOnly],
  states: {
    render: (props: StateProps) => <PathFieldDemo start={KEY_PATH} aria-label="Key file" {...(props as Partial<PathFieldDemoProps>)} />,
    list: [
      STATE.idle,
      { name: 'Focus', pseudo: 'focus-within', target: '.path-field__frame' },
      { name: 'Empty', props: { start: null, placeholder: 'No key file yet' } },
      STATE.readOnly,
      STATE.error,
      STATE.disabled,
    ],
  },
  code: CODE,
});

export default meta;
export { Folder, KeyFile, NoKey, Overview, PlayerFile, Playground, ReadOnly };
