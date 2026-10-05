/* @layer tooling-scripts @kind data */
const STATUS_TONES = ['success', 'warning', 'danger', 'info'];

const STATUS_SEEDS = STATUS_TONES.map((tone) => `--p-${tone}`);

const NEED = { text: 4.5, graphic: 3 };

const PAGE_GROUNDS = ['--c-surface', '--c-sunken', '--c-bg', '--c-layer'];

const TONE_GROUNDS = ['dim', 'soft'];

const TEXT_STEPS = ['', '-bright'];

export { NEED, PAGE_GROUNDS, STATUS_SEEDS, STATUS_TONES, TEXT_STEPS, TONE_GROUNDS };
