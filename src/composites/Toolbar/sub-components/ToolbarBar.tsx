/* @layer renderer-components @kind component */
import { useMemo, useRef } from 'react';
import { Box } from '../../../primitives/Box';
import { contentKey } from '../behavior/content-key';
import { railBadges } from '../behavior/rail-badges';
import { splitItems } from '../behavior/split-items';
import { stopIds } from '../behavior/stop-ids';
import { ToolbarContext } from '../behavior/toolbar-context';
import { toolbarKeys } from '../behavior/toolbar-keys';
import { useToolbarFit } from '../behavior/useToolbarFit';
import { useToolbarStop } from '../behavior/useToolbarStop';
import { visibleItems } from '../behavior/visible-items';
import { WRAPPED_COLUMNS } from '../Toolbar.constants';
import type { ToolbarProps } from '../Toolbar.type';
import { ToolbarHandle } from './ToolbarHandle';
import { ToolbarItemView } from './ToolbarItemView';
import { ToolbarMeasure } from './ToolbarMeasure';
import { ToolbarMore } from './ToolbarMore';

const ToolbarBar = (props: ToolbarProps) => {
  const { label, orientation = 'horizontal', size = 'sm', handle = false, handleProps, labels = true, menuSide = 'right', columns = 1, onContextMenu, className } = props;
  const items = visibleItems(props.items, props.hiddenItems);
  const vertical = orientation === 'vertical';
  const barRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const { fit, wrapped } = useToolbarFit({ barRef, measureRef, restCount: items.length, contentKey: contentKey({ ...props, items }), vertical, columns });
  const { shown, folded } = splitItems(items, fit);
  const { stop, onFocus } = useToolbarStop(stopIds(shown, handle, folded.length > 0));
  const context = useMemo(
    () => ({ orientation, menuSide, layout: 'bar' as const, size, labels, stop, measure: false, keyBadges: railBadges(props.keyBadges, vertical), inlineOptions: false, contextMenu: onContextMenu }),
    [orientation, menuSide, size, labels, stop, props.keyBadges, vertical, onContextMenu],
  );

  return (
    <ToolbarContext value={context}>
      <Box
        ref={barRef}
        role="toolbar"
        aria-label={label}
        aria-orientation={orientation}
        className={['toolbar', className].filter(Boolean).join(' ')}
        data-orientation={orientation}
        data-columns={wrapped ? WRAPPED_COLUMNS : undefined}
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
