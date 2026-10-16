/* @layer stories @kind data */
const SPRITES = [
  { id: 'link', name: 'Link, green tunic', meta: 'Built in' },
  { id: 'zelda', name: 'Princess Zelda', meta: 'Installed' },
  { id: 'ganon', name: 'Ganondorf', meta: 'Installed' },
  { id: 'cat', name: 'Cat in a hat', meta: 'Your sprite' },
  { id: 'knight', name: 'Hyrule knight', meta: 'Your sprite' },
] as const;

const TUNIC = ['#000000', '#f8f8f8', '#f0d0a8', '#b86820', '#282828', '#38a048', '#58d068', '#e84830'] as const;

const FRAMES = 24;

const SPRITE_FACTS = [
  [
    { label: 'Name', value: 'Link, green tunic' },
    { label: 'Author', value: 'Nintendo' },
  ],
  [
    { label: 'Frames', value: `${FRAMES}` },
    { label: 'Palettes', value: '4' },
    { label: 'File', value: 'link.zspr', mono: true },
  ],
] as const;

const IDLE_HINT = 'Save keeps the sprite in this app. Export makes a file to share or to load in another game.';

export { FRAMES, IDLE_HINT, SPRITE_FACTS, SPRITES, TUNIC };
