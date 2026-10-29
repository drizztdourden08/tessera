/* @layer renderer-components @kind component */
import { useId } from 'react';
import { Box } from '../../../primitives/Box';
import { Grid } from '../../../primitives/Grid';
import { Span } from '../../../primitives/text-elements';
import { ChoiceCellView } from './ChoiceCellView';
import type { ChoiceSectionViewProps } from './ChoiceSectionView.type';

const ChoiceSectionView = <T extends string>({ group, columns, state, renderCell }: ChoiceSectionViewProps<T>) => {
  const headingId = useId();
  const labelled = group.label !== undefined;
  const cells = group.entries.map((entry) => (
    <ChoiceCellView key={entry.cell.value} cell={entry.cell} state={state(entry)} renderCell={renderCell} />
  ));

  return (
    <Box className="choice-grid__section" role={labelled ? 'group' : 'presentation'} aria-labelledby={labelled ? headingId : undefined}>
      {labelled && <Span id={headingId} tone="muted" className="choice-grid__heading">{group.label}</Span>}
      {columns === undefined
        ? <Box className="choice-grid__cells" role="presentation">{cells}</Box>
        : <Grid columns={columns} gap="2xs" className="choice-grid__cells" role="presentation">{cells}</Grid>}
    </Box>
  );
};

export { ChoiceSectionView };
