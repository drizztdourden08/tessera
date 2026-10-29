/* @layer stories @kind data */
const SUBLABEL_CASES = [
  { name: 'A short sublabel', title: 'Session', sublabel: 'Race 4' },
  { name: 'A very long sublabel, the title stays', title: 'Session', sublabel: 'Monza grand prix, qualifying, third practice session, dry track' },
  { name: 'A long title and sublabel, both clipped', title: 'Lap time analysis', sublabel: 'Monza grand prix, qualifying, third practice session' },
] as const;

export { SUBLABEL_CASES };
