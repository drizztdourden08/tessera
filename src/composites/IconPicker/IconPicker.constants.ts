/* @layer renderer-components @kind data */
import { ICONS } from '../../primitives/Icon';
import type { IconName } from '../../primitives/Icon';

const ALL_ICON_NAMES = Object.keys(ICONS) as IconName[];

const MAX_SVG_BYTES = 64 * 1024;

const MAX_PNG_BYTES = 256 * 1024;

const UPLOAD_ACCEPT = ['.svg', '.png', 'image/svg+xml', 'image/png'];

const GRID_COLUMNS = 8;

const SVG_MIME = 'image/svg+xml';

const PNG_MIME = 'image/png';

const SVG_DATA_PREFIX = `data:${SVG_MIME};charset=utf-8,`;

export { ALL_ICON_NAMES, GRID_COLUMNS, MAX_PNG_BYTES, MAX_SVG_BYTES, PNG_MIME, SVG_DATA_PREFIX, SVG_MIME, UPLOAD_ACCEPT };
