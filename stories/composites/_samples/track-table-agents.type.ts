/* @layer stories @kind types */
interface TrackAgent {
  id: string;
  name: string;
  state: 'up' | 'busy' | 'down';
  node: string;
  tasks: number;
  seen: string;
}

type TrackWidth = 'wide' | 'medium' | 'narrow' | 'tiny';

export type { TrackAgent, TrackWidth };
