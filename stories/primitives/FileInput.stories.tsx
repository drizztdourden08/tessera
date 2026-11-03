/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { overviewStory } from '../_template/overview-story';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { FileInputSample } from './_samples/FileInputSample';
import { FILE_INPUT_CODE } from './_samples/file-input-story.constants';

type FileInputArgs = {
  multiple: boolean;
};

const ARG_TYPES: PlaygroundArgTypes<FileInputArgs> = {
  multiple: { group: 'Behavior', control: 'boolean' },
};

const meta = {
  title: 'Primitives · Inputs/FileInput',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<FileInputArgs>;

const Playground = {
  name: 'Playground',
  args: { multiple: false },
  argTypes: ARG_TYPES,
  render: (args) => <FileInputSample multiple={args.multiple} />,
} satisfies PlaygroundStory<FileInputArgs>;

const SeveralFiles = {
  name: 'Several files at once',
  render: () => <FileInputSample multiple />,
} satisfies StoryLiteStoryDefinition<FileInputArgs>;

const Overview = overviewStory({
  component: 'FileInput',
  description: 'A hidden file picker that a button of your own opens, and that hands back the chosen files.',
  points: [
    'The input is hidden; call click on its ref from your own button to open the system dialog.',
    '`accept` takes a list of types such as image/* and narrows the dialog.',
    '`multiple` lets the user choose several files at once.',
    '`onFiles` gets the files, and is not called when the dialog is cancelled.',
    'The input is cleared after each choice, so the same file can be picked twice.',
  ],
  instead: '[DropZone] when the user drops or pastes files into a visible area.',
  playground: Playground,
  variants: [SeveralFiles],
  code: FILE_INPUT_CODE,
});

export default meta;
export { Overview, Playground, SeveralFiles };
