/* @layer stories @kind component */
import { SeatCard } from '../../../src/composites';
import { noop, SEAT_ACTIONS } from './seat-story.constants';
import type { SeatCardArgs } from './seat-story.type';
import { SeatTakenSample } from './SeatTakenSample';

const SeatSample = (args: SeatCardArgs) => {
  const { state, label, hint, actions } = args;
  if (state === 'add') return <SeatCard className="seat-card-story__one" state="add" label={label} onSelect={noop} />;
  if (state === 'empty') return <SeatCard className="seat-card-story__one" state="empty" label={label} hint={hint || undefined} />;
  if (state === 'held') {
    return <SeatCard className="seat-card-story__one" state="held" label={label} hint={hint || undefined} actions={actions ? SEAT_ACTIONS : undefined} />;
  }
  return <SeatTakenSample {...args} state={state} />;
};

export { SeatSample };
