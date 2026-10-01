/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { TesseraProvider } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { ALL_PARTS, PART_NOTES } from './_samples/provider-parts.constants';
import type { ProviderParts } from './_samples/provider-parts.constants';
import { APP_STRINGS } from './_samples/provider-app-strings.constants';
import { ProviderPlayground } from './_samples/provider-playground';
import { StringsDemo } from './_samples/provider-sections';
import { PROVIDER_SETUP_CODE } from './_samples/provider-setup-code.constants';

const NONE: ProviderParts = {
  spinner: false, writeText: false, link: false, imagePlaceholder: false, strings: false, errorFallback: false, emptyArt: false, icons: false,
};

const ARG_TYPES: StoryLiteArgTypes<ProviderParts> = {
  spinner: { control: 'boolean', description: PART_NOTES.spinner },
  writeText: { control: 'boolean', description: PART_NOTES.writeText },
  link: { control: 'boolean', description: PART_NOTES.link },
  imagePlaceholder: { control: 'boolean', description: PART_NOTES.imagePlaceholder },
  strings: { control: 'boolean', description: PART_NOTES.strings },
  errorFallback: { control: 'boolean', description: PART_NOTES.errorFallback },
  emptyArt: { control: 'boolean', description: PART_NOTES.emptyArt },
  icons: { control: 'boolean', description: PART_NOTES.icons },
};

const meta = {
  title: 'Primitives · Setup/TesseraProvider',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ProviderParts>;

const Playground = {
  name: 'Playground',
  args: ALL_PARTS,
  argTypes: ARG_TYPES,
  render: (args) => <ProviderPlayground parts={{ ...NONE, ...args }} />,
} satisfies StoryLiteStoryDefinition<ProviderParts>;

const TesseraParts = {
  name: 'Tessera parts, no overrides',
  render: () => <ProviderPlayground parts={NONE} />,
} satisfies StoryLiteStoryDefinition<ProviderParts>;

const OUTER = { strings: APP_STRINGS };

const INNER = { strings: { fields: { selectPlaceholder: 'Pick a build...', dropFiles: 'Drop a patch here' } } };

const NestedProvider = {
  name: 'A nested provider replaces only what it names',
  render: () => (
    <TesseraProvider overrides={OUTER}>
      <TesseraProvider overrides={INNER}>
        <StringsDemo />
      </TesseraProvider>
    </TesseraProvider>
  ),
} satisfies StoryLiteStoryDefinition<ProviderParts>;

const Overview = overviewStory({
  component: 'TesseraProvider',
  description: 'Swaps parts of Tessera for the app\'s own, once, at the root: the spinner, the clipboard writer behind every copy button, the link behind every href, the Image and Thumbnail placeholder, the built-in wording, the ErrorBoundary crash screen, the EmptyState art, the document portals render into, and the icon set behind Icon names. Each part is one entry of the overrides; a part left out keeps the Tessera default. Every Tessera component below the provider reads it, including the ones in dialogs and popups rendered through a portal, since a portal keeps the React tree. A provider inside another one keeps the outer parts and replaces the ones it names, and wording merges key by key; naming a part as undefined gives back the Tessera part for that subtree. Keep the overrides object stable, as a module constant. A separate React root, such as one inside an iframe, needs its own provider. It reads nothing from window or document while rendering, so it renders on the server.',
  playground: Playground,
  variants: [TesseraParts, NestedProvider],
  code: PROVIDER_SETUP_CODE,
});

export default meta;
export { NestedProvider, Overview, Playground, TesseraParts };
