/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { preventTextSelection } from '../../../primitives/dom/prevent-text-selection';
import { Small, Span } from '../../../primitives/text-elements';
import { CommandPaletteRowEnd } from './CommandPaletteRowEnd';
import type { CommandPaletteRowProps } from './CommandPaletteRow.type';
import './CommandPaletteRow.css';

const rowClass = (active: boolean, disabled: boolean, className: string): string =>
  ['command-palette-row', active && 'command-palette-row--active', disabled && 'command-palette-row--disabled', className]
    .filter(Boolean)
    .join(' ');

const CommandPaletteRow = (props: CommandPaletteRowProps) => {
  const { item, index, id, active = false, onSelect, onHover, className = '' } = props;
  const { label, icon, description, disabled = false } = item;

  return (
    <Box
      id={id}
      role="option"
      className={rowClass(active, disabled, className)}
      data-index={index}
      aria-selected={active}
      aria-disabled={disabled || undefined}
      onMouseDown={preventTextSelection}
      onMouseMove={active || disabled ? undefined : onHover}
      onClick={disabled ? undefined : () => onSelect?.(item)}
    >
      {icon != null && <Span tone="muted" className="command-palette-row__icon" aria-hidden>{icon}</Span>}
      <Box as="span" className="command-palette-row__text">
        <Span className="command-palette-row__label">{label}</Span>
        {description != null && <Small tone="muted" className="command-palette-row__description">{description}</Small>}
      </Box>
      <CommandPaletteRowEnd item={item} />
    </Box>
  );
};

export { CommandPaletteRow };
