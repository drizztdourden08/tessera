/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A very long grid of equal tiles, such as sprite thumbnails, in sections if wanted, where only the rows in view are drawn, with the arrow keys to move between tiles.',
  useWhen: [
    'The grid has thousands of tiles, such as every frame of a sprite sheet or every image of a folder, and drawing them all would slow the page.',
    'Every tile is the same size and the app draws the content of each tile.',
    'The tiles fall into groups, such as the folders of a library, each under a header row that collapses.',
    'The user moves through the tiles with the keys and the grid must scroll to follow.',
  ],
  avoidWhen: [
    { case: 'A long list of rows, one per line.', use: 'VirtualList' },
    { case: 'A short set of cards that can all be drawn at once.', use: 'ItemCard' },
    { case: 'Records with columns the user sorts, groups or resizes.', use: 'DataTable' },
  ],
  rules: [
    'Give it items, getKey and renderItem; getKey returns a stable id, never the position.',
    'Give label a name for the grid, since the tiles are drawn without a heading of their own.',
    'Size the grid from its parent: it fills the height of its box and scrolls inside it.',
    'Pick a square tile with tileSize, the name of a size token such as size-96; tileWidth and tileHeight size a tile that is not square and win over tileSize; the columns that fit the width of the box are worked out from the width, and a raw pixel number is not accepted.',
    'Give sections instead of items to group the tiles: each section has a key, a label and its items, and an optional count to show in the header instead of the number of items.',
    'The index given to renderItem, getKey and onActiveChange runs through all the sections, and onActiveChange is not called for a header.',
    'A header spans all the columns and takes part in the scroll like a row of its own; its height is fixed by the grid.',
    'A section takes actions, the same list of actions as an ItemCard, drawn as icon buttons at the end of its header, and depth, a whole number that indents the header by one step per level for nested folders.',
    'Hold the collapsed sections with collapsed (a list of keys) and onToggleSection(key, collapsed), or leave both out and give defaultCollapsed for the start; keep the list stable between renders.',
    'Give scrollRef the ref of a marquee container and spread bind of useMarqueeSelect on the grid; every tile carries data-marquee-key set to its getKey, and overlay takes the MarqueeBox that follows the content.',
    'Give ref a ref and call scrollToIndex(index, align) to scroll a tile into view; align is start, center, end or nearest, and nearest is the default; the index of a tile in a collapsed section scrolls to its header.',
    'Give a marquee every tile, drawn or not, with getRects on the ref: useMarqueeSelect({ getRects: () => gridRef.current?.getRects() ?? [] }); the rects come from the layout, not the page, and the tiles of a collapsed section are left out.',
    'Keep renderItem cheap and free of its own size; the tile cuts what does not fit, and the tile pads its content.',
    'Raise overscan for tiles that load slowly while the user scrolls fast; the default is 2 rows on each side.',
    'Use onActiveChange to follow the tile that holds focus, such as to show its detail beside the grid.',
  ],
  a11y: [
    'The grid is a grid of cells with the row and column of each, so a reader hears where the tile is among thousands.',
    'One tile is in the tab order; the four arrows move by a tile or a row, Home and End go to the start or end of the row, Ctrl with them goes to the first or last tile, and Page Up and Page Down move by a screen of rows.',
    'A header is a cell that says if it is open; Enter, Space and a click toggle it, Left closes it and Right opens it, and Right on an open header goes to its first tile.',
    'Up and Down move between the tiles and the headers, and Left and Right step through tiles to the next header and back.',
    'A tile or a header that holds focus stays drawn when it scrolls out of view, so the keys keep working.',
    'The actions of a header are in the tab order after the header; the arrows, Enter, Space, Left and Right act only when the header itself has focus, and a click on an action does not toggle the header.',
    'Keys act only when the tile itself has focus, so a field inside a tile keeps its own arrow keys.',
  ],
  tree: {
    path: ['data', 'a long grid of equal tiles drawn only where it is in view'],
    rule: 'VirtualGrid draws only the rows of tiles in view, so a grid of any size opens at once and scrolls smoothly.',
  },
  example: `import { VirtualGrid } from '@drizztdourden08/tessera';

interface Frame {
  id: string;
  name: string;
}

const Thumbnails = ({ frames }: { frames: Frame[] }) => (
  <VirtualGrid
    label="Frames"
    items={frames}
    getKey={(frame) => frame.id}
    renderItem={(frame) => frame.name}
    tileSize="size-64"
  />
);

interface Folder {
  key: string;
  label: string;
  items: Frame[];
}

const Library = ({ folders }: { folders: Folder[] }) => (
  <VirtualGrid
    label="Library"
    sections={folders}
    getKey={(frame) => frame.id}
    renderItem={(frame) => frame.name}
    tileWidth="size-128"
    tileHeight="size-64"
    defaultCollapsed={['archive']}
  />
);
`,
  propsHash: '560a684fc3d8d53b',
} satisfies ComponentUsage;

export { usage };
