/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { SIZE_ARG } from '../_template/control-sizes.constants';
import { sizesStory } from '../_template/sizes-story';
import { Box, namespacedTag, TagInput } from '../../src/primitives';
import type { ControlSize, TagValidator } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { ValueReadout } from '../_template/ValueReadout';

type TagInputArgs = {
  label: string;
  placeholder: string;
  maxSuggestions: number;
  enforce: boolean;
  namespaced: boolean;
  disabled: boolean;
  size: ControlSize;
};

const GAME_TAGS: readonly string[] = [
  'game:a-link-to-the-past',
  'game:links-awakening',
  'game:ocarina-of-time',
  'game:super-metroid',
  'game:pokemon-red',
  'mode:keysanity',
  'mode:open',
  'mode:swordless',
  'goal:ganon',
  'goal:triforce-hunt',
];

const lowercaseOnly: TagValidator = (raw) =>
  raw === raw.toLowerCase() || 'Tags are lowercase, like game:super-metroid';

const ARGS: Partial<TagInputArgs> = {
    label: 'Games in this session',
    placeholder: 'Add a tag...',
    maxSuggestions: 6,
    enforce: false,
    namespaced: true,
    disabled: false,
    size: 'md',
  };

const ARG_TYPES: PlaygroundArgTypes<TagInputArgs> = {
    label: { group: 'Content', control: 'text' },
    placeholder: { group: 'Content', control: 'text' },
    disabled: { group: 'State', control: 'boolean' },
    maxSuggestions: { group: 'Behaviour', control: 'number' },
    enforce: { group: 'Behaviour', control: 'boolean', description: 'Refuse a new tag that breaks the convention.' },
    namespaced: { group: 'Behaviour', control: 'boolean', description: 'Check that each tag reads namespace:value (namespacedTag). Off accepts anything.' },
    size: SIZE_ARG,
  };

const meta = {
  title: 'Primitives · Inputs/TagInput',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<TagInputArgs>;

type StatefulTagsProps = {
  initial: readonly string[];
  validate?: TagValidator;
  createError?: string;
} & Partial<TagInputArgs>;

const StatefulTags = (props: StatefulTagsProps) => {
  const { initial, validate, createError, label, placeholder, maxSuggestions, enforce, namespaced, disabled, size } = props;
  const [value, setValue] = useState(initial);
  return (
    <ValueReadout value={value}>
      <TagInput
        value={value}
        onChange={setValue}
        suggestions={GAME_TAGS}
        validate={namespaced ? namespacedTag : validate}
        enforce={enforce}
        createError={createError}
        label={label}
        placeholder={placeholder}
        maxSuggestions={maxSuggestions}
        disabled={disabled}
        size={size}
      />
    </ValueReadout>
  );
};

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <StatefulTags initial={['game:a-link-to-the-past', 'mode:open']} {...args} />,
} satisfies PlaygroundStory<TagInputArgs>;

const Validation = {
  name: 'Validation',
  render: () => (
    <Box className="story-column">
      <StatefulTags initial={[]} label="Empty, any tag accepted" />
      <StatefulTags initial={['game:links-awakening', 'goal:ganon']} label="namespacedTag: tags that follow the convention" namespaced />
      <StatefulTags initial={['game:super-metroid', 'speedrun']} label="namespacedTag: one tag flagged, still kept" namespaced />
      <StatefulTags initial={['mode:keysanity']} label="Enforced: a new tag must read namespace:value" namespaced enforce />
      <StatefulTags initial={['game:pokemon-red']} label="Custom check: lowercase only" validate={lowercaseOnly} />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<TagInputArgs>;

const Sizes = sizesStory<TagInputArgs>((size) => <StatefulTags initial={['game:a-link-to-the-past', 'mode:open']} size={size} namespaced />, { align: 'stretch' });

type SessionGamesProps = { initial: readonly string[]; open: boolean; createError?: string; disabled: boolean };

const SessionGames = (props: SessionGamesProps) => {
  const { initial, open, createError, disabled } = props;
  const [value, setValue] = useState(initial);
  return <TagInput value={value} onChange={setValue} suggestions={GAME_TAGS} validate={namespacedTag} createError={createError} defaultOpen={open} inline={open} disabled={disabled} />;
};

const FILLED: readonly string[] = ['game:a-link-to-the-past', 'mode:open'];

const renderState = (props: StateProps) => (
  <SessionGames
    initial={props.filled === true ? FILLED : []}
    open={props.open === true}
    createError={typeof props.createError === 'string' ? props.createError : undefined}
    disabled={props.disabled === true}
  />
);

const Overview = overviewStory({
  component: 'TagInput',
  description: 'A text field that collects a list of values as removable tags, such as games or modes on a record.',
  points: [
    'Typing filters the `suggestions`, and a new value can still be added.',
    '`validate` checks each tag; one that fails gets a hint but is kept, unless `enforce` is on.',
    '`createError` shows a refusal from the server and draws the error look.',
    '`inline` draws the suggestions right under the field instead of as a floating panel.',
  ],
  instead: '[TagPicker] when the options are a short, known list.',
  playground: Playground,
  variants: [Validation, Sizes],
  states: {
    render: renderState,
    list: [
      STATE.idle,
      { ...STATE.hover, target: '.tag-input__field' },
      { ...STATE.focus, target: '.tag-input__entry' },
      { name: 'Filled', props: { filled: true } },
      { ...STATE.open, pseudo: 'focus-visible', target: '.tag-input__entry', props: { open: true, filled: true } },
      { ...STATE.error, props: { filled: true, createError: 'That tag already exists under another name.' } },
      { ...STATE.disabled, props: { filled: true, disabled: true } },
    ],
  },
  code: `import { useState } from 'react';
import { TagInput } from '@drizztdourden08/tessera';

const [tags, setTags] = useState<readonly string[]>(['mode:open']);

<TagInput
  label="Games in this session"
  value={tags}
  onChange={setTags}
  suggestions={['game:a-link-to-the-past', 'game:super-metroid', 'mode:open']}
/>`,
});

export default meta;
export { Overview, Playground, Sizes, Validation };
