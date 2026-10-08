/* @layer stories @kind component */
import { Box, Grid } from '../../../src/primitives';
import type { DenseGridProps } from './DashboardGrid.type';
import './DashboardGrid.css';

const DenseGrid = ({ label, children }: DenseGridProps) => (
  <Box className="dense-grid">
    <Grid gap="lg" className="dense-grid__cells" aria-label={label}>
      {children}
    </Grid>
  </Box>
);

export { DenseGrid };
