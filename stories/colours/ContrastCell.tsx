/* @layer stories @kind component */
import type { ReactNode } from 'react';
import { Box, Status, Text } from '../../src/primitives';
import { useContrast } from '../tokens/use-contrast';
import type { ContrastCellProps } from './ContrastCell.type';
import './ContrastCell.css';

const verdict = (ratio: number, threshold: number, label: string) => (
  <Status tone={ratio >= threshold ? 'success' : 'danger'}>
    {`${label} ${ratio >= threshold ? 'pass' : 'fail'}`}
  </Status>
);

const measuredNode = (props: ContrastCellProps, ratio: number | undefined): ReactNode => {
  const { column, thresholds } = props;
  if (ratio === undefined) return <Text>...</Text>;
  if (column === 'ratio') return <Text className="contrast-ratio">{`${ratio.toFixed(2)}:1`}</Text>;
  return column === 'text' ? verdict(ratio, thresholds.text, 'Text') : verdict(ratio, thresholds.large, 'Large');
};

const ContrastCell = (props: ContrastCellProps) => {
  const { pair, column, sample } = props;
  const { ref, measured } = useContrast();
  const colours = { color: `var(${pair.text})`, background: `var(${pair.fill})` };
  if (column === 'sample') {
    return (
      <Box ref={ref} className="contrast-sample" style={colours}>
        <Text>{sample}</Text>
        {' '}
        <Text className="contrast-sample__large">Aa</Text>
      </Box>
    );
  }
  return (
    <Box className="contrast-measure">
      <Box ref={ref} className="contrast-probe" style={colours} aria-hidden />
      {measuredNode(props, measured?.ratio)}
    </Box>
  );
};

export { ContrastCell };
