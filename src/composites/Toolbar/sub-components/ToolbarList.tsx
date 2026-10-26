/* @layer renderer-components @kind component */
import { useMemo } from 'react';
import { Box } from '../../../primitives/Box';
import { stopIds } from '../behavior/stop-ids';
import { ToolbarContext } from '../behavior/toolbar-context';
import { toolbarKeys } from '../behavior/toolbar-keys';
import { useToolbarStop } from '../behavior/useToolbarStop';
import type { ToolbarProps } from '../Toolbar.type';
import { ToolbarItemView } from './ToolbarItemView';

const ToolbarList = (props: ToolbarProps) => {
  const { items, label, size = 'sm', menuSide = 'right', className } = props;
  const { stop, onFocus } = useToolbarStop(stopIds(items, false, false));
  const context = useMemo(() => ({ orientation: 'vertical' as const, menuSide, layout: 'list' as const, size, labels: true, stop, measure: false }), [menuSide, size, stop]);

  return (
    <ToolbarContext value={context}>
      <Box
        role="toolbar"
        aria-label={label}
        aria-orientation="vertical"
        className={['toolbar', className].filter(Boolean).join(' ')}
        data-layout="list"
        onKeyDown={toolbarKeys('vertical')}
        onFocus={onFocus}
      >
        {items.map((item) => <ToolbarItemView key={item.id} item={item} />)}
      </Box>
    </ToolbarContext>
  );
};

export { ToolbarList };
