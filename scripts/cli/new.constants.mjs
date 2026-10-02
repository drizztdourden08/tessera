/* @layer tooling-scripts @kind data */
const KINDS = ['primitive', 'composite', 'compound', 'view'];
const TESSERA_KINDS = ['primitive', 'composite'];
const APP_PART_KINDS = ['primitive', 'composite'];
const PACKAGE_NAME = '@drizztdourden08/tessera';
const NAME_RULE = /^[A-Z][A-Za-z0-9]*[a-z][A-Za-z0-9]*$/;
const DEFAULT_ICON = 'component';
const TREE_SEPARATOR = ' > ';
const STORYLITE = '@storylite/storylite';
const SIDEBAR_FILE = '.storylite/sidebar-icons.constants.ts';
const ICON_DIR = 'node_modules/@iconify-icons/lucide';

const FOLDERS = {
  primitive: 'src/primitives',
  composite: 'src/composites',
  compound: 'src/compounds',
  view: 'src/views',
};

const STORY_FOLDERS = {
  primitive: 'stories/primitives',
  composite: 'stories/composites',
  compound: 'stories/compounds',
  view: 'stories/views',
};

const CATALOGUE_FILES = {
  primitive: '.storylite/catalogue-primitives.constants.ts',
  composite: '.storylite/catalogue-composites.constants.ts',
};

const APP_TIERS = { primitive: 'Primitives', composite: 'Composites', compound: 'Compounds', view: 'Views' };

const LAYERS = { tessera: 'renderer-components', app: 'renderer-app' };

const APP_PART_WARNING = 'Most primitives and composites belong in Tessera. Build it there unless only this app will ever need it.';

const NEW_USAGE = `tessera new <kind> <Name> [options]

  kind              primitive or composite in the Tessera repo;
                    compound, view, primitive or composite in an app that uses Tessera
  Name              the component name in PascalCase, such as SaveSlot

Options:
  --group <group>   the gallery group the page goes under, such as Layout (Tessera: asked when left out)
  --tree <path>     where it sits in the decision tree, answers joined by " > ",
                    such as "actions > one action > a visible word" (asked when left out,
                    and a building block when none is picked)
  --icon <name>     the Lucide icon of its gallery page in Tessera (default ${DEFAULT_ICON})
  --yes             create an app primitive or composite without asking
  --dry-run         list the files it would write and change, and write nothing
  -h, --help        this text
`;

export {
  APP_PART_KINDS, APP_PART_WARNING, APP_TIERS, CATALOGUE_FILES, DEFAULT_ICON, FOLDERS, ICON_DIR, KINDS, LAYERS, NAME_RULE,
  NEW_USAGE, PACKAGE_NAME, SIDEBAR_FILE, STORY_FOLDERS, STORYLITE, TESSERA_KINDS, TREE_SEPARATOR,
};
