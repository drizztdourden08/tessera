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

const TESSERA_EXTRA_FOLDERS = ['src/brand'];

const SCHEMA_PATH = './node_modules/@drizztdourden08/tessera/tessera.config.schema.json';

const CONFIG_HINT = `no tessera.config.json here or above, so the files go to the default folders: src/<kind>s and stories/. To choose the folders, add tessera.config.json at the repo root with { "$schema": "${SCHEMA_PATH}" } and its parts.`;

const CATALOGUE_FILES = {
  primitive: '.storylite/catalogue-primitives.constants.ts',
  composite: '.storylite/catalogue-composites.constants.ts',
};

const APP_TIERS = { primitive: 'Primitives', composite: 'Composites', compound: 'Compounds', view: 'Views' };

const TESSERA_LAYER = 'renderer-components';
const LAYER_RULE = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/;

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
  --into <folder>   the folder to write in, when tessera.config.json lists more than one for the kind
  --layer <name>    the @layer tag of the new files in an app, such as renderer-shell
                    (default: layer in tessera.config.json, else renderer-app)
  --icon <name>     the Lucide icon of its gallery page in Tessera (default ${DEFAULT_ICON})
  --yes             create an app primitive or composite without asking
  --dry-run         list the files it would write and change, and write nothing
  -h, --help        this text
`;

export {
  APP_PART_KINDS, APP_PART_WARNING, APP_TIERS, CATALOGUE_FILES, CONFIG_HINT, DEFAULT_ICON, ICON_DIR, KINDS, LAYER_RULE, NAME_RULE,
  NEW_USAGE, PACKAGE_NAME, SIDEBAR_FILE, STORYLITE, TESSERA_EXTRA_FOLDERS, TESSERA_KINDS, TESSERA_LAYER, TREE_SEPARATOR,
};
