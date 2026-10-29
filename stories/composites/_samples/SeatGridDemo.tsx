/* @layer stories @kind component */
import { SeatCard, SeatGrid } from '../../../src/composites';
import type { SeatGridArgs } from './seat-grid-story.type';

const noop = () => undefined;

const SeatGridDemo = ({ minWidth, gap, seats }: SeatGridArgs) => {
  const taken = Math.max(0, seats - 1);
  return (
    <SeatGrid label="Seats" minWidth={minWidth} gap={gap}>
      {Array.from({ length: taken }, (_, index) => (
        index % 3 === 2
          ? <SeatCard key={index} state="empty" label={`Seat ${String(index + 1)}`} hint="Open" />
          : <SeatCard key={index} state="filled" name={`Player ${String(index + 1)}`} meta="Ready" />
      ))}
      {seats > 0 && <SeatCard state="add" label="Add a seat" onSelect={noop} />}
    </SeatGrid>
  );
};

export { SeatGridDemo };
