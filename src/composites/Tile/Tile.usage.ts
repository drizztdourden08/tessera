/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'One square tile of a grid: a picture or any media, a name line under it and up to four marks in its corners, with a selected and a focused look.',
  useWhen: [
    'A browser shows files, sprites or assets as thumbnails in a grid, with a name under each and small marks for their state.',
    'A tile in a VirtualGrid needs a selected look and a focus look that stay apart.',
  ],
  avoidWhen: [
    { case: 'A catalogue item with a title, tags, details and actions.', use: 'ItemCard' },
    { case: 'One seat of a lobby: taken, open or to add.', use: 'SeatCard' },
    { case: 'One row of a list, with columns and actions.', use: 'ListItemRow' },
  ],
  rules: [
    'media is the picture or any node, such as an Image with fit contain. It fills a square and never changes the size of the tile.',
    'name is the one line under the media; a long name is cut with an ellipsis and a plain string is also the title.',
    'corners takes topStart, topEnd, bottomStart and bottomEnd. Put a Badge, a Tag, an Icon or any small node in a corner; leave the rest out.',
    'The tile does not select itself. Pass selected and focused from the grid, and pass role, tabIndex and the handlers the grid gives you.',
    'With a role, selected is also reported as aria-selected. focused draws the focus ring for a tile the grid marks with aria-activedescendant.',
    'The tile fills its cell, so the grid sets its width: a slider can drive the tile size of a VirtualGrid, and a very small size can switch the grid to a list.',
  ],
  a11y: [
    'The tile is plain content: the grid gives it a role such as option or gridcell and its tab stop.',
    'A corner mark that carries meaning needs its own label, since the corner is not read as text.',
    'The name is the text of the tile; give media an empty alt unless it says something the name does not.',
  ],
  tree: {
    path: ['data', 'one item as a tile with a picture, a name and corner marks'],
    rule: 'Tile gives every grid of thumbnails the same square media, name line and four corner marks.',
  },
  example: `import { Badge, Image, Tile } from '@drizztdourden08/tessera';

interface SpriteTileProps {
  name: string;
  src: string;
  picked: boolean;
  frames: number;
}

const SpriteTile = ({ name, src, picked, frames }: SpriteTileProps) => (
  <Tile
    name={name}
    selected={picked}
    media={<Image src={src} alt="" fit="integer" backdrop="checker" pixelated />}
    corners={{ bottomEnd: <Badge variant="inline" value={frames} label="Frame count" /> }}
  />
);
`,
  propsHash: '8c89c78810df246a',
} satisfies ComponentUsage;

export { usage };
