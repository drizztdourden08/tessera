/* @layer stories @kind types */
type SeatState = 'filled' | 'attention' | 'empty' | 'add';

type SeatBoardSet = 'states' | 'lobby' | 'clickable';

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
};

interface SeatBoardProps {
  set: SeatBoardSet;
}

export type { SeatBoardProps, SeatCardArgs };
