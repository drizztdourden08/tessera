/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';
import { MediaGridSample } from './_samples/MediaGridSample';
import { BROKEN_ITEMS, GRID_CODE, GRID_ITEMS } from './_samples/media-grid-story.constants';

type MediaGridArgs = {
  columns: number;
};

const ARG_TYPES: PlaygroundArgTypes<MediaGridArgs> = {
  columns: { group: 'Layout', control: 'number' },
};

const meta = {
  title: 'Composites · Content/MediaGrid',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<MediaGridArgs>;

const Playground = {
  name: 'Playground',
  args: { columns: 0 },
  argTypes: ARG_TYPES,
  render: (args) => <MediaGridSample items={GRID_ITEMS} columns={args.columns || undefined} />,
} satisfies PlaygroundStory<MediaGridArgs>;

const OpensViewer = {
  name: 'A click opens the viewer at that picture, with zoom',
  render: () => <MediaGridSample items={GRID_ITEMS} />,
} satisfies StoryLiteStoryDefinition<MediaGridArgs>;

const TwoColumns = {
  name: 'Two fixed columns',
  render: () => <MediaGridSample items={GRID_ITEMS} columns={2} />,
} satisfies StoryLiteStoryDefinition<MediaGridArgs>;

const BrokenPicture = {
  name: 'A picture that fails to load',
  render: () => <MediaGridSample items={BROKEN_ITEMS} />,
} satisfies StoryLiteStoryDefinition<MediaGridArgs>;

const Empty = {
  name: 'Empty, with an empty state slot',
  render: () => <MediaGridSample items={[]} />,
} satisfies StoryLiteStoryDefinition<MediaGridArgs>;

const Overview = overviewStory({
  component: 'MediaGrid',
  description: 'Picture thumbnails with a caption and a source tag, each opening large when clicked.',
  points: [
    'Each item is a `src`, a `caption` and an optional `source`, drawn as a small tag under the caption.',
    '`onOpen` gets the index of the clicked thumbnail; open MediaViewer at that index to get zoom and arrows.',
    'Leave `columns` out to fit as many columns as the width allows, or pass a fixed count.',
    'A thumbnail shows a placeholder while it loads, and a broken picture mark when its `src` fails.',
    'With no items, the `empty` slot is drawn instead, such as an EmptyState.',
  ],
  instead: '[MediaViewer] for one picture opened from a small preview; [Carousel] for one slide at a time.',
  playground: Playground,
  variants: [OpensViewer, TwoColumns, BrokenPicture, Empty],
  code: GRID_CODE,
});

export default meta;
export { BrokenPicture, Empty, OpensViewer, Overview, Playground, TwoColumns };
