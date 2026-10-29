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

const tilesOf = (count: number): readonly TileEntry[] =>
  Array.from({ length: count }, (_, at) => ({ id: `tile-${at}`, name: `${at + 1}` }));

const foldersOf = (folders: number, perFolder: number): readonly FolderEntry[] =>
  Array.from({ length: folders }, (_, folder) => ({
    key: `folder-${folder + 1}`,
    label: `Folder ${folder + 1}`,
    items: Array.from({ length: perFolder + folder * 3 }, (__, at) => ({ id: `f${folder + 1}-t${at}`, name: `${at + 1}` })),
  }));

export type { FolderEntry, TileEntry };
export { foldersOf, tilesOf };
