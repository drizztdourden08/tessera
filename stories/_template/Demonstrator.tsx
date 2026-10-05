/* @layer stories @kind component */
import { useRef } from 'react';
import type { ReactNode } from 'react';
import { Box, Text } from '../../src/primitives';
import { DEMONSTRATOR_LONE_AXIS, DEMONSTRATOR_STACKED_TRACKS, DEMONSTRATOR_TRACKS } from './Demonstrator.constants';
import type { DemonstratorAxis, DemonstratorBody, DemonstratorLayout, DemonstratorProps } from './Demonstrator.type';
import { useDemonstratorLayout } from './use-demonstrator-layout';
import './Demonstrator.css';

const ruled = (base: string, index: number): string => (index > 0 ? `${base} demonstrator__slot--ruled` : base);

const cellClass = (filled: boolean, index: number, stacked: boolean): string => {
  const base = filled ? 'demonstrator__slot demonstrator__cell demonstrator__cell--fill' : 'demonstrator__slot demonstrator__cell';
  return stacked ? base : ruled(base, index);
};

const headRow = (columns: readonly DemonstratorAxis<string>[], corner: string | null): ReactNode[] => [
  ...(corner === null ? [] : [<Text key="corner" className="demonstrator__corner">{corner}</Text>]),
  ...columns.map((column) => (
    <Text key={`column-${column.key}`} className="demonstrator__label demonstrator__label--column">{column.label}</Text>
  )),
];

const asideLabel = (row: DemonstratorAxis<string>, column: DemonstratorAxis<string>, body: DemonstratorBody): ReactNode[] => (
  body.stacked && body.named ? [<Text key={`aside-${row.key}-${column.key}`} className="demonstrator__label demonstrator__label--aside">{column.label}</Text>] : []
);

const bodyRow = (row: DemonstratorAxis<string>, index: number, body: DemonstratorBody): ReactNode[] => [
  ...(body.labelled ? [<Text key={`row-${row.key}`} className={ruled('demonstrator__slot demonstrator__label demonstrator__label--row', index)}>{row.label}</Text>] : []),
  ...body.columns.flatMap((column) => [
    ...asideLabel(row, column, body),
    <Box key={`cell-${row.key}-${column.key}`} className={cellClass(body.fill || column.fill === true, index, body.stacked)}>{body.draw(row.key, column.key)}</Box>,
  ]),
];

const gridClass = (className: string | undefined): string => (className ? `demonstrator ${className}` : 'demonstrator');

const tracksOf = <R extends string, C extends string>(props: DemonstratorProps<R, C>, layout: DemonstratorLayout): string => {
  const { rows, columns, fill = columns === undefined } = props;
  if (layout === 'stacked') return columns ? DEMONSTRATOR_STACKED_TRACKS.named : DEMONSTRATOR_STACKED_TRACKS.lone;
  const sizes = DEMONSTRATOR_TRACKS[layout];
  const tracks = (columns ?? DEMONSTRATOR_LONE_AXIS).map((column) => (fill || column.fill === true ? sizes.fill : sizes.fit));
  return [...(rows ? [sizes.label] : []), ...tracks].join(' ');
};

const bodyOf = <R extends string, C extends string>(props: DemonstratorProps<R, C>, layout: DemonstratorLayout): DemonstratorBody => ({
  labelled: props.rows !== undefined,
  stacked: layout === 'stacked',
  named: props.columns !== undefined,
  fill: props.fill ?? props.columns === undefined,
  columns: props.columns ?? DEMONSTRATOR_LONE_AXIS,
  draw: props.cell as DemonstratorBody['draw'],
});

const Demonstrator = <R extends string = never, C extends string = never>(props: DemonstratorProps<R, C>) => {
  const { rows, columns, corner = '' } = props;
  const ref = useRef<HTMLElement>(null);
  const layout = useDemonstratorLayout(ref);
  const labelled = rows !== undefined;
  const body = bodyOf(props, layout);
  return (
    <Box
      ref={ref}
      className={gridClass(props.className)}
      data-align={props.align ?? (columns ? 'center' : 'start')}
      data-valign={props.valign ?? 'center'}
      data-layout={layout}
      style={{ gridTemplateColumns: tracksOf(props, layout) }}
    >
      {columns && !body.stacked && headRow(columns, labelled ? corner : null)}
      {(rows ?? DEMONSTRATOR_LONE_AXIS).map((row, index) => bodyRow(row, index, body))}
    </Box>
  );
};

export { Demonstrator };
