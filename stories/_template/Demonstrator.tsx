/* @layer stories @kind component */
import type { ReactNode } from 'react';
import { Box, Grid, Text } from '../../src/primitives';
import { DEMONSTRATOR_LONE_AXIS } from './Demonstrator.constants';
import type { DemonstratorAxis, DemonstratorBody, DemonstratorProps } from './Demonstrator.type';
import './Demonstrator.css';

const trackFor = (fill: boolean): string => (fill ? 'minmax(0, 1fr)' : 'max-content');

const ruled = (base: string, index: number): string => (index > 0 ? `${base} demonstrator__slot--ruled` : base);

const headRow = (columns: readonly DemonstratorAxis<string>[], corner: string | null): ReactNode[] => [
  ...(corner === null ? [] : [<Text key="corner" className="demonstrator__corner">{corner}</Text>]),
  ...columns.map((column) => (
    <Text key={`column-${column.key}`} className="demonstrator__label demonstrator__label--column">{column.label}</Text>
  )),
];

const bodyRow = (row: DemonstratorAxis<string>, index: number, body: DemonstratorBody): ReactNode[] => [
  ...(body.labelled ? [<Text key={`row-${row.key}`} className={ruled('demonstrator__slot demonstrator__label demonstrator__label--row', index)}>{row.label}</Text>] : []),
  ...body.columns.map((column) => (
    <Box key={`cell-${row.key}-${column.key}`} className={ruled('demonstrator__slot demonstrator__cell', index)}>{body.draw(row.key, column.key)}</Box>
  )),
];

const gridClass = (className: string | undefined): string => (className ? `demonstrator ${className}` : 'demonstrator');

const tracksOf = <R extends string, C extends string>(props: DemonstratorProps<R, C>): string => {
  const { rows, columns, fill = columns === undefined } = props;
  const tracks = (columns ?? DEMONSTRATOR_LONE_AXIS).map((column) => trackFor(fill || column.fill === true));
  return [...(rows ? ['max-content'] : []), ...tracks].join(' ');
};

const Demonstrator = <R extends string = never, C extends string = never>(props: DemonstratorProps<R, C>) => {
  const { rows, columns, cell, corner = '' } = props;
  const labelled = rows !== undefined;
  const body: DemonstratorBody = { labelled, columns: columns ?? DEMONSTRATOR_LONE_AXIS, draw: cell as DemonstratorBody['draw'] };
  return (
    <Grid
      className={gridClass(props.className)}
      data-align={props.align ?? (columns ? 'center' : 'start')}
      data-valign={props.valign ?? 'center'}
      style={{ gridTemplateColumns: tracksOf(props) }}
    >
      {columns && headRow(columns, labelled ? corner : null)}
      {(rows ?? DEMONSTRATOR_LONE_AXIS).map((row, index) => bodyRow(row, index, body))}
    </Grid>
  );
};

export { Demonstrator };
