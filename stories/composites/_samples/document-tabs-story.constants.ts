/* @layer stories @kind data */
import type { DocumentTab } from '../../../src/composites';
import type { PlaygroundArgTypes } from '../../_template/controls/playground.type';
import type { DocumentSet, DocumentTabsArgs } from './document-tabs-story.type';

const THREE_DOCUMENTS: readonly DocumentTab[] = [
  { id: 'hero', title: 'hero-idle.bxl', icon: 'image', tooltip: 'art/characters/hero-idle.bxl' },
  { id: 'tiles', title: 'forest-tiles.bxl', icon: 'layers', unsaved: true, tooltip: 'art/tiles/forest-tiles.bxl' },
  { id: 'logo', title: 'logo-16px.bxl', icon: 'image', tooltip: 'art/ui/logo-16px.bxl' },
];

const MANY_DOCUMENTS: readonly DocumentTab[] = Array.from({ length: 24 }, (_, index) => ({
  id: `sprite-${String(index + 1)}`,
  title: `sprite-sheet-${String(index + 1)}.bxl`,
  icon: 'image',
  unsaved: index % 6 === 2,
}));

const DOCUMENT_SETS: Readonly<Record<DocumentSet, readonly DocumentTab[]>> = { three: THREE_DOCUMENTS, many: MANY_DOCUMENTS, none: [] };

const DOCUMENT_TABS_ARGS: DocumentTabsArgs = { documents: 'three', menu: false };

const DOCUMENT_TABS_ARG_TYPES: PlaygroundArgTypes<DocumentTabsArgs> = {
  documents: { group: 'Content', control: 'select', options: ['three', 'many', 'none'], description: 'How many documents the strip starts with.' },
  menu: { group: 'Content', control: 'boolean', description: 'The menu that lists every open document.' },
};

const DOCUMENT_TABS_CODE = `import { DocumentTabs } from '@drizztdourden08/tessera';

<DocumentTabs
  label="Open drawings"
  tabs={drawings}
  activeId={activeId}
  onActivate={setActiveId}
  onClose={askToClose}
  onMove={moveDrawing}
  overflowMenu
/>`;

export { DOCUMENT_SETS, DOCUMENT_TABS_ARG_TYPES, DOCUMENT_TABS_ARGS, DOCUMENT_TABS_CODE };
