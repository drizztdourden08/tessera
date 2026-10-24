/* @layer renderer-components @kind component */
import { Small, Span, Strong } from '../../../primitives/text-elements';
import type { ToolbarRowTextProps } from './ToolbarRow.type';

const ToolbarRowText = ({ label, description }: ToolbarRowTextProps) => (
  <Span className="toolbar__row-text">
    <Strong>{label}</Strong>
    {description && <Small tone="dim">{description}</Small>}
  </Span>
);

export { ToolbarRowText };
