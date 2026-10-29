/* @layer renderer-components @kind data */
const HORIZONTAL_STEPS: Readonly<Record<string, number>> = { ArrowRight: 1, ArrowLeft: -1 };

const CELL_SELECTOR = '[data-choice-index]';

const CELL_INDEX_ATTRIBUTE = 'data-choice-index';

export { CELL_INDEX_ATTRIBUTE, CELL_SELECTOR, HORIZONTAL_STEPS };
