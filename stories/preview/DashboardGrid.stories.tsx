/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { Box } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { PreviewCards } from './_shared/PreviewCards';
import { DASHBOARD_CHOICES, DASHBOARD_CODE, DASHBOARD_MAPPING } from './DashboardGrid/_samples/dashboard-story.constants';
import { RunDashboard } from './DashboardGrid/_samples/RunDashboard';
import './DashboardGrid.stories.css';

type DashboardArgs = { width: 'wide' | 'narrow' };

const meta = {
  title: 'Preview · For approval/DashboardGrid',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<DashboardArgs>;

const Framed = ({ width }: DashboardArgs) => (
  <Box className={`dashboard-story__frame dashboard-story__frame--${width}`}><RunDashboard /></Box>
);

const Wide = {
  name: 'The Randomizer run page, wide',
  render: () => <Framed width="wide" />,
} satisfies StoryLiteStoryDefinition<DashboardArgs>;

const Narrow = {
  name: 'The same cards in a narrow window',
  render: () => <Framed width="narrow" />,
} satisfies StoryLiteStoryDefinition<DashboardArgs>;

const Overview = overviewStory({
  component: 'DashboardGrid',
  description: 'For approval: titled cards on as many columns as fit, built from Grid and Card with two new props and no new part.',
  points: [
    '**For approval:** this page lives in the gallery only; nothing on it ships until the owner picks an option.',
    '[Grid] `minColWidth` already fills as many columns as fit; `dense` lets a small card fill the hole a wide one left.',
    '`Grid.Cell` with `span={2}` takes two columns once two fit, and `span="full"` the whole row.',
    'Each panel is a [Card] with `title`, `subtitle` and `actions`; cards in a row share its height.',
  ],
  instead: '[DockLayout] when the user moves and resizes the panels.',
  variants: [Wide, Narrow],
  sections: [
    { title: 'What RotP\'s two parts become', node: <PreviewCards entries={DASHBOARD_MAPPING} /> },
    { title: 'Options weighed', node: <PreviewCards entries={DASHBOARD_CHOICES} /> },
  ],
  code: DASHBOARD_CODE,
});

export default meta;
export { Narrow, Overview, Wide };
