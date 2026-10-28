/* @layer stories @kind types */
type SeatState = 'filled' | 'attention' | 'held' | 'empty' | 'add';

type SeatBoardSet = 'states' | 'lobby' | 'clickable' | 'selected';

type SeatCardArgs = {
  state: SeatState;
  name: string;
  meta: string;
  reason: string;
  hint: string;
  label: string;
  lead: boolean;
  actions: boolean;
  clickable: boolean;
  selected: boolean;
};

interface SeatBoardProps {
  set: SeatBoardSet;
}

type SeatTakenSampleProps = Omit<SeatCardArgs, 'state'> & { state: 'filled' | 'attention' };

export type { SeatBoardProps, SeatCardArgs, SeatTakenSampleProps };
