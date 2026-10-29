/* @layer stories @kind component */
import { SeatCard } from '../../../src/composites';
import { Icon } from '../../../src/primitives';
import { noop, SEAT_ACTIONS } from './seat-story.constants';
import type { SeatTakenSampleProps } from './seat-story.type';

const SeatTakenSample = (args: SeatTakenSampleProps) => {
  const { state, name, meta, reason, lead, actions, clickable, selected } = args;
  return (
    <SeatCard
      className="seat-card-story__one"
      state={state}
      name={name}
      meta={meta || undefined}
      reason={reason || undefined}
      lead={lead ? <Icon name="users" size={24} aria-hidden /> : undefined}
      actions={actions ? SEAT_ACTIONS : undefined}
      selected={selected}
      onSelect={clickable ? noop : undefined}
    />
  );
};

export { SeatTakenSample };
