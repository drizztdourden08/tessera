/* @layer stories @kind types */
interface TrackAgent {
  id: string;
  name: string;
  state: 'up' | 'busy' | 'down';
  node: string;
  tasks: number;
  seen: string;
  age: 'fresh' | 'stale' | 'stalled';
}

type TrackWidth = 'wide' | 'medium' | 'narrow' | 'tiny';

interface TrackTableAgentsProps {
  width: TrackWidth;
  clickable?: boolean;
  tones?: boolean;
  details?: boolean;
  fixed?: boolean;
}

export type { TrackAgent, TrackTableAgentsProps, TrackWidth };
