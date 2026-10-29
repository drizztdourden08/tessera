/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A colour picker panel placed in the page, with a field, a hex box, an alpha slider and swatch groups.',
  useWhen: [
    'The user sets a colour and the picker has room in the page, such as a panel in a settings screen.',
    'The user chooses from your own swatch groups, such as a palette: pass swatchGroups.',
  ],
  avoidWhen: [
    { case: 'The picker should open from a swatch button and close again.', use: 'ColorPickerPopover' },
    { case: 'The colour is shown, not edited.', use: 'ColorSwatch' },
  ],
  rules: [
    'Import ColorPicker from @drizztdourden08/tessera/color-picker and ColorPickerPopover from @drizztdourden08/tessera/color-picker-popover. They are not on the main export, so an app that never uses them never loads the colour library.',
    'The app owns the colour: pass value as a hex string and onChange; add alpha and onAlphaChange for an alpha channel, or disableAlpha to hide it.',
    'Pass original to show the colour the user started from, and onReset to put it back.',
    'Pass modes, such as ["hsv", "oklch", "rgb"], to show tabs over one value; mode and onModeChange control the tab. Without modes the panel keeps the field and the RGB boxes.',
    'The OKLCH tab keeps the lightness, chroma and hue the user typed, clamps the colour it hands back to sRGB, and shows a notice while the typed colour is outside that range.',
    'name puts your own field under the title, such as a rename box, and footer puts your own content under the buttons.',
  ],
  a11y: [
    'The field, the sliders and the hex box are labelled and reachable by keyboard; swatches are buttons with the colour as their name, and the current colour swatch reads Current colour with its hex.',
    'The model tabs follow the tab pattern with arrow keys, and the out of range notice is a status message.',
  ],
  tree: {
    path: ['a value the user sets', 'a colour', 'in the page'],
    rule: 'ColorPicker is the colour panel placed in the page; import it from the color-picker subpath.',
  },
  example: `import { ColorPicker } from '@drizztdourden08/tessera/color-picker';

interface BrushColorProps {
  color: string;
  onColor: (hex: string) => void;
}

const BrushColor = ({ color, onColor }: BrushColorProps) => (
  <ColorPicker value={color} onChange={onColor} disableAlpha />
);
`,
  propsHash: 'be5dde01521f599a',
} satisfies ComponentUsage;

export { usage };
