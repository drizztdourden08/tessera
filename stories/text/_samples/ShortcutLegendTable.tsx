/* @layer stories @kind component */
import { Box, SHORTCUT_LEGENDS, Shortcut } from '../../../src/primitives';
import { axis } from '../../_template/axis';
import { Demonstrator } from '../../_template/Demonstrator';
import type { CapWidth } from '../../../src/primitives';
import { legendsOf, MULTI_LEGEND_KEYS } from './shortcut-samples';
import './shortcut-table.css';

const ShortcutLegendTable = (props: { width: CapWidth }) => {
  const { width } = props;
  return (
    <Box className="shortcut-table-wrap">
      <Demonstrator
        corner="Key"
        rows={axis(MULTI_LEGEND_KEYS)}
        columns={axis(SHORTCUT_LEGENDS)}
        cell={(key, legend) => (legendsOf(key).includes(legend) ? <Shortcut keys={key} legend={legend} width={width} /> : null)}
      />
    </Box>
  );
};

export { ShortcutLegendTable };
