/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A small square that draws a pixel picture crisp, from RGBA bytes or palette pixels, with a checker behind clear pixels.',
  useWhen: [
    'A row, tile or drag ghost needs a preview of a sprite, a layer or a frame, drawn from data in memory.',
    'A live picture changes often and the preview must redraw at a calm pace, or only when it scrolls into view.',
  ],
  avoidWhen: [
    { case: 'The picture is a file or a URL, not pixels in memory.', use: 'Image' },
    { case: 'The caller draws into the canvas itself and needs no box, fit or checker.', use: 'Canvas' },
  ],
  rules: [
    'Pass `image` or `indexed`, not both; `null` clears the box and keeps the checker.',
    'Pick `box` from the size tokens, 16 to 256 px; `step` scales up in whole numbers, `contain` takes any scale.',
    'Pass `box="fluid"` to fill the width of the container as a square, so a diff view grows with its panel and stays crisp.',
    'Palette colours in `indexed` are `#rgb` or `#rrggbb`; the `transparent` index draws clear.',
    'Keep `frames` stable between renders, or the loop restarts; `playing` loops them and reduced motion shows frame 0.',
    'Use `lazy` for long lists and `throttleMs` for a live source; dim a hidden layer with a class from the caller.',
  ],
  a11y: [
    'It is hidden from screen readers and not focusable, since the row or tile that holds it carries the name.',
    'With a `label` it becomes an image with that name.',
    'High contrast draws a border in the system text colour, so the box stays visible.',
  ],
  buildingBlock: true,
  example: `import { PixelThumbnail } from '@drizztdourden08/tessera';
import type { RgbaImage } from '@drizztdourden08/tessera';

const LayerThumb = ({ picture }: { picture: RgbaImage | null }) => (
  <PixelThumbnail image={picture} box={24} throttleMs={80} lazy />
);
`,
  propsHash: 'e6a0849ffddf1c7d',
} satisfies ComponentUsage;

export { usage };
