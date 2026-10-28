/* @layer stories @kind data */
type TreeEntry = {
  id: string;
  name: string;
  folder: boolean;
  children?: TreeEntry[];
};

const file = (id: string, name: string): TreeEntry => ({ id, name, folder: false });

const folder = (id: string, name: string, children: TreeEntry[]): TreeEntry => ({ id, name, folder: true, children });

const PROJECT_FILES: TreeEntry[] = [
  folder('src', 'src', [
    folder('components', 'components', [file('button', 'Button.tsx'), file('tree', 'Tree.tsx'), file('list', 'List.tsx')]),
    folder('theme', 'theme', [file('tokens', 'tokens.css'), file('palette', 'palette.css')]),
    file('index', 'index.ts'),
  ]),
  folder('docs', 'docs', [file('guide', 'guide.md'), file('changes', 'changes.md')]),
  folder('assets', 'assets', []),
  file('readme', 'README.md'),
  file('package', 'package.json'),
];

const BIG_FOLDERS = 100;

const BIG_FILES = 100;

const bigTree = (): TreeEntry[] => Array.from({ length: BIG_FOLDERS }, (_, at) => folder(
  `big-${at}`,
  `folder ${at}`,
  Array.from({ length: BIG_FILES }, (__, inner) => file(`big-${at}-${inner}`, `file ${at}-${inner}.txt`)),
));

const LAZY_FOLDERS: TreeEntry[] = [
  { id: 'lazy-a', name: 'Opens after a pause', folder: true },
  { id: 'lazy-b', name: 'Also loads when opened', folder: true },
  file('lazy-c', 'A file'),
];

export { bigTree, LAZY_FOLDERS, PROJECT_FILES };
export type { TreeEntry };
