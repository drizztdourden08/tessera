/* @layer renderer-components @kind constants */
const CELL_ATTRIBUTE = 'data-vg-index';

const CELL_CLASS = 'virtual-grid__cell focus-ring-inset';

const BARE_CELL_CLASS = `${CELL_CLASS} virtual-grid__cell--bare`;

const ROW_ATTRIBUTE = 'data-vg-row';

const KIND_ATTRIBUTE = 'data-vg-kind';

const TILE_SELECTOR = `[${KIND_ATTRIBUTE}="tile"]`;

const HEADER_SELECTOR = `[${KIND_ATTRIBUTE}="header"]`;

const ROWS_PROPERTY = '--vg-rows';

const COLUMNS_PROPERTY = '--vg-cols';

const HEADERS_PROPERTY = '--vg-headers';

const ROW_PROPERTY = '--vg-row';

const HEADS_PROPERTY = '--vg-heads';

const TILE_WIDTH_PROPERTY = '--vg-tile-w';

const TILE_HEIGHT_PROPERTY = '--vg-tile-h';

const DEPTH_PROPERTY = '--vg-depth';

const TOP_PROPERTY = '--vg-top';

const TOTAL_PROPERTY = '--vg-total';

const SWATCH_GAP = 'var(--space-2xs)';

const DEFAULT_COLUMNS = 5;

const DEFAULT_OVERSCAN = 2;

const HEADER_FALLBACK = 32;

export {
  BARE_CELL_CLASS, CELL_ATTRIBUTE, CELL_CLASS, COLUMNS_PROPERTY, DEFAULT_COLUMNS, DEFAULT_OVERSCAN, DEPTH_PROPERTY, HEADER_FALLBACK, HEADER_SELECTOR, HEADERS_PROPERTY, HEADS_PROPERTY, KIND_ATTRIBUTE,
  ROW_ATTRIBUTE, ROW_PROPERTY, ROWS_PROPERTY, SWATCH_GAP, TILE_HEIGHT_PROPERTY, TILE_SELECTOR, TILE_WIDTH_PROPERTY, TOP_PROPERTY, TOTAL_PROPERTY,
};
