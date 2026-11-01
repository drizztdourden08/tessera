/* @layer stories @kind constants */
interface TileEntry {
  id: string;
  name: string;
}

interface FolderEntry {
  key: string;
  label: string;
  items: readonly TileEntry[];
}

interface CardEntry {
  id: string;
  name: string;
  lines: number;
}

interface CardSection {
  key: string;
  label: string;
  items: readonly CardEntry[];
}

const LINE_PATTERN = [1, 4, 2, 6, 3, 5] as const;

const cardsOf = (sections: number, perSection: number): readonly CardSection[] =>
  Array.from({ length: sections }, (_, section) => ({
    key: `group-${section + 1}`,
    label: `Group ${section + 1}`,
    items: Array.from({ length: perSection }, (__, at) => ({
      id: `g${section + 1}-c${at}`,
      name: `Card ${at + 1}`,
      lines: LINE_PATTERN[(at * 5 + Math.floor(at / 3) + section) % LINE_PATTERN.length] ?? 1,
    })),
  }));

const tilesOf = (count: number): readonly TileEntry[] =>
  Array.from({ length: count }, (_, at) => ({ id: `tile-${at}`, name: `${at + 1}` }));

const foldersOf = (folders: number, perFolder: number): readonly FolderEntry[] =>
  Array.from({ length: folders }, (_, folder) => ({
    key: `folder-${folder + 1}`,
    label: `Folder ${folder + 1}`,
    items: Array.from({ length: perFolder + folder * 3 }, (__, at) => ({ id: `f${folder + 1}-t${at}`, name: `${at + 1}` })),
  }));

export type { CardEntry, FolderEntry, TileEntry };
export { cardsOf, foldersOf, tilesOf };
