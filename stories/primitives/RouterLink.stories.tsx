/* @layer stories @kind story */
import type { StoryLiteArgTypes, StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { LinkTone } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { LINK_TONES } from './_samples/link-tones.constants';
import { NAV_ROUTES } from './_samples/router-demo.constants';
import { RouterDemo } from './_samples/RouterDemo';

type RouterLinkArgs = {
  text: string;
  to: string;
  tone: LinkTone;
};

const ARGS: Partial<RouterLinkArgs> = { text: 'Open slot 2', to: '/saves/slot-2', tone: 'primary' };

const ARG_TYPES: StoryLiteArgTypes<RouterLinkArgs> = {
  text: { control: 'text' },
  to: { control: 'text', description: 'The destination handed to onNavigate, and the href unless href is set.' },
  tone: { control: 'select', options: [...LINK_TONES] },
};

const meta = {
  title: 'Primitives · Navigation/RouterLink',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<RouterLinkArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <RouterDemo routes={[{ to: args.to, label: args.text }]} tone={args.tone} />,
} satisfies StoryLiteStoryDefinition<RouterLinkArgs>;

const Nav = {
  name: 'An app nav',
  render: () => <RouterDemo routes={NAV_ROUTES} />,
} satisfies StoryLiteStoryDefinition<RouterLinkArgs>;

const CODE = `import { useHref, useNavigate } from 'react-router';
import { RouterLink } from '@drizztdourden08/tessera';
import type { RouterLinkProps } from '@drizztdourden08/tessera';

type AppLinkProps = Omit<RouterLinkProps, 'onNavigate' | 'href'>;

const AppLink = (props: AppLinkProps) => {
  const navigate = useNavigate();
  const href = useHref(props.to);
  return <RouterLink {...props} href={href} onNavigate={navigate} />;
};

<AppLink to="/saves/slot-2">Open slot 2</AppLink>`;

const Overview = overviewStory({
  component: 'RouterLink',
  description: 'A link to a route inside the app. It draws a real anchor with an href, so middle click, Ctrl click and Copy link work. A plain click does not load the page: it calls onNavigate(to), and the app router moves. It works with any router because the app hands it the navigate function; nothing goes through TesseraProvider. href is the address the anchor shows, and defaults to to; set it when the router adds a base path or a hash. Wrap it once in an app compound such as AppLink that passes the router navigate, then use that everywhere. It looks like Link and takes the same tones.',
  playground: Playground,
  variants: [Nav],
  code: CODE,
});

export default meta;
export { Nav, Overview, Playground };
