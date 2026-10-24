/* @layer renderer-components @kind component */
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { foldedGroups } from '../behavior/folded-groups';
import { MORE_STOP } from '../Toolbar.constants';
import { ToolbarTool } from './ToolbarTool';
import type { ToolbarMoreProps } from './ToolbarMore.type';

const ToolbarMore = ({ folded }: ToolbarMoreProps) => {
  const { toolbar } = useTesseraStrings();
  return <ToolbarTool stopId={MORE_STOP} icon="ellipsis" label={toolbar.more} tip={toolbar.more} options={foldedGroups(folded)} openOnPress />;
};

export { ToolbarMore };
