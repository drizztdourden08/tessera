/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { Icon } from '../../primitives/Icon';
import { IconButton } from '../../primitives/IconButton';
import { Text } from '../../primitives/Text';
import { DEFAULT_CLEAR_LABEL } from './DropSlot.constants';
import { useDropSlot } from './behavior/useDropSlot';
import type { DropSlotProps } from './DropSlot.type';
import './DropSlot.css';

const DropSlot = (props: DropSlotProps) => {
  const { label, children, filled, size = 'md', clearLabel = DEFAULT_CLEAR_LABEL, disabled, onClear, onPick, className } = props;
  const bind = useDropSlot(props);
  const holds = filled ?? children !== undefined;
  const classes = ['drop-slot', `drop-slot--${size}`, className].filter(Boolean).join(' ');
  return (
    <Box
      role="group"
      aria-label={label}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : 0}
      className={classes}
      data-filled={holds ? '' : undefined}
      data-over={bind.over ? '' : undefined}
      onClick={disabled ? undefined : onPick}
      onDragEnter={bind.onDragEnter}
      onDragOver={bind.onDragOver}
      onDragLeave={bind.onDragLeave}
      onDrop={bind.onDrop}
      onKeyDown={bind.onKeyDown}
    >
      {holds ? <Box className="drop-slot__content">{children}</Box> : <Text variant="caption" tone="faint" className="drop-slot__label">{label}</Text>}
      {holds && onClear && (
        <IconButton
          variant="quiet"
          size="2xs"
          label={clearLabel}
          disabled={disabled}
          className="drop-slot__clear"
          onClick={(event) => { event.stopPropagation(); onClear(); }}
          onKeyDown={(event) => event.stopPropagation()}
        >
          <Icon name="x" />
        </IconButton>
      )}
    </Box>
  );
};

export { DropSlot };
