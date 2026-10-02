/* @layer stories @kind data */
import { GUIDE_LINKS } from './guide-links.constants';
import { LINT_POINTS, TIER_TOPIC, USAGE_TOPIC } from './guide-shared.constants';
import type { Guide } from './guide.type';

const VIEWS_GUIDE: Guide = {
  name: 'Building views',
  description: 'A view is a screen or a feature of the app. It is the one tier that owns state and talks to stores, IPC and the router, then hands data down to compounds and Tessera parts.',
  topics: [
    {
      title: 'What a view is',
      points: [
        'A screen or a feature: `ProfileHub`, `GameStore`, `SaveList`.',
        'It owns state, reads stores, calls IPC and navigates.',
        'It draws through compounds and Tessera parts, and passes data down by props.',
        'Logic goes in hooks under `behavior/`, so the component file reads as layout.',
      ],
    },
    TIER_TOPIC,
    {
      title: 'Where files go',
      points: [
        'One folder per view, in the same shape as a compound, in the `parts.views` folder of the app: `src/views/<Name>/` by default.',
        'In a monorepo, views stay in each app. Set the folder per app under `apps` in `tessera.config.json`, such as `apps/desktop/src/views`.',
        'Each hook has its own file under `behavior/`, named after the hook.',
      ],
      code: `src/views/SaveList/
  SaveList.tsx            the screen
  SaveList.css            its layout, tokens only
  SaveList.type.ts        its types
  SaveList.usage.ts       what it is for
  index.ts                the barrel
  behavior/
    useSaves.ts           reads the store and opens a save`,
      language: 'text',
    },
    {
      title: 'Links and routes',
      points: [
        `${GUIDE_LINKS.routerLink} for a route inside the app, ${GUIDE_LINKS.link} for a URL.`,
        'Wrap `RouterLink` once in an `AppLink` compound that passes the router navigate. Views use `AppLink`.',
        'Never import the router into a compound. A compound takes an `onOpen` callback or an `AppLink` child.',
      ],
    },
    USAGE_TOPIC,
    { title: 'Lint rules', points: [...LINT_POINTS, 'A view may import stores, IPC and the router. Every other rule still holds.'] },
    {
      title: 'Create one',
      points: [
        'Create one with the Tessera CLI: `brock tessera new view SaveList` (`pnpm exec tessera` outside Brock). It writes the folder above with its usage file, a story when the app uses StoryLite, and lists what to fill in next.',
        `Back to ${GUIDE_LINKS.setup}.`,
      ],
    },
  ],
  example: {
    name: 'SaveList.tsx',
    code: `import { EmptyState, Stack } from '@drizztdourden08/tessera';
import { AppLink } from '../../compounds/AppLink';
import { SaveSlot } from '../../compounds/SaveSlot';
import { useSaves } from './behavior/useSaves';
import './SaveList.css';

const SaveList = () => {
  const { saves, openSave } = useSaves();
  if (saves.length === 0) {
    return <EmptyState message="No saves yet." action={<AppLink to="/saves/new">New save</AppLink>} />;
  }
  return (
    <Stack gap="md" className="save-list">
      {saves.map((save) => <SaveSlot key={save.id} save={save} onOpen={openSave} />)}
    </Stack>
  );
};

export { SaveList };`,
  },
};

export { VIEWS_GUIDE };
