# ColorPicker

A colour picker panel placed in the page, with a field, a hex box, an alpha slider and swatch groups.

Import it from `@drizztdourden08/tessera/color-picker`.

```tsx
import { ColorPicker } from '@drizztdourden08/tessera/color-picker';
```

The source is `src/composites/ColorPicker/ColorPicker.tsx`. Its gallery page is Composites · Inputs/ColorPicker (`#/story/composites-colorpicker--overview`).

## Where the questions lead here

What are you placing? A value the user sets. What does the user set? A colour. Where does the picker sit? In the page.

ColorPicker is the colour panel placed in the page; import it from the color-picker subpath.

## Use it when

- The user sets a colour and the picker has room in the page, such as a panel in a settings screen.
- The user chooses from your own swatch groups, such as a palette: pass swatchGroups.

## Use something else when

- The picker should open from a swatch button and close again. Use `ColorPickerPopover` instead.
- The colour is shown, not edited. Use `ColorSwatch` instead.

## Rules

- Import ColorPicker from @drizztdourden08/tessera/color-picker and ColorPickerPopover from @drizztdourden08/tessera/color-picker-popover. They are not on the main export, so an app that never uses them never loads the colour library.
- The app owns the colour: pass value as a hex string and onChange; add alpha and onAlphaChange for an alpha channel, or disableAlpha to hide it.
- Pass original to show the colour the user started from, and onReset to put it back.
- Pass modes, such as ["hsv", "oklch", "rgb"], to show tabs over one value; mode and onModeChange control the tab. Without modes the panel keeps the field and the RGB boxes.
- The OKLCH tab keeps the lightness, chroma and hue the user typed, clamps the colour it hands back to sRGB, and shows a notice while the typed colour is outside that range.
- Name puts your own field under the title, such as a rename box, and footer puts your own content under the buttons.

## Accessibility

- The field, the sliders and the hex box are labelled and reachable by keyboard; swatches are buttons with the colour as their name.
- The model tabs follow the tab pattern with arrow keys, and the out of range notice is a status message.

## Example

```tsx
import { ColorPicker } from '@drizztdourden08/tessera/color-picker';

interface BrushColorProps {
  color: string;
  onColor: (hex: string) => void;
}

const BrushColor = ({ color, onColor }: BrushColorProps) => (
  <ColorPicker value={color} onChange={onColor} disableAlpha />
);
```

## Props

- `value`: `string`.
- `onChange`: `(hex: string) => void`.
- `alpha` (optional): `number`. Default `1`.
- `onAlphaChange` (optional): `(alpha: number) => void`.
- `disableAlpha` (optional): `boolean`. Default `false`.
- `title` (optional): `string`.
- `name` (optional): `ReactNode`.
- `footer` (optional): `ReactNode`.
- `modes` (optional): `readonly ColorMode[]`. Default `NO_MODES`.
- `mode` (optional): `ColorMode`, one of `'hsv'`, `'oklch'`, `'rgb'`.
- `onModeChange` (optional): `(mode: ColorMode) => void`.
- `original` (optional): `string`.
- `word` (optional): `number`.
- `snapped` (optional): `boolean`.
- `onReset` (optional): `() => void`.
- `onClose` (optional): `() => void`.
- `swatchGroups` (optional): `readonly SwatchGroup[]`.

## Tokens

It draws on `--border-width-thin`, `--c-border`, `--c-border-strong`, `--c-sunken`, `--c-surface`, `--c-text`, `--font-mono`, `--radius-md`, `--radius-sm`, `--size-12`, `--size-128`, `--size-16`, `--size-160`, `--size-256`, `--size-28`, `--space-2xs`, `--space-md`, `--space-sm`, `--space-xs`, `--text-sm`, `--text-xs`, `--tracking-caps`.
