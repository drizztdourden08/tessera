/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Small } from '../../../primitives/text-elements';
import { Toggle } from '../../../primitives/Toggle';
import { BREADCRUMB_JOIN } from '../CommandPalette.constants';
import type { CommandPaletteRowEndProps } from './CommandPaletteRowEnd.type';

const CommandPaletteRowEnd = (props: CommandPaletteRowEndProps) => {
  const { item } = props;
  const { label, breadcrumb = [], checked, toggle } = item;

  return (
    <>
      {breadcrumb.length > 0 && <Small tone="muted" className="command-palette-row__breadcrumb">{breadcrumb.join(BREADCRUMB_JOIN)}</Small>}
      {checked !== undefined && (
        <Box as="span" className={`command-palette-row__check${checked ? ' command-palette-row__check--on' : ''}`} aria-hidden />
      )}
      {toggle && (
        <Box className="command-palette-row__toggle" onClick={(event) => event.stopPropagation()}>
          <Toggle checked={toggle.checked} onChange={toggle.onChange} disabled={item.disabled} aria-label={label} />
        </Box>
      )}
    </>
  );
};

export { CommandPaletteRowEnd };
