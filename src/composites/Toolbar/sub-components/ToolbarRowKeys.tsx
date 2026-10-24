/* @layer renderer-components @kind component */
import { Shortcut, shortcutRows } from '../../../primitives/Shortcut';
import { Small, Span } from '../../../primitives/text-elements';
import type { ToolbarRowKeysProps } from './ToolbarRow.type';

const ToolbarRowKeys = ({ shortcut }: ToolbarRowKeysProps) => {
  const rows = (shortcut === undefined ? [] : shortcutRows(shortcut)).filter((row) => row.keys.length > 0);
  if (rows.length === 0) return null;
  return (
    <Span className="toolbar__row-keys" aria-hidden="true">
      {rows.map((row, index) => (
        <Span key={row.label ?? index} className="toolbar__row-key">
          {row.label !== undefined && <Small tone="dim">{row.label}</Small>}
          <Shortcut keys={row.keys} size="xs" />
        </Span>
      ))}
    </Span>
  );
};

export { ToolbarRowKeys };
