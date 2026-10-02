/* @layer stories @kind data */
const DOCS = 'https://github.com/drizztdourden08/tessera/blob/main/docs';

const GUIDE_LINKS = {
  usingTessera: `[docs/using-tessera.md](${DOCS}/using-tessera.md)`,
  designSystem: `[docs/design-system.md](${DOCS}/design-system.md)`,
  codingStandards: `[docs/coding-standards.md](${DOCS}/coding-standards.md)`,
  setup: '[Setup](#/story/setup-setup--overview)',
  provider: '[TesseraProvider](#/story/setup-tesseraprovider--overview)',
  compounds: '[Building compounds](#/story/setup-buildingcompounds--overview)',
  views: '[Building views](#/story/setup-buildingviews--overview)',
  appParts: '[App primitives and composites](#/story/setup-appparts--overview)',
  link: '[Link](#/story/primitives-link--overview)',
  routerLink: '[RouterLink](#/story/primitives-routerlink--overview)',
} as const;

export { GUIDE_LINKS };
