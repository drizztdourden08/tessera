/* @layer stories @kind component */
import type { ReactNode } from 'react';
import { Code, Text } from '../../../src/primitives';
import { Demonstrator } from '../../_template/Demonstrator';

interface PatternDocRow {
  key: string;
  cells: readonly ReactNode[];
}

interface PatternDocTableProps {
  corner: string;
  columns: readonly string[];
  rows: readonly PatternDocRow[];
  codeColumns?: number;
}

const cellNode = (content: ReactNode, asCode: boolean): ReactNode => {
  if (typeof content !== 'string') return content;
  return asCode ? <Code>{content}</Code> : <Text className="pattern-story__doc">{content}</Text>;
};

const PatternDocTable = (props: PatternDocTableProps) => {
  const { corner, columns, rows, codeColumns = 1 } = props;
  const byKey = new Map(rows.map((row) => [row.key, row.cells]));
  return (
    <Demonstrator
      corner={corner}
      align="start"
      rows={rows.map((row) => ({ key: row.key, label: row.key }))}
      columns={columns.map((column, at) => ({ key: column, label: column, fill: at >= codeColumns }))}
      cell={(row, column) => {
        const at = columns.indexOf(column);
        return cellNode(byKey.get(row)?.[at], at < codeColumns);
      }}
    />
  );
};

export { PatternDocTable };
export type { PatternDocRow };
