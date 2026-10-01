/* @layer stories @kind component */
import { SHORTCUT_LEGENDS, ScrollArea, Shortcut } from '../../../src/primitives';
import { axis } from '../../_template/axis';
import { Demonstrator } from '../../_template/Demonstrator';
import type { CapWidth } from '../../../src/primitives';
import { legendsOf, MULTI_LEGEND_KEYS } from './shortcut-samples';

const ShortcutLegendTable = (props: { width: CapWidth }) => {
  const { width } = props;
  return (
    <ScrollArea axis="x">
      <Demonstrator
        corner="Key"
        rows={axis(MULTI_LEGEND_KEYS)}
        columns={axis(SHORTCUT_LEGENDS)}
        cell={(key, legend) => (legendsOf(key).includes(legend) ? <Shortcut keys={key} legend={legend} width={width} /> : null)}
      />
    </ScrollArea>
  );
};

export { ShortcutLegendTable };
