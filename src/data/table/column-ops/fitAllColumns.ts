/* @layer renderer-components @kind logic */
import type { TableColumn } from '../types';
import { withFit } from './withFit';

const fitAllColumns = (columns: readonly TableColumn[]): readonly TableColumn[] =>
  columns.map(withFit);

export { fitAllColumns };
