/* @layer renderer-components @kind component */
import { Button } from '../../../primitives/Button';
import { ToolbarRowKeys } from './ToolbarRowKeys';
import { ToolbarRowText } from './ToolbarRowText';
import type { ToolbarRowProps } from './ToolbarRow.type';

const ToolbarRow = (props: ToolbarRowProps) => {
  const { glyph, label, description, shortcut, size, attributes } = props;
  return (
    <Button variant="ghost" size={size} fullWidth icon={glyph} aria-label={label} {...attributes} className="toolbar__tool toolbar__row">
      <ToolbarRowText label={label} description={description} />
      <ToolbarRowKeys shortcut={shortcut} />
    </Button>
  );
};

export { ToolbarRow };
