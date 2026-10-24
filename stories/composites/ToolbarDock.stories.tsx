/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { overviewStory } from '../_template/overview-story';
import { ToolbarDockDemo } from './_samples/ToolbarDockDemo';
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

const Overview = overviewStory({
  component: 'ToolbarDock',
  description: 'The frame that holds toolbars on the four edges of a work area, up to two lanes on each side.',
  points: [
    '`layout` says which toolbar sits on which side; the dock draws it and the app keeps it.',
    'Top and bottom lanes span the full width; left and right lanes sit between them, two lanes at most.',
    '`renderToolbar` draws each toolbar with the `orientation` of its side and the `handle` for the grip.',
    'Drag a grip or press Enter on it: pick a side or lane, a full side refuses, the basket hides.',
    '`useToolbarLayout` gives `move`, `show`, `hide`, `toggle` and `reset`, and calls `onChange` once per edit.',
    '`toolbarMenuGroups` builds the Toolbars menu: a check item per toolbar and Reset toolbars.',
  ],
  variants: [Around],
  code: TOOLBAR_DOCK_CODE,
});

export default meta;
export { Around, Overview };
