/* @layer stories @kind component */
import { SeatCard, SeatGrid } from '../../../src/composites';
import { Icon } from '../../../src/primitives';
import { noop, SEAT_ACTIONS } from './seat-story.constants';
import type { SeatBoardProps } from './seat-story.type';

const lead = <Icon name="users" size={24} aria-hidden />;

const SeatBoard = ({ set }: SeatBoardProps) => {
  if (set === 'states') {
    return (
      <SeatGrid label="The four states">
        <SeatCard state="filled" name="Planner" meta="Opus, 12 min" lead={lead} actions={SEAT_ACTIONS} />
        <SeatCard state="attention" name="Builder" meta="Sonnet, 3 min" lead={lead} reason="Waiting for your answer" actions={SEAT_ACTIONS} />
        <SeatCard state="empty" label="Seat 3" hint="Add an agent to fill it" />
        <SeatCard state="add" label="Add a seat" onSelect={noop} />
      </SeatGrid>
    );
  }
  if (set === 'clickable') {
    return (
      <SeatGrid label="Clickable seats" minWidth="lg">
        <SeatCard state="filled" name="Planner" meta="Opus, 12 min" lead={lead} onSelect={noop} />
        <SeatCard state="attention" name="Builder" meta="Sonnet, 3 min" lead={lead} reason="Waiting for your answer" onSelect={noop} />
        <SeatCard state="add" label="Add a seat" onSelect={noop} />
      </SeatGrid>
    );
  }
  return (
    <SeatGrid label="Agents of the project">
      <SeatCard state="filled" name="Planner" meta="Opus, 12 min" lead={lead} onSelect={noop} />
      <SeatCard state="filled" name="Reviewer" meta="Sonnet, idle" lead={lead} onSelect={noop} />
      <SeatCard state="attention" name="Builder" meta="Sonnet, 3 min" lead={lead} reason="Waiting for your answer" onSelect={noop} />
      <SeatCard state="empty" label="Seat 4" hint="Add an agent to fill it" />
      <SeatCard state="empty" label="Seat 5" />
      <SeatCard state="add" label="Add a seat" onSelect={noop} />
    </SeatGrid>
  );
};

export { SeatBoard };
