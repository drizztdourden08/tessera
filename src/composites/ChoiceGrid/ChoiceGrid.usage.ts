/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A row or grid of any cells where the user picks one, as a radio group or a listbox, with one Tab stop, arrow keys and optional sections.',
  useWhen: [
    'The user picks one swatch, brush, pattern or tile from a strip or a grid, such as a palette row or a brush picker.',
    'The cells are your own content, drawn by renderCell, such as a ColorSwatch or an Image.',
    'A popover opens under a held press and the user picks by letting go over a cell: set pickOnRelease.',
  ],
  avoidWhen: [
    { case: 'A few text options in one line, all in view.', use: 'SegmentedControl' },
    { case: 'Many text options in a list, or found by typing.', use: 'Select' },
    { case: 'Several choices at once.', use: 'CheckList' },
    { case: 'A long grid of equal tiles drawn only where it is in view.', use: 'VirtualGrid' },
  ],
  rules: [
    'Pass label, value and onChange, and the cells or the sections. A section has an id, an optional label and its cells.',
    'Leave columns out for one row; pass columns for a grid with that many columns in each section.',
    'role is radiogroup by default, and an arrow key picks as it moves. Pass listbox to move without picking; Enter and Space pick.',
    'Spread state.props from renderCell onto the cell you draw, such as a ColorSwatch with focusRing apart, so it keeps the role, the name and the Tab stop.',
    'pickOnRelease picks on the pointer up over a cell, even when the press started elsewhere, so a palette opened at a point picks by release.',
    'footer takes an add button or a hint under the cells. A ramp strip is a ChoiceGrid of ColorSwatch cells.',
  ],
  a11y: [
    'The grid is one Tab stop; arrows move inside it, Home and End jump to the first and last cell, and Up and Down step by a row when columns is set.',
    'Each cell has the role radio or option, a name from its label, and its checked or selected state.',
    'A labelled section is a group named by its heading.',
  ],
  tree: {
    path: ['a value the user sets', 'a colour from a palette'],
    rule: 'ChoiceGrid is the strip or grid of cells where one is picked; draw each cell as a ColorSwatch for a palette.',
  },
  example: `import { ChoiceGrid, ColorSwatch } from '@drizztdourden08/tessera';

interface RampStripProps {
  ramp: readonly string[];
  index: number;
  onIndex: (index: number) => void;
}

const RampStrip = ({ ramp, index, onIndex }: RampStripProps) => (
  <ChoiceGrid
    label="Ramp"
    value={String(index)}
    onChange={(value) => onIndex(Number(value))}
    cells={ramp.map((hex, i) => ({ value: String(i), label: \`Shade \${i + 1}, \${hex}\` }))}
    renderCell={(cell, state) => (
      <ColorSwatch
        size="sm"
        color={ramp[Number(cell.value)] ?? '#000000'}
        caption={Number(cell.value) + 1}
        selected={state.selected}
        focusRing="apart"
        {...state.props}
      />
    )}
  />
);
`,
  propsHash: 'd22385ee1c913ab4',
} satisfies ComponentUsage;

export { usage };
