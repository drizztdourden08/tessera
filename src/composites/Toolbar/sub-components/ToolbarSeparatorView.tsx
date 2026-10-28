/* @layer renderer-components @kind component */
import { useContext } from 'react';
import { Box } from '../../../primitives/Box';
import { Divider } from '../../../primitives/Divider';
import { Small } from '../../../primitives/text-elements';
import { ToolbarContext } from '../behavior/toolbar-context';
import { SEPARATOR_CLASS } from '../Toolbar.constants';
import type { ToolbarSeparatorViewProps } from './ToolbarItemView.type';
import './ToolbarSeparatorView.css';

const ToolbarSeparatorView = ({ item }: ToolbarSeparatorViewProps) => {
  const { orientation, layout, labels } = useContext(ToolbarContext);
  const line = <Divider orientation={orientation === 'horizontal' ? 'vertical' : 'horizontal'} className={SEPARATOR_CLASS} />;
  if (item.label === undefined) return line;
  if (layout === 'list') {
    return (
      <Box className="toolbar__heading" role="presentation">
        <Small tone="dim">{item.label}</Small>
        {line}
      </Box>
    );
  }
  if (orientation === 'horizontal' && labels) {
    return (
      <Box as="span" className="toolbar__heading toolbar__heading--bar" role="presentation">
        {line}
        <Small tone="dim">{item.label}</Small>
      </Box>
    );
  }
  return line;
};

export { ToolbarSeparatorView };
