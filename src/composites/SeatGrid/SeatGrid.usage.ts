/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'The grid that lays seat cards side by side and wraps them to the width, with the same gap and the same smallest width for every seat.',
  useWhen: [
    'A lobby shows its seats as cards that should fill the row and wrap to the next one on a narrow screen.',
    'Taken, open and add seats sit in one grid and must line up at the same size.',
  ],
  avoidWhen: [
    { case: 'Cards of any kind laid out on columns or a smallest width in pixels.', use: 'Grid' },
    { case: 'A long grid of equal tiles drawn only where it is in view.', use: 'VirtualGrid' },
  ],
  rules: [
    'Put SeatCard children in it; the columns are as many as fit at minWidth, and they share the free width.',
    'Pick minWidth sm, md or lg for the smallest a seat gets; md is the default.',
    'Pick gap xs, sm, md or lg for the space between seats; md is the default.',
    'Pass label to name the grid, such as Agents of the project.',
  ],
  a11y: [
    'The grid is a group named by label, so the seats are heard as one set.',
    'The order of the children is the reading and the tab order; put the add seat last.',
  ],
  tree: {
    path: ['data', 'the seats of a lobby, taken, open or to add'],
    rule: 'SeatGrid gives every lobby the same wrapping grid of seats, with the sizes set by tokens.',
  },
  example: `import { SeatCard, SeatGrid } from '@drizztdourden08/tessera';

const Table = ({ addSeat }: { addSeat: () => void }) => (
  <SeatGrid label="Seats at the table" minWidth="lg" gap="lg">
    <SeatCard state="filled" name="Ada" meta="Host" />
    <SeatCard state="empty" label="Seat 2" />
    <SeatCard state="add" label="Add a seat" onSelect={addSeat} />
  </SeatGrid>
);
`,
  propsHash: '30f02b083b4cce40',
} satisfies ComponentUsage;

export { usage };
