/* @layer stories @kind story */
import { useState } from 'react';
import type { ReactNode } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { ContentHeader, HeaderAnchorNav } from '../../src/composites';
import type { ContentHeaderLevel } from '../../src/composites';
import { Box, Button, Card, Icon, Paragraph, Status } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import './ContentHeader.stories.css';

type StripChoice = 'none' | 'pills' | 'status';

type ContentHeaderArgs = {
  title: string;
  icon: boolean;
  backdrop: boolean;
  strip: StripChoice;
  actions: boolean;
  back: boolean;
  compact: boolean;
  level: ContentHeaderLevel;
};

const SECTIONS = [{ id: 'startup', label: 'Startup' }, { id: 'tray', label: 'Tray' }] as const;

const Pills = () => {
  const [active, setActive] = useState('startup');
  return <HeaderAnchorNav items={SECTIONS} activeId={active} onSelect={setActive} ariaLabel="General sections" />;
};

const STRIPS: Readonly<Record<StripChoice, ReactNode>> = {
  none: undefined,
  pills: <Pills />,
  status: <Status tone="success" variant="pill" dot>Synced</Status>,
};

const SUB_PAGE_WIDTHS = ['wide', 'narrow'] as const;

const ACTIONS = <Button size="sm" variant="secondary" icon={<Icon name="rotate-ccw" size={14} />}>Reset</Button>;

const ARGS: ContentHeaderArgs = { title: 'General', icon: true, backdrop: true, strip: 'pills', actions: false, back: false, compact: false, level: 2 };

const ignore = () => undefined;

const BACK = { label: 'Settings', onSelect: ignore };

const ARG_TYPES: PlaygroundArgTypes<ContentHeaderArgs> = {
  title: { group: 'Content', control: 'text' },
  icon: { group: 'Content', control: 'boolean' },
  strip: { group: 'Content', control: 'select', options: ['none', 'pills', 'status'], description: 'What sits right after the title.' },
  actions: { group: 'Content', control: 'boolean', description: 'A button at the end of the header.' },
  back: { group: 'Content', control: 'boolean', description: 'A way back to the parent page, Settings, before the icon.' },
  backdrop: { group: 'Appearance', control: 'boolean', description: 'The default art. Off passes null for a plain header.' },
  compact: { group: 'Appearance', control: 'boolean', description: 'The slim look, once the content under it scrolls.' },
  level: { group: 'Content', control: 'select', options: [1, 2, 3, 4], description: 'The heading tag of the title.' },
};

const header = (args: ContentHeaderArgs) => (
  <ContentHeader
    title={args.title}
    icon={args.icon ? <Icon name="settings" /> : undefined}
    back={args.back ? BACK : undefined}
    backdrop={args.backdrop ? undefined : null}
    strip={STRIPS[args.strip]}
    actions={args.actions ? ACTIONS : undefined}
    compact={args.compact}
    level={args.level}
  />
);

const meta = {
  title: 'Composites · Layout/ContentHeader',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ContentHeaderArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <Box className="content-header-story__strip">{header(args)}</Box>,
} satisfies PlaygroundStory<ContentHeaderArgs>;

const WithPills = {
  name: 'With section pills',
  render: () => <Box className="content-header-story__strip">{header(ARGS)}</Box>,
} satisfies StoryLiteStoryDefinition<ContentHeaderArgs>;

const LOOKS = {
  'default art': { ...ARGS, strip: 'none' },
  plain: { ...ARGS, strip: 'none', backdrop: false },
  compact: { ...ARGS, strip: 'none', compact: true },
  'compact and plain': { ...ARGS, strip: 'none', compact: true, backdrop: false },
} satisfies Record<string, ContentHeaderArgs>;

const Looks = {
  name: 'Backdrop and compact',
  render: () => (
    <Demonstrator
      rows={axis(Object.keys(LOOKS) as (keyof typeof LOOKS)[])}
      align="stretch"
      cell={(look) => <Box className="content-header-story__strip">{header(LOOKS[look])}</Box>}
    />
  ),
} satisfies StoryLiteStoryDefinition<ContentHeaderArgs>;

const StatusAndActions = {
  name: 'A status after the title, a button at the end',
  render: () => <Box className="content-header-story__strip">{header({ ...ARGS, title: 'Cloud saves', strip: 'status', actions: true })}</Box>,
} satisfies StoryLiteStoryDefinition<ContentHeaderArgs>;

const SubPage = {
  name: 'A sub-page with a way back, folded to an arrow when narrow',
  render: () => (
    <Box className="story-column">
      {SUB_PAGE_WIDTHS.map((width) => (
        <Box key={width} className={`content-header-story__strip content-header-story__strip--${width}`}>
          {header({ ...ARGS, title: 'Startup', strip: 'status', back: true })}
        </Box>
      ))}
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<ContentHeaderArgs>;

const OnCard = {
  name: 'On a card',
  render: () => (
    <Card className="content-header-story__card">
      <ContentHeader icon={<Icon name="hard-drive" />} title="Storage" level={3} actions={ACTIONS} />
      <Box className="content-header-story__body">
        <Paragraph tone="dim">Saves use 1.2 GB of the 4 GB this profile may use.</Paragraph>
      </Box>
    </Card>
  ),
} satisfies StoryLiteStoryDefinition<ContentHeaderArgs>;

const Overview = overviewStory({
  component: 'ContentHeader',
  description: 'The header of a content container, such as a page, a card or a panel: an icon and a title over a fading backdrop.',
  points: [
    '`strip` holds a few controls right after the title, such as [HeaderAnchorNav] pills or a [Status].',
    '`back` names the parent of a sub-page: a Back to button before the icon, an arrow with a tooltip when narrow.',
    '`actions` sit at the far end; `compact` shrinks it to a slim row once the content under it scrolls.',
    'Leave `backdrop` out for the default art, pass a scene of your own, or `null` for a plain header.',
    '`level` sets the heading tag, `h2` by default; `titleId` lets the container name itself after it.',
    '[ScreenPage] and every screen kind use it, so a page header and a card header look the same.',
  ],
  instead: '[SectionHeader] for a small heading row inside a panel, or [WindowHeader] for a window title bar.',
  playground: Playground,
  variants: [WithPills, Looks, StatusAndActions, SubPage, OnCard],
});

export default meta;
export { Looks, OnCard, Overview, Playground, StatusAndActions, SubPage, WithPills };
