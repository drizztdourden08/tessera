/* @layer renderer-components @kind component */
import { useMemo, useRef } from 'react';
import { Box } from '../../../primitives/Box';
import { useAxisFit } from '../../ActionBar/behavior/useAxisFit';
import { contentKey } from '../behavior/content-key';
import { splitItems } from '../behavior/split-items';
import { stopIds } from '../behavior/stop-ids';
import { ToolbarContext } from '../behavior/toolbar-context';
import { toolbarKeys } from '../behavior/toolbar-keys';
import { useToolbarStop } from '../behavior/useToolbarStop';
import type { ToolbarProps } from '../Toolbar.type';
import { ToolbarHandle } from './ToolbarHandle';
import { ToolbarItemView } from './ToolbarItemView';
import { ToolbarMeasure } from './ToolbarMeasure';
import { ToolbarMore } from './ToolbarMore';

const ToolbarBar = (props: ToolbarProps) => {
  const { items, label, orientation = 'horizontal', size = 'sm', handle = false, handleProps, menuSide = 'right', className } = props;
  const barRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const fit = useAxisFit({
    barRef, measureRef, restCount: items.length, contentKey: contentKey(props), axis: orientation === 'horizontal' ? 'width' : 'height',
  });
  const { shown, folded } = splitItems(items, fit);
  const { stop, onFocus } = useToolbarStop(stopIds(shown, handle, folded.length > 0));
  const context = useMemo(() => ({ orientation, menuSide, layout: 'bar' as const, size, stop, measure: false }), [orientation, menuSide, size, stop]);

  return (
    <ToolbarContext value={context}>
      <Box
        ref={barRef}
        role="toolbar"
        aria-label={label}
        aria-orientation={orientation}
        className={['toolbar', className].filter(Boolean).join(' ')}
        data-orientation={orientation}
        onKeyDown={toolbarKeys(orientation)}
        onFocus={onFocus}
      >
        {handle && <ToolbarHandle handleProps={handleProps} />}
        {shown.map((item) => <ToolbarItemView key={item.id} item={item} />)}
        {folded.length > 0 && <ToolbarMore folded={folded} />}
        <ToolbarMeasure measureRef={measureRef} items={items} handle={handle} handleProps={handleProps} />
      </Box>
    </ToolbarContext>
  );
};

export { ToolbarBar };
