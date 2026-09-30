/* @layer stories @kind component */
import { Box } from '../../src/primitives';
import { Demonstrator } from '../_template/Demonstrator';
import { axis } from '../_template/axis';
import { SCALE_STEPS } from './dimension-lists';
import { TOKEN_TABLE_COLUMNS } from './token-table.constants';
import { TokenSample } from './TokenSample';
import { TokenValue } from './TokenValue';
import type { TokenTableProps } from './token-table.type';
import './token-table.css';

const stepOf = (value: string): string => {
  const px = /^(\d+)px$/.exec(value.trim())?.[1];
  return px && (SCALE_STEPS as readonly number[]).includes(Number(px)) ? `--size-${px}` : '-';
};

const TokenTable = (props: TokenTableProps) => {
  const { entries, specimen, showStep = true } = props;
  return (
    <Box className="token-table-wrap">
      <Demonstrator
        corner="Token"
        rows={axis(entries.map((entry) => entry.token))}
        columns={showStep ? TOKEN_TABLE_COLUMNS : TOKEN_TABLE_COLUMNS.filter((column) => column.key !== 'step')}
        align="start"
        cell={(token, column) => {
          if (column === 'sample') return <TokenSample token={token} specimen={specimen} />;
          return <TokenValue token={token} format={column === 'step' ? stepOf : undefined} />;
        }}
      />
    </Box>
  );
};

export { TokenTable };
