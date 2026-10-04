/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { overviewStory } from '../_template/overview-story';
import { HintScopeDemo } from './_samples/HintScopeDemo';
import { HintScopePair } from './_samples/HintScopePair';

const meta = {
  title: 'Primitives · Feedback/HintScope',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const Panel = {
  name: 'Around a panel with a HintLine',
  render: () => <HintScopeDemo />,
} satisfies StoryLiteStoryDefinition;

const Pair = {
  name: 'One scope per panel',
  render: () => <HintScopePair />,
} satisfies StoryLiteStoryDefinition;

const CODE = `import { HintLine, HintScope, Toggle, useHint } from '@drizztdourden08/tessera';

<HintScope>
  <Toggle checked={snap} onChange={setSnap} hint={{ label: 'Snap', description: 'Pulls the map to the nearest room' }} />
  <HintLine />
</HintScope>

const MyReadout = () => {
  const hint = useHint();
  return hint ? <Text>{hint.label}</Text> : null;
};`;

const Overview = overviewStory({
  component: 'HintScope',
  description: 'Collects the hints of the controls inside it and hands the one in use to a [HintLine].',
  points: [
    'Put one around each panel that has a HintLine; it draws nothing and takes no props.',
    'A control reports to the nearest scope above it, so two panels never mix their hints.',
    '[SegmentedControl], [ToggleGroup], [Toggle], [Slider] and [IconButton] report on their own.',
    '`useHintTarget` adds the same to any element, and `useHint` reads the current hint.',
  ],
  instead: '[Tooltip] for a hint on one control.',
  variants: [Panel, Pair],
  code: CODE,
});

export default meta;
export { Overview, Pair, Panel };
