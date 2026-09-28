/* @layer renderer-components @kind logic */
import { clampWidth } from './clamp-width';
import { FIT_PADDING } from './column-width-math.constants';
import type { ColumnWidth } from './column-width-math.type';

const fitColumnWidth = (contentWidths: readonly number[]): number =>
  clampWidth(Math.max(0, ...contentWidths) + FIT_PADDING);

const fitAllWidths = (
  paths: readonly string[],
  contentWidthsOf: (path: string) => readonly number[],
): ColumnWidth[] =>
  paths.map((path) => ({ path, width: fitColumnWidth(contentWidthsOf(path)) }));

export { fitAllWidths };
