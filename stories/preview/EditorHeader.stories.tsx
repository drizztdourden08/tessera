/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { Box } from '../../src/primitives';
import type { PlaygroundStory } from '../_template/controls/playground.type';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import type { StateProps } from '../_template/states/states.type';
import { PreviewChoices } from './_shared/PreviewChoices';
import { PreviewUsageView } from './_shared/PreviewUsageView';
import { EditorBar } from './EditorHeader/EditorBar';
import { EDITOR_BAR_USAGE } from './EditorHeader/editor-bar-usage.constants';
import { BACK_TO_SESSIONS, DISK_FULL, PRESET_CONTEXT } from './EditorHeader/_samples/editor-samples.constants';
import {
  EDITOR_ARG_TYPES, EDITOR_ARGS, EDITOR_CHOICES, EDITOR_CODE, OPTION_ROWS, SAVE_STATES,
} from './EditorHeader/_samples/editor-story.constants';
import type { EditorArgs } from './EditorHeader/_samples/editor-story.type';
import { PresetEditorPage } from './EditorHeader/_samples/PresetEditorPage';
import { SessionBuilderPane } from './EditorHeader/_samples/SessionBuilderPane';
import './EditorHeader.stories.css';

const meta = {
  title: 'Preview · For approval/EditorHeader',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<EditorArgs>;

const bar = (args: EditorArgs) => (
  <EditorBar
    name={args.edge === 'foot' ? undefined : args.name}
    onNameChange={() => undefined}
    context={args.context ? PRESET_CONTEXT : undefined}
    state={args.state}
    error={args.state === 'error' ? DISK_FULL : undefined}
    back={args.back ? BACK_TO_SESSIONS : undefined}
    edge={args.edge}
  />
);

const Playground = {
  name: 'Playground',
  args: EDITOR_ARGS,
  argTypes: EDITOR_ARG_TYPES,
  render: (args) => <Box className="editor-story__strip">{bar(args)}</Box>,
} satisfies PlaygroundStory<EditorArgs>;

const Options = {
  name: 'Three options for the preset editor, live: rename it, then Save',
  render: () => <Demonstrator rows={OPTION_ROWS} align="stretch" cell={(option) => <PresetEditorPage option={option} />} />,
} satisfies StoryLiteStoryDefinition<EditorArgs>;

const Narrow = {
  name: 'The same three options in a narrow column',
  render: () => (
    <Demonstrator columns={OPTION_ROWS} align="start" valign="start" cell={(_row, option) => <PresetEditorPage option={option} narrow />} />
  ),
} satisfies StoryLiteStoryDefinition<EditorArgs>;

const Pane = {
  name: 'Option A in a pane with no page header: the bar takes the back arrow',
  render: () => <SessionBuilderPane />,
} satisfies StoryLiteStoryDefinition<EditorArgs>;

const Overview = overviewStory({
  component: 'EditorHeader',
  importName: 'EditorBar',
  description: 'A design for the owner to approve, not a released part: the strip that names an editor, says if it is saved and holds its buttons.',
  points: [
    '**For approval:** this page lives in the gallery only, and nothing on it ships until an option is picked.',
    'Option A, recommended: a bar under the page header holds the name, its context, the save state and buttons.',
    '`state` is `clean`, `dirty`, `saving`, `saved` or `error`; `error` explains a failed save in a tooltip.',
    'The name edits in place: it reads as a title, shows a frame on hover, and [[Esc]] puts back the old name.',
    '`back` adds a back arrow for a pane with no page header above it.',
  ],
  instead: '[ContentHeader] stays the header of the page; the bar sits under it and never replaces it.',
  playground: Playground,
  variants: [Options, Narrow, Pane],
  sections: [
    { title: 'Options weighed', node: <PreviewChoices choices={EDITOR_CHOICES} /> },
    { title: 'How to use it', node: <PreviewUsageView name="EditorBar" usage={EDITOR_BAR_USAGE} /> },
  ],
  states: {
    render: (props: StateProps) => <Box className="editor-story__strip">{bar({ ...EDITOR_ARGS, ...(props as Partial<EditorArgs>) })}</Box>,
    list: SAVE_STATES.map((state) => ({ name: state, props: { state } })),
  },
  code: EDITOR_CODE,
});

export default meta;
export { Narrow, Options, Overview, Pane, Playground };
