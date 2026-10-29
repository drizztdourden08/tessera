/* @layer stories @kind data */
const BRUSH_PATTERNS: Readonly<Record<string, readonly string[]>> = {
  Square: ['######', '######', '######', '######', '######', '######'],
  Round: ['.####.', '######', '######', '######', '######', '.####.'],
  Diamond: ['..##..', '.####.', '######', '######', '.####.', '..##..'],
  Cross: ['..##..', '..##..', '######', '######', '..##..', '..##..'],
  Dots: ['#.#.#.', '......', '#.#.#.', '......', '#.#.#.', '......'],
  Dither: ['#.#.#.', '.#.#.#', '#.#.#.', '.#.#.#', '#.#.#.', '.#.#.#'],
  Spray: ['.#..#.', '#...#.', '..#...', '.#..#.', '#..#..', '..#..#'],
};

const BRUSH_BASIC: readonly string[] = ['Square', 'Round', 'Diamond', 'Cross'];

const BRUSH_TEXTURE: readonly string[] = ['Dots', 'Dither', 'Spray'];

const SELECTION_PATTERN: readonly string[] = ['#....#', '.#..#.', '..##..', '..##..', '.#..#.', '#....#'];

export { BRUSH_BASIC, BRUSH_PATTERNS, BRUSH_TEXTURE, SELECTION_PATTERN };
