/* @layer stories @kind data */
const SPEEDS = ['0.5x', '0.75x', '1x', '1.25x', '1.5x', '2x', '3x', '4x', '6x', '8x', '10x'] as const;

const PRICES = Array.from({ length: 21 }, (_, index) => String(index * 5));

const DUNGEONS = ['Eastern', 'Desert', 'Hera', 'Darkness', 'Swamp', 'Skull', 'Thieves', 'Ice', 'Misery', 'Turtle'] as const;

export { DUNGEONS, PRICES, SPEEDS };
