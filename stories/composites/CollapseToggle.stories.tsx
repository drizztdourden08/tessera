/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { CollapseToggleSide } from '../../src/composites';
import { CollapseToggle } from '../../src/composites';
import type { PlaygroundStory } from '../_template/controls/playground.type';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { CollapseToggleSample } from './_samples/CollapseToggleSample';
import { COLLAPSE_CODE, COLLAPSE_TEXT as T } from './_samples/collapse-toggle-story.constants';
import './CollapseToggle.stories.css';

type CollapseArgs = { side: CollapseToggleSide; folded: boolean };

const SIDES = ['start', 'end'] as const;
const FOLDS = ['open', 'folded'] as const;

const meta = {
  title: 'Composites · Layout/CollapseToggle',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<CollapseArgs>;

const Playground = {
  name: 'Playground',
  args: { side: 'start', folded: false },
  argTypes: {
    side: { group: 'Appearance', control: 'select', options: [...SIDES], description: 'The edge the panel sits on: start on the left, end on the right.' },
    folded: { group: 'State', control: 'boolean', description: 'The panel starts folded; the chevron then points away from its edge.' },
  },
  render: (args) => <CollapseToggleSample key={`${args.side}${String(args.folded)}`} side={args.side} folded={args.folded} />,
} satisfies PlaygroundStory<CollapseArgs>;

const Sides = {
  name: 'A panel on each side, open and folded',
  render: () => (
    <Demonstrator
      rows={axis(SIDES)}
      columns={axis(FOLDS)}
      cell={(side, fold) => <CollapseToggleSample side={side} folded={fold === 'folded'} />}
    />
  ),
} satisfies StoryLiteStoryDefinition<CollapseArgs>;

const renderState = (props: StateProps) => (
  <CollapseToggle collapsed={props.collapsed === true} onToggle={() => undefined} label={T.panel} />
);

const Overview = overviewStory({
  component: 'CollapseToggle',
  description: 'The round button on the edge of a panel that folds it to a rail, with a chevron that points where the panel goes.',
  points: [
    'SideNav, SidePanel, StudioLayout and ListDetailLayout all fold with it; it is the one fold button.',
    'The chevron points toward the edge of the panel to fold it, and away from it to unfold it.',
    '`side` is the edge the panel sits on; `label` names the panel: Hide profiles, Show profiles.',
    'It reports `aria-expanded` and `aria-controls`; it draws at 24 px and takes clicks on 28 by 28 px.',
    'In a layout it sits beside the edge line with a 4 px gap; [SideNav] keeps it half over its border, as here.',
  ],
  instead: '[SidePanel] for a whole side panel with a heading; [Disclosure] for content under a line.',
  playground: Playground,
  variants: [Sides],
  states: {
    render: renderState,
    list: [
      STATE.idle,
      { ...STATE.hover, target: '.collapse-toggle' },
      { ...STATE.focus, target: '.collapse-toggle' },
      { name: 'Folded', props: { collapsed: true } },
    ],
  },
  code: COLLAPSE_CODE,
});

export default meta;
export { Overview, Playground, Sides };
