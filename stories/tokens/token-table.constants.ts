/* @layer stories @kind constants */
import type { DemonstratorAxis } from '../_template/Demonstrator.type';
import type { TableColumn } from './token-table.type';

const TOKEN_TABLE_COLUMNS: readonly DemonstratorAxis<TableColumn>[] = [
  { key: 'value', label: 'Value' },
  { key: 'step', label: 'Scale step' },
  { key: 'sample', label: 'Sample' },
];

export { TOKEN_TABLE_COLUMNS };
