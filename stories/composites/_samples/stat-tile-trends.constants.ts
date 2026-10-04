/* @layer stories @kind data */
const STAT_TILE_TRENDS = [
  { key: 'up-good', label: 'Rise, good', trend: 'up', upIs: 'good', delta: '+12' },
  { key: 'up-bad', label: 'Rise, bad', trend: 'up', upIs: 'bad', delta: '+3.1' },
  { key: 'down-good', label: 'Fall, good', trend: 'down', upIs: 'bad', delta: '-2.4' },
  { key: 'down-bad', label: 'Fall, bad', trend: 'down', upIs: 'good', delta: '-38' },
  { key: 'flat', label: 'Steady', trend: 'flat', upIs: 'good', delta: '0' },
  { key: 'neutral', label: 'Rise, neutral', trend: 'up', upIs: 'neutral', delta: '+6.0' },
] as const;

export { STAT_TILE_TRENDS };
