/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { overviewStory } from '../_template/overview-story';
import { ToolbarDockDemo } from './_samples/ToolbarDockDemo';
import {
  TOOLBAR_DOCK_HINT, TOOLBAR_DOCK_RAIL_FULL_HEIGHT, TOOLBAR_DOCK_RAIL_UNDER_TOP, TOOLBAR_DOCK_TWO_IN_LANE,
} from './_samples/toolbar-dock-layouts.constants';
import { TOOLBAR_DOCK_CODE } from './_samples/toolbar-dock-story.constants';
import './ToolbarDock.stories.css';

type ToolbarDockArgs = Record<string, never>;

const meta = {
  title: 'Composites · Widgets/ToolbarDock',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ToolbarDockArgs>;

const Around = {
  name: 'Two toolbars on top, one on the left and one at the bottom, with a Toolbars menu',
  render: () => <ToolbarDockDemo />,
} satisfies StoryLiteStoryDefinition<ToolbarDockArgs>;

const RailUnderTop = {
  name: 'Partial bars: the top toolbar owns the corner and the left rail sits under it',
  render: () => <ToolbarDockDemo initial={TOOLBAR_DOCK_RAIL_UNDER_TOP} />,
} satisfies StoryLiteStoryDefinition<ToolbarDockArgs>;

const RailFullHeight = {
  name: 'Partial bars: the left rail owns the corner and runs the full height',
  render: () => <ToolbarDockDemo initial={TOOLBAR_DOCK_RAIL_FULL_HEIGHT} />,
} satisfies StoryLiteStoryDefinition<ToolbarDockArgs>;

const TwoInLane = {
  name: 'One lane holding two bars, each with its own start and size',
  render: () => <ToolbarDockDemo initial={TOOLBAR_DOCK_TWO_IN_LANE} />,
} satisfies StoryLiteStoryDefinition<ToolbarDockArgs>;

const Playground = {
  name: 'Playground: end handles, corner take and drop all work live',
  render: () => <ToolbarDockDemo hint={TOOLBAR_DOCK_HINT} />,
} satisfies StoryLiteStoryDefinition<ToolbarDockArgs>;

const Overview = overviewStory({
  component: 'ToolbarDock',
  description: 'The frame that holds toolbars on the four edges of a work area, up to two lanes on each side.',
  points: [
    '`layout` says which toolbar sits on which side; the dock draws it and the app keeps it.',
    'Two lanes per side at most; `start` and `size` set a bar extent, `corners` says who owns each corner.',
    '`renderToolbar` draws each toolbar with the `orientation`, the `handle` and the `labels` flag it stores.',
    'Drag a grip to drop a bar in a lane, an end handle to push or take a corner; the keys do the same.',
    '`useToolbarLayout` gives `move`, `show`, `hide`, `toggle` and `reset`, and calls `onChange` once per edit.',
    '`toolbarMenuGroups` builds the Toolbars menu: a check item per toolbar and Reset toolbars.',
  ],
  variants: [Around, RailUnderTop, RailFullHeight, TwoInLane, Playground],
  code: TOOLBAR_DOCK_CODE,
});

export default meta;
export { Around, Overview, Playground, RailFullHeight, RailUnderTop, TwoInLane };
