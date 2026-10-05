/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Field, FieldControlBoundary, Flex, TextInput, type ControlSize } from '../../src/primitives';
import { type PasswordMode } from '../../src/composites';
import { CapsLockDemo, SignUpForm, StatefulPassword } from './_samples/password-input-demos';
import { lengthScore, MASK_CASES, MASK_CHARS, type MaskCase } from './_samples/password-samples.constants';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { SIZE_ARG } from '../_template/control-sizes.constants';
import { sizesStory } from '../_template/sizes-story';
import { overviewStory } from '../_template/overview-story';
import { Demonstrator } from '../_template/Demonstrator';
import { axis } from '../_template/axis';

type PasswordInputArgs = {
  initialValue: string;
  placeholder: string;
  mode: PasswordMode;
  mask: MaskCase;
  monospace: boolean;
  hideOnBlur: boolean;
  capsLockWarning: boolean;
  disabled: boolean;
  readOnly: boolean;
  invalid: boolean;
  size: ControlSize;
};

const ARGS: Partial<PasswordInputArgs> = {
  initialValue: 'triforce', placeholder: 'Password', mode: 'current', mask: 'native', monospace: false, hideOnBlur: false,
  capsLockWarning: true, disabled: false, readOnly: false, invalid: false, size: 'md',
};

const ARG_TYPES: PlaygroundArgTypes<PasswordInputArgs> = {
  initialValue: { group: 'Content', control: 'text' },
  placeholder: { group: 'Content', control: 'text' },
  mask: { group: 'Appearance', control: 'select', options: [...MASK_CASES], description: 'native keeps the browser dots; the others pass maskChar.' },
  monospace: { group: 'Appearance', control: 'boolean', description: 'Draws the text in the mono font, hidden or shown.' },
  disabled: { group: 'State', control: 'boolean' },
  readOnly: { group: 'State', control: 'boolean' },
  invalid: { group: 'State', control: 'boolean' },
  mode: { group: 'Behaviour', control: 'select', options: ['current', 'new'], description: 'current signs in, new picks a password. new sets autoComplete to new-password.' },
  hideOnBlur: { group: 'Behaviour', control: 'boolean', description: 'Hides the password again when the focus leaves the field.' },
  capsLockWarning: { group: 'Behaviour', control: 'boolean' },
  size: SIZE_ARG,
};

const meta = {
  title: 'Composites · Inputs/PasswordInput',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<PasswordInputArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <StatefulPassword
      key={args.initialValue}
      initial={args.initialValue}
      placeholder={args.placeholder}
      mode={args.mode}
      maskChar={MASK_CHARS[args.mask]}
      monospace={args.monospace}
      hideOnBlur={args.hideOnBlur}
      capsLockWarning={args.capsLockWarning}
      disabled={args.disabled}
      readOnly={args.readOnly}
      invalid={args.invalid}
      size={args.size}
    />
  ),
} satisfies PlaygroundStory<PasswordInputArgs>;

const SHOWN_ROWS = ['hidden', 'shown', 'hides on blur'] as const;

const Revealed = {
  name: 'Hidden and shown',
  render: () => (
    <Demonstrator
      rows={axis(SHOWN_ROWS)}
      align="stretch"
      cell={(row) => <StatefulPassword initial="triforce" defaultRevealed={row !== 'hidden'} hideOnBlur={row === 'hides on blur'} />}
    />
  ),
} satisfies StoryLiteStoryDefinition<PasswordInputArgs>;

const Masks = {
  name: 'Mask characters',
  render: () => (
    <Demonstrator rows={axis(MASK_CASES)} align="stretch" cell={(row) => <StatefulPassword initial="triforce" maskChar={MASK_CHARS[row]} />} />
  ),
} satisfies StoryLiteStoryDefinition<PasswordInputArgs>;

const MONO_ROWS = ['hidden', 'shown', 'shown, sans'] as const;

