/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { DropdownMenu } from '../../DropdownMenu';
import { ToolbarToolMenu } from './ToolbarToolMenu';
import { ToolbarToolPanel } from './ToolbarToolPanel';
import type { ToolbarToolPopupsProps } from './ToolbarToolPopups.type';
import './ToolbarToolPopups.css';

const ToolbarToolPopups = ({ setup, tool, anchorRef }: ToolbarToolPopupsProps) => {
  const { props, options, inline } = setup;
  if (inline) {
    return (
      <Box className="toolbar__inline-options">
        <DropdownMenu groups={options} label={props.label} inline closeOnSelect={false} />
      </Box>
    );
  }
  if (!tool.open) return null;
  if (props.render !== undefined) return <ToolbarToolPanel anchorRef={anchorRef} tool={tool} label={props.label} render={props.render} />;
  return <ToolbarToolMenu groups={options} anchorRef={anchorRef} tool={tool} label={props.label} hoverOpen={props.hoverOpen === true} popup={props.openOnPress === true} />;
};

export { ToolbarToolPopups };
