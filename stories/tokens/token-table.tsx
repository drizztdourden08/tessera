/* @layer stories @kind component */
import { Box, Text } from '../../src/primitives';
import { SCALE_STEPS } from './dimension-lists';
import { useComputedToken } from './use-computed-token';
import './token-table.css';

type TableSpecimen = 'size' | 'margin' | 'padding' | 'gap' | 'radius';

interface TokenEntry {
  token: string;
}

interface TokenTableProps {
  entries: readonly TokenEntry[];
  specimen: TableSpecimen;
  showStep?: boolean;
}

const Sample = ({ token, specimen }: { token: string; specimen: TableSpecimen }) => {
  const value = `var(${token})`;
  if (specimen === 'size') return <Box className="token-sample token-sample--size" style={{ inlineSize: value }} />;
  if (specimen === 'radius') return <Box className="token-sample token-sample--radius" style={{ borderRadius: value }} />;
  if (specimen === 'gap') {
    return (
      <Box className="token-sample token-sample--gap" style={{ gap: value }}>
        <Box className="token-sample__block" />
        <Box className="token-sample__block" />
      </Box>
    );
  }
  return (
    <Box className={`token-sample token-sample--${specimen}`} style={specimen === 'padding' ? { padding: value } : undefined}>
      <Box className="token-sample__block" style={specimen === 'margin' ? { margin: value } : undefined} />
    </Box>
  );
};

const stepOf = (value: string): string => {
  const px = /^(\d+)px$/.exec(value.trim())?.[1];
  return px && (SCALE_STEPS as readonly number[]).includes(Number(px)) ? `--size-${px}` : '-';
};

const Row = ({ entry, specimen, showStep }: { entry: TokenEntry; specimen: TableSpecimen; showStep: boolean }) => {
  const { ref, declared } = useComputedToken<HTMLElement>(entry.token);
  return (
    <Box as="tr" ref={ref}>
      <Box as="td"><Text className="token-table__name">{entry.token}</Text></Box>
      <Box as="td"><Text className="token-table__value">{declared}</Text></Box>
      {showStep && <Box as="td"><Text className="token-table__value">{stepOf(declared)}</Text></Box>}
      <Box as="td"><Sample token={entry.token} specimen={specimen} /></Box>
    </Box>
  );
};

const TokenTable = (props: TokenTableProps) => {
  const { entries, specimen, showStep = true } = props;
  return (
    <Box className="token-table-wrap">
      <Box as="table" className="token-table">
        <Box as="thead">
          <Box as="tr">
            <Box as="th">Token</Box>
            <Box as="th">Value</Box>
            {showStep && <Box as="th">Scale step</Box>}
            <Box as="th">Sample</Box>
          </Box>
        </Box>
        <Box as="tbody">{entries.map((entry) => <Row key={entry.token} entry={entry} specimen={specimen} showStep={showStep} />)}</Box>
      </Box>
    </Box>
  );
};

export { TokenTable };
export type { TokenEntry };
