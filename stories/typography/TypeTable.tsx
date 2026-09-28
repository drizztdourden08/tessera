/* @layer stories @kind component */
import type { CSSProperties } from 'react';
import { Box, Text } from '../../src/primitives';
import { useComputedToken } from '../tokens/use-computed-token';
import type { TypeEntry } from './type-lists';
import './typography.css';

type TypeProperty = 'fontFamily' | 'fontWeight' | 'fontSize' | 'lineHeight' | 'letterSpacing';

interface TypeTableProps {
  entries: readonly TypeEntry[];
  property: TypeProperty;
  specimen: string;
}

const Row = ({ entry, property, specimen }: { entry: TypeEntry; property: TypeProperty; specimen: string }) => {
  const { ref, declared } = useComputedToken<HTMLElement>(entry.token);
  const style = { [property]: `var(${entry.token})` } as CSSProperties;
  return (
    <Box as="tr" ref={ref}>
      <Box as="td"><Text className="type-table__name">{entry.token}</Text></Box>
      <Box as="td"><Text className="type-table__value">{declared}</Text></Box>
      <Box as="td"><Text className={`type-table__specimen type-table__specimen--${property}`} style={style}>{specimen}</Text></Box>
      <Box as="td"><Text className="type-table__use">{entry.use}</Text></Box>
    </Box>
  );
};

const TypeTable = (props: TypeTableProps) => {
  const { entries, property, specimen } = props;
  return (
    <Box className="type-table-wrap">
      <Box as="table" className="type-table">
        <Box as="thead">
          <Box as="tr">
            <Box as="th">Token</Box>
            <Box as="th">Value</Box>
            <Box as="th">Specimen</Box>
            <Box as="th">For</Box>
          </Box>
        </Box>
        <Box as="tbody">{entries.map((entry) => <Row key={entry.token} entry={entry} property={property} specimen={specimen} />)}</Box>
      </Box>
    </Box>
  );
};

export { TypeTable };
