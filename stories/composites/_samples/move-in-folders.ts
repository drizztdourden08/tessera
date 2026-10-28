/* @layer stories @kind logic */
import type { VirtualGridDrop } from '../../../src/composites';
import type { FolderEntry } from './virtual-grid-samples.constants';

const intoFolder = (folders: readonly FolderEntry[], keys: readonly string[], section: string): readonly FolderEntry[] => {
  const moving = new Set(keys);
  const picked = folders.flatMap((folder) => folder.items.filter((tile) => moving.has(tile.id)));
  return folders.map((folder) => {
    const rest = folder.items.filter((tile) => !moving.has(tile.id));
    return { ...folder, items: folder.key === section ? [...rest, ...picked] : rest };
  });
};

const moveInFolders = (folders: readonly FolderEntry[], keys: readonly string[], to: VirtualGridDrop): readonly FolderEntry[] => {
  const moving = new Set(keys);
  const all = folders.flatMap((folder) => folder.items);
  const picked = all.filter((tile) => moving.has(tile.id));
  const anchor = all.slice(to.index).find((tile) => !moving.has(tile.id));
  return folders.map((folder) => {
    const rest = folder.items.filter((tile) => !moving.has(tile.id));
    if (folder.key !== to.section) return { ...folder, items: rest };
    const at = anchor ? rest.findIndex((tile) => tile.id === anchor.id) : -1;
    return { ...folder, items: at < 0 ? [...rest, ...picked] : [...rest.slice(0, at), ...picked, ...rest.slice(at)] };
  });
};

export { intoFolder, moveInFolders };
