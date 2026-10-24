/* @layer tooling-scripts @kind logic */
import { ICNS_ENTRIES } from './app-icons.constants.mjs';
import { ladder } from './app-files.mjs';
import { artFile, markArt } from './art.mjs';
import { icns } from './raster.mjs';

const buildFileTypes = async (write, id, loaded) => {
  const { fileTypes } = loaded.family[id];
  const written = [];
  for (const files of loaded.fileTypeFiles(id)) {
    const artAt = (size) => markArt(loaded.fileTypeArt(fileTypes.look, files.type, loaded.fileTypeGridFor(size)));
    written.push(
      write(files.svg, artFile(artAt(Number.POSITIVE_INFINITY), files.label)),
      ...await ladder(write, artAt, files, loaded.sizes),
      write(files.icns, icns(artAt, ICNS_ENTRIES)),
    );
  }
  return written;
};

export { buildFileTypes };
