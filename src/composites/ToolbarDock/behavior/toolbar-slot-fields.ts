/* @layer renderer-components @kind logic */
import type { ToolbarLayout, ToolbarSlot } from '../ToolbarDock.type';

const toolbarSlotFields = (layout: ToolbarLayout, id: string): Pick<ToolbarSlot, 'columns' | 'hiddenItems'> => {
  const hiddenItems = layout.items?.[id];
  const columns = layout.columns?.[id];
  return { ...(hiddenItems === undefined ? {} : { hiddenItems }), ...(columns === undefined ? {} : { columns }) };
};

export { toolbarSlotFields };
