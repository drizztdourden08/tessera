/* @layer stories @kind component */
import { SeatCard } from '../../../src/composites';
import { Icon } from '../../../src/primitives';
import { noop, SEAT_ACTIONS } from './seat-story.constants';
import type { SeatCardArgs } from './seat-story.type';

const SeatSample = (args: SeatCardArgs) => {
  const { state, name, meta, reason, hint, label, lead, actions, clickable } = args;
  if (state === 'add') return <SeatCard className="seat-card-story__one" state="add" label={label} onSelect={noop} />;
  if (state === 'empty') return <SeatCard className="seat-card-story__one" state="empty" label={label} hint={hint || undefined} />;
  return (
    <SeatCard
      className="seat-card-story__one"
      state={state}
      name={name}
      meta={meta || undefined}
      reason={reason || undefined}
      lead={lead ? <Icon name="users" size={24} aria-hidden /> : undefined}
      actions={actions ? SEAT_ACTIONS : undefined}
      onSelect={clickable ? noop : undefined}
    />
  );
};

export { SeatSample };
