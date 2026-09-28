/* @layer stories @kind component */
import { Box, SHORTCUT_LEGENDS, Shortcut, Text } from '../../../src/primitives';
import type { CapWidth } from '../../../src/primitives';
import { legendsOf, MULTI_LEGEND_KEYS } from './shortcut-samples';
import './shortcut-table.css';

const ShortcutLegendTable = (props: { width: CapWidth }) => {
  const { width } = props;
  return (
    <Box className="shortcut-table-wrap">
      <Box as="table" className="shortcut-table">
        <Box as="thead">
          <Box as="tr">
            <Box as="th">Key</Box>
            {SHORTCUT_LEGENDS.map((legend) => <Box as="th" key={legend}>{legend}</Box>)}
          </Box>
        </Box>
        <Box as="tbody">
          {MULTI_LEGEND_KEYS.map((key) => (
            <Box as="tr" key={key}>
              <Box as="td"><Text className="shortcut-table__key">{key}</Text></Box>
              {SHORTCUT_LEGENDS.map((legend) => (
                <Box as="td" key={legend}>
                  {legendsOf(key).includes(legend) ? <Shortcut keys={key} legend={legend} width={width} /> : null}
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export { ShortcutLegendTable };
