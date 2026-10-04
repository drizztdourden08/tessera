/* @layer stories @kind component */
import { Box } from '../../../src/primitives';
import { BRAND_APPS } from '../../../src/brand';
import { axis } from '../../_template/axis';
import { Demonstrator } from '../../_template/Demonstrator';
import { RIM_COLUMNS } from './RimGrid.constants';
import type { RimGridProps } from './RimGrid.type';
import './RimGrid.css';

const RimGrid = (props: RimGridProps) => {
  const { draw } = props;
  return (
    <Demonstrator
      rows={axis(BRAND_APPS)}
      columns={RIM_COLUMNS}
      cell={(app, key) => {
        const column = RIM_COLUMNS.find((c) => c.key === key);
        return column && (
          <Box className={`rim-grid__ground rim-grid__ground--${column.ground}`} data-rim={column.rim}>
            {draw(app, column.rim)}
          </Box>
        );
      }}
    />
  );
};

export { RimGrid };
