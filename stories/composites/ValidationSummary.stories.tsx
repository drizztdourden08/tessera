/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { ValidationSummary } from '../../src/composites';
import type { ValidationTone } from '../../src/composites';
import { Box } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import type { StateProps } from '../_template/states/states.type';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { BUILDER_PROBLEMS, PRESET_PROBLEMS, SERVER_PROBLEMS } from './_samples/validation-samples.constants';
import { ValidationSummaryDemo } from './_samples/ValidationSummaryDemo';
import './ValidationSummary.stories.css';

type ValidationSummaryArgs = {
  title: string;
  count: number;
  max: number;
  tone: ValidationTone;
  links: boolean;
};

const noop = (): void => undefined;

const ARGS: Partial<ValidationSummaryArgs> = { title: '', count: 6, max: 4, tone: 'danger', links: true };

const ARG_TYPES: PlaygroundArgTypes<ValidationSummaryArgs> = {
  title: { group: 'Content', control: 'text', description: 'Left empty, the title counts the problems.' },
  count: { group: 'Content', control: 'range', min: 0, max: 6, step: 1, description: 'How many problems to list; none draws nothing.' },
  tone: { group: 'Appearance', control: 'select', options: ['danger', 'warning'] },
  max: { group: 'Behaviour', control: 'range', min: 1, max: 6, step: 1, description: 'Problems shown before and N more.' },
  links: { group: 'Behaviour', control: 'boolean', description: 'Passes onFocusField, so each problem with a field is a link.' },
};

const meta = {
  title: 'Composites · Forms/ValidationSummary',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ValidationSummaryArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <Box className="validation-summary-story">
      <ValidationSummary
        title={args.title || undefined}
        problems={BUILDER_PROBLEMS.slice(0, args.count)}
        max={args.max}
        tone={args.tone}
        onFocusField={args.links ? noop : undefined}
      />
    </Box>
  ),
} satisfies PlaygroundStory<ValidationSummaryArgs>;

const Builder = {
  name: 'Six problems, four shown',
  render: () => (
    <Box className="validation-summary-story">
      <ValidationSummary title="Before this session can run" problems={BUILDER_PROBLEMS} onFocusField={noop} />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<ValidationSummaryArgs>;

const Form = {
  name: 'Above a form, each problem jumps to its field',
  render: () => <ValidationSummaryDemo />,
} satisfies StoryLiteStoryDefinition<ValidationSummaryArgs>;

const Warning = {
  name: 'Warning tone, options to check',
  render: () => (
    <Box className="validation-summary-story">
      <ValidationSummary tone="warning" title="2 options need a look" problems={PRESET_PROBLEMS} onFocusField={noop} />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<ValidationSummaryArgs>;

const CODE = `import { ValidationSummary } from '@drizztdourden08/tessera';

<ValidationSummary
  problems={[
    { id: 'key', message: 'Enter the path of the key file.', field: 'key-file' },
    { id: 'path', message: 'The Archipelago path must be absolute.', field: 'ap-path' },
  ]}
  onFocusField={(field) => document.getElementById(field)?.focus()}
/>`;

const Overview = overviewStory({
  component: 'ValidationSummary',
  description: 'What blocks a save, listed above the form, each problem a link that jumps to its field.',
  points: [
    'The title counts the problems unless `title` names the step, such as Before this session can run.',
    'A problem with a `field` is a link that calls `onFocusField` with it; the app moves focus there.',
    'Only the first `max` problems show (four by default); and N more lists the rest.',
    '`tone` `warning` is for options to check that do not block the save.',
    '**No problems, no box:** an empty list draws nothing.',
  ],
  instead: '[Callout] for one note with no list, or the `error` of a [Field] for one field.',
  playground: Playground,
  variants: [Builder, Form, Warning],
  states: {
    render: (props: StateProps) => (
      <Box className="validation-summary-story">
        <ValidationSummary problems={SERVER_PROBLEMS} onFocusField={noop} {...props} />
      </Box>
    ),
    list: [
      { name: 'Links', props: {} },
      { name: 'Plain text', props: { onFocusField: undefined } },
    ],
  },
  code: CODE,
});

export default meta;
export { Builder, Form, Overview, Playground, Warning };
