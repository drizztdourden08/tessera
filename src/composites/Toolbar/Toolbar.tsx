/* @layer renderer-components @kind component */
import { ToolbarBar } from './sub-components/ToolbarBar';
import { ToolbarList } from './sub-components/ToolbarList';
import type { ToolbarProps } from './Toolbar.type';
import './Toolbar.css';

const Toolbar = (props: ToolbarProps) => (props.layout === 'list' ? <ToolbarList {...props} /> : <ToolbarBar {...props} />);

export { Toolbar };
