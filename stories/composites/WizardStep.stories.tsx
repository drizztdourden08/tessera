/* @layer stories @kind story */
import type { StoryLiteArgTypes, StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { WizardStep } from '../../src/composites';
import { Field, Select, TextInput } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { SERVERS } from './_samples/profile-wizard-data';

type StepArgs = {
  title: string;
  description: string;
  error: string;
};

const ARGS: Partial<StepArgs> = {
  title: 'Seed and connection',
  description: 'The seed decides where every item lands. It locks once the profile exists.',
  error: '',
};

const ARG_TYPES: StoryLiteArgTypes<StepArgs> = {
  title: { control: 'text' },
  description: { control: 'textarea' },
  error: { control: 'text', description: 'A problem with the whole step. Empty hides it.' },
};

const meta = {
  title: 'Composites · Wizard/WizardStep',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<StepArgs>;

const CONNECTION_ERROR = 'Could not reach archipelago.gg:38281. Check the port with your host, then try again.';

const fields = (
  <>
    <Field label="Seed" hint="Share it and others play the same world."><TextInput defaultValue="3fa9c1e7" /></Field>
    <Field label="Room"><Select options={SERVERS} value="archipelago.gg:38281" onChange={() => undefined} /></Field>
  </>
);

const draw = (args: StepArgs) => (
  <WizardStep title={args.title} description={args.description || undefined} error={args.error || null} focusOnOpen={false}>
    {fields}
  </WizardStep>
);

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => draw(args),
} satisfies StoryLiteStoryDefinition<StepArgs>;

const FORMS = ['Heading only', 'With description', 'With an error'] as const;

const Forms = {
  name: 'Forms',
  render: () => (
    <Demonstrator
      rows={axis(FORMS)}
      align="stretch"
      cell={(form) => draw({
        title: 'Seed and connection',
        description: form === 'Heading only' ? '' : ARGS.description ?? '',
        error: form === 'With an error' ? CONNECTION_ERROR : '',
      })}
    />
  ),
} satisfies StoryLiteStoryDefinition<StepArgs>;

const renderState = (props: StateProps) => draw({ ...(ARGS as StepArgs), error: typeof props.error === 'string' ? props.error : '' });

const CODE = `import { WizardStep } from '@drizztdourden08/tessera';

<WizardStep title="Seed and connection" description="The seed decides where every item lands." error={errors.seed}>
  <Field label="Seed"><TextInput value={seed} onChange={(e) => setValue('seed', e.target.value)} /></Field>
</WizardStep>`;

const Overview = overviewStory({
  component: 'WizardStep',
  description: 'One step of a wizard: its heading, a short description, an error Callout on top when the whole step has a problem, then the fields. Each field keeps its own error text under it; the Callout is for what belongs to no single field, such as a failed connection or a finish that did not work. When the step opens, keyboard focus moves to its heading, so a screen reader announces the new step. WizardFrame draws one for the current step.',
  playground: Playground,
  variants: [Forms],
  states: {
    render: renderState,
    list: [STATE.idle, { ...STATE.error, props: { error: CONNECTION_ERROR } }],
  },
  code: CODE,
});

export default meta;
export { Forms, Overview, Playground };
