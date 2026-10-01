/* @layer stories @kind component */
import { Text } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { TokenValue } from '../tokens/TokenValue';
import { TYPE_TABLE_COLUMNS } from './TypeTable.constants';
import type { TypeTableProps } from './TypeTable.type';
import './typography.css';

const TypeTable = (props: TypeTableProps) => {
  const { entries, property, specimen, showValue = true } = props;
  return (
    <Demonstrator
      corner="Token"
      rows={axis(entries.map((entry) => entry.token))}
      columns={showValue ? TYPE_TABLE_COLUMNS : TYPE_TABLE_COLUMNS.filter((column) => column.key !== 'value')}
      align="start"
      cell={(token, column) => (column === 'value'
        ? <TokenValue token={token} />
        : <Text className={`type-table__specimen type-table__specimen--${property}`} style={{ [property]: `var(${token})` }}>{specimen}</Text>)}
    />
  );
};

export { TypeTable };
