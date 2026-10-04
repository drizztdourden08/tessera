/* @layer stories @kind story */
import type { MouseEvent } from 'react';
import type { StoryLiteArgTypes, StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { Link, Paragraph } from '../../src/primitives';
import type { LinkTone } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import { LINK_TONES } from './_samples/link-tones.constants';
import { LINK_VARIANTS } from './_samples/link-variants.constants';
import { LinkSandbox } from './_samples/LinkSandbox';

type LinkArgs = {
  text: string;
  href: string;
  tone: LinkTone;
  external: boolean;
};

const ARGS: Partial<LinkArgs> = { text: 'the patch notes', href: '/notes/2-3-1', tone: 'primary', external: false };

const ARG_TYPES: StoryLiteArgTypes<LinkArgs> = {
  text: { control: 'text' },
  href: { control: 'text' },
  tone: { control: 'select', options: [...LINK_TONES] },
  external: { control: 'boolean', description: 'Opens in a new tab with rel="noopener noreferrer" and an icon that says so.' },
};

const meta = {
  title: 'Primitives · Actions/Link',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<LinkArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <LinkSandbox>
      <Paragraph>
        Version 2.3.1 is out. Read <Link href={args.href} tone={args.tone} external={args.external}>{args.text}</Link> before you update.
      </Paragraph>
    </LinkSandbox>
  ),
} satisfies StoryLiteStoryDefinition<LinkArgs>;

const Tones = {
  name: 'Tones',
  render: () => (
    <LinkSandbox>
      <Demonstrator
        rows={axis(LINK_TONES)}
        cell={(tone) => <Paragraph>Your run is saved. <Link href="/saves/slot-2" tone={tone}>Open slot 2</Link></Paragraph>}
      />
    </LinkSandbox>
  ),
} satisfies StoryLiteStoryDefinition<LinkArgs>;

const Variants = {
  name: 'Variants',
  render: () => (
    <LinkSandbox>
      <Demonstrator
        rows={axis(LINK_VARIANTS)}
        cell={(variant) => <Paragraph>Hint found by <Link href="/players/slot-3" variant={variant}>slot-3</Link> in Celeste.</Paragraph>}
      />
    </LinkSandbox>
  ),
} satisfies StoryLiteStoryDefinition<LinkArgs>;

const External = {
  name: 'External',
  render: () => (
    <Paragraph>
      The randomizer settings follow <Link href="https://example.com/alttpr" external>the community guide</Link>.
    </Paragraph>
  ),
} satisfies StoryLiteStoryDefinition<LinkArgs>;

const stayHere = (event: MouseEvent<HTMLAnchorElement>) => event.preventDefault();

const CODE = `import { Link } from '@drizztdourden08/tessera';

<Link href="/notes/2-3-1">the patch notes</Link>
<Link href="/players/slot-3" variant="subtle">slot-3</Link>
<Link href="https://example.com/alttpr" external>the community guide</Link>`;

const Overview = overviewStory({
  component: 'Link',
  description: 'A link to a URL, in the Tessera look: a toned colour, an underline on hover and the focus ring. external opens it in a new tab with rel="noopener noreferrer" and a small icon that tells screen readers so. A click loads the page, as any anchor does; for a route inside the app use RouterLink. Use Button or Pressable for an action that does not change the page. variant="subtle" keeps a dotted underline at rest, for a link among dense data such as a table cell, where colour alone does not mark it; DataTable draws its reference cells this way. A className you pass wins over its look.',
  playground: Playground,
  variants: [Tones, Variants, External],
  states: {
    render: (props) => <Link href="/saves/slot-2" onClick={stayHere} {...props}>Open slot 2</Link>,
    list: [STATE.idle, STATE.hover, STATE.focus],
  },
  code: CODE,
});

export default meta;
export { External, Overview, Playground, Tones, Variants };
