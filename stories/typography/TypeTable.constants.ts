/* @layer stories @kind constants */
import type { DemonstratorAxis } from '../_template/Demonstrator.type';

const TYPE_TABLE_COLUMNS: readonly DemonstratorAxis<'value' | 'specimen'>[] = [
  { key: 'value', label: 'Value' },
  { key: 'specimen', label: 'Specimen', fill: true },
];

export { TYPE_TABLE_COLUMNS };
