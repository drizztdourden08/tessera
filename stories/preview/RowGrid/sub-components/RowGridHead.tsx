/* @layer stories @kind component */
import { Box, Span } from '../../../../src/primitives';
import type { RowGridHeadProps } from '../RowGrid.type';

const RowGridHead = ({ labels, handle, numbered, end }: RowGridHeadProps) => (
  <Box className="row-grid__head" aria-hidden>
    {handle && <Span />}
    {numbered && <Span className="row-grid__head-number">#</Span>}
    {labels.map((label) => <Span key={label} className="row-grid__head-label">{label}</Span>)}
    {end && <Span />}
  </Box>
);

export { RowGridHead };
