/* @layer stories @kind data */
import { landscapeUri } from './landscape-uri';
import type { StoreSample } from './store-sample.type';

const STORE_SAMPLES: readonly StoreSample[] = [
  {
    id: 'hyrule-symphony', name: 'Hyrule Symphony', kind: 'Music pack', author: 'Ocarina', average: 4.6, count: 212,
    summary: 'Every track of the game, played again by a small band.', picture: landscapeUri('#5d8fc4', '#2f6b3d', '#f4d35e', 'Hyrule Field'),
  },
  {
    id: 'dark-world-remix', name: 'Dark World Remix', kind: 'Music pack', author: 'Moblin', average: 3.8, count: 57,
    summary: 'The Dark World themes, slower and heavier.', picture: landscapeUri('#4b3c6b', '#24303f', '#f29e4c', 'Death Mountain'),
  },
  {
    id: 'link-in-red', name: 'Link in Red', kind: 'Character', author: 'Tunic', average: 4.2, count: 98,
    summary: 'A red tunic and a new sword swing.', picture: landscapeUri('#2f6f8f', '#1d3b52', '#e8eef2', 'Lake Hylia'),
  },
  {
    id: 'french-hyrule', name: 'French Hyrule', kind: 'Language', author: 'Lumiere', average: null, count: 0,
    summary: 'All the game text in French.', picture: landscapeUri('#c98b5b', '#6b4a2f', '#fff1c1', 'Desert of Mystery'),
  },
];

export { STORE_SAMPLES };
