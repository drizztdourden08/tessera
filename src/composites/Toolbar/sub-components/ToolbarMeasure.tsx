/* @layer renderer-components @kind component */
import { useContext } from 'react';
import { Box } from '../../../primitives/Box';
import { ToolbarContext } from '../behavior/toolbar-context';
import { ToolbarHandle } from './ToolbarHandle';
import { ToolbarItemView } from './ToolbarItemView';
import { ToolbarMore } from './ToolbarMore';
import type { ToolbarMeasureProps } from './ToolbarMore.type';

const ToolbarMeasure = (props: ToolbarMeasureProps) => {
  const { measureRef, items, handle, handleProps } = props;
  const context = useContext(ToolbarContext);
  return (
    <ToolbarContext value={{ ...context, measure: true }}>
      <Box className="toolbar__measure" aria-hidden inert>
        <Box ref={measureRef} className="toolbar__measure-row" data-orientation={context.orientation}>
          {items.map((item) => <ToolbarItemView key={item.id} item={item} />)}
          <ToolbarMore folded={items} />
          {handle && <ToolbarHandle handleProps={handleProps} />}
        </Box>
      </Box>
    </ToolbarContext>
  );
};

export { ToolbarMeasure };
