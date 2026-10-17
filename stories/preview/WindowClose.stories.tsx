/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import type { PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';
import { PreviewCards } from './_shared/PreviewCards';
import { HubWindow } from './WindowClose/HubWindow';
import { CLOSE_CHOICES, CLOSE_CODE, CLOSE_SPACE } from './WindowClose/window-close-story.constants';
import type { ClosePlace } from './WindowClose/window-close.type';

type CloseArgs = { place: ClosePlace };

const meta = {
  title: 'Preview · For approval/WindowClose',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<CloseArgs>;

const ARG_TYPES = {
  place: { group: 'Layout', control: 'select', options: ['today', 'row', 'pill', 'corner', 'header'], description: 'today keeps the title row; row is A, pill is B, corner is C, header is D.' },
} as const;

const version = (name: string, place: ClosePlace) => ({
  name,
  args: { place },
  argTypes: ARG_TYPES,
  render: (args) => <HubWindow key={args.place} place={args.place} />,
}) satisfies PlaygroundStory<CloseArgs>;

const Playground = version('Playground', 'row');
const Today = version('Today: the title row reads DATA under the switch', 'today');
const RowEnd = version('A. No title row: the X at the end of the switch row, level with the switch', 'row');
const PillEnd = version('B. No title row: the X joined to the end of the switch, after a thin line', 'pill');
const Corner = version('C. No title row: a small round X on the card\'s top right corner', 'corner');
const InHeader = version('D. No title row: the X at the end of the page header', 'header');

const Overview = overviewStory({
  component: 'WindowClose',
  description: 'For approval, nothing ships: Brock\'s hub with no title row under the switch, and four places for the close button.',
  points: [
    '**For approval:** this page lives in the gallery only; ScreenWindow is unchanged until the owner picks one.',
    'The switch at the top already names the page, so the title row (DATA and the X) goes and the content moves up.',
    'Every version keeps the RotP palette, the nav rail, the Profiles header with its backdrop, a list and details.',
    'The title stays as the window\'s accessible name, so a screen reader still hears Data dialog.',
    'Escape still closes; the X has a tooltip with the Esc key; Tab reaches the switch, then the X, then the page.',
    'In D the X comes after the side nav and the header, at the end of the first row of the page.',
  ],
  instead: '[ScreenWindow] as it ships today, with the title row.',
  playground: Playground,
  variants: [Today, RowEnd, PillEnd, Corner, InHeader],
  sections: [
    { title: 'Space given back', node: <PreviewCards entries={CLOSE_SPACE} /> },
    { title: 'Options weighed', node: <PreviewCards entries={CLOSE_CHOICES} /> },
  ],
  code: CLOSE_CODE,
});

export default meta;
export { Corner, InHeader, Overview, PillEnd, Playground, RowEnd, Today };