const Monospace = {
  name: 'Monospace',
  render: () => (
    <Demonstrator
      rows={axis(MONO_ROWS)}
      align="stretch"
      cell={(row) => <StatefulPassword initial="sk-l1I0O-hyrule-48213" monospace={row !== 'shown, sans'} defaultRevealed={row !== 'hidden'} />}
    />
  ),
} satisfies StoryLiteStoryDefinition<PasswordInputArgs>;

const CapsLock = {
  name: 'Caps Lock',
  render: () => <CapsLockDemo />,
} satisfies StoryLiteStoryDefinition<PasswordInputArgs>;

const SignUp = {
  name: 'Strength and requirements on a sign-up form',
  render: () => <SignUpForm />,
} satisfies StoryLiteStoryDefinition<PasswordInputArgs>;

const HostScore = {
  name: 'Strength from a score the host computes',
  render: () => <StatefulPassword initial="master sword" mode="new" strength={lengthScore} />,
} satisfies StoryLiteStoryDefinition<PasswordInputArgs>;

const Sizes = sizesStory<PasswordInputArgs>((size) => <StatefulPassword size={size} initial="triforce" />, { align: 'stretch' });

const InField = {
  name: 'In a field',
  render: () => (
    <Field label="Room password" hint="Players type it to join your session.">
      <StatefulPassword initial="triforce" />
    </Field>
  ),
} satisfies StoryLiteStoryDefinition<PasswordInputArgs>;

const Bounded = {
  name: 'Beside another input in one Field',
  render: () => (
    <Field label="Archipelago server" error="The server refused this password.">
      <FieldControlBoundary>
        <Flex gap="xs">
          <TextInput aria-label="Address" defaultValue="archipelago.gg:38281" />
          <StatefulPassword initial="ganon" aria-label="Server password" invalid />
        </Flex>
      </FieldControlBoundary>
    </Field>
  ),
} satisfies StoryLiteStoryDefinition<PasswordInputArgs>;

const renderState = (props: StateProps) => <StatefulPassword placeholder="Password" {...props} />;

const renderError = (props: StateProps) => (
  <Field error="That password is not right.">
    <StatefulPassword initial="triforce" {...props} />
  </Field>
);

const CODE = `import { useState } from 'react';
import { Field, PasswordInput } from '@drizztdourden08/tessera';

const RULES = [
  { id: 'length', label: 'At least 12 characters', test: (value: string) => value.length >= 12 },
  { id: 'number', label: 'At least one number', test: (value: string) => /\\d/.test(value) },
];

const [password, setPassword] = useState('');

<Field label="Password">
  <PasswordInput mode="new" rules={RULES} value={password} onChange={setPassword} />
</Field>`;

const Overview = overviewStory({
  component: 'PasswordInput',
  description: 'A password field with an eye button at the end that shows and hides the password.',
  points: [
    '`revealed` and `onRevealedChange` control it from outside; `hideOnBlur` hides it when focus leaves.',
    '`maskChar` draws any character in place of the dots; password managers and autofill still work.',
    'A Caps Lock warning shows under the field while it has focus.',
    '`mode="new"` with `rules` shows a checklist and a strength meter; `strength` takes your own score.',
    '`monospace` sets the mono font, for keys and codes.',
  ],
  playground: Playground,
  variants: [Revealed, Masks, Monospace, CapsLock, SignUp, HostScore, Sizes, InField, Bounded],
  states: {
    render: renderState,
    list: [
      STATE.idle,
      { ...STATE.hover, target: '.text-input' },
      { ...STATE.focus, target: '.text-input' },
      { name: 'Filled', props: { initial: 'triforce' } },
      { ...STATE.readOnly, props: { readOnly: true, initial: 'seed-48213' } },
      { ...STATE.error, render: renderError },
      { ...STATE.disabled, props: { disabled: true, initial: 'triforce' } },
    ],
  },
  code: CODE,
});

export default meta;
export { Bounded, CapsLock, HostScore, InField, Masks, Monospace, Overview, Playground, Revealed, SignUp, Sizes };
