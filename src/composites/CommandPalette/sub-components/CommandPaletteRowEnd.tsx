/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Small } from '../../../primitives/text-elements';
import { Toggle } from '../../../primitives/Toggle';
import { ChoiceMark } from '../../DropdownMenu/sub-components/ChoiceMark';
import { BREADCRUMB_JOIN } from '../CommandPalette.constants';
import type { CommandPaletteRowEndProps } from './CommandPaletteRowEnd.type';

const CommandPaletteRowEnd = (props: CommandPaletteRowEndProps) => {
  const { item } = props;
  const { label, breadcrumb = [], checked, toggle, action } = item;

  return (
    <>
      {breadcrumb.length > 0 && <Small tone="muted" className="command-palette-row__breadcrumb">{breadcrumb.join(BREADCRUMB_JOIN)}</Small>}
      {checked !== undefined && <ChoiceMark kind="check" checked={checked} className="command-palette-row__check" />}
      {toggle && (
        <Box className="command-palette-row__toggle" onClick={(event) => event.stopPropagation()}>
          <Toggle checked={toggle.checked} onChange={toggle.onChange} disabled={item.disabled} aria-label={label} />
        </Box>
      )}
      {action != null && (
        <Box className="command-palette-row__action" onClick={(event) => event.stopPropagation()}>{action}</Box>
      )}
    </>
  );
};

export { CommandPaletteRowEnd };
