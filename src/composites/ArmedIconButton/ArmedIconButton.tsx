/* @layer renderer-components @kind component */
import { ArmedIcon } from '../../primitives/ArmedIcon';
import { Box } from '../../primitives/Box';
import { IconButton } from '../../primitives/IconButton';
import { Tooltip } from '../../primitives/Tooltip';
import { ARMED_ICON_SIZE } from './ArmedIconButton.constants';
import type { ArmedIconButtonProps } from './ArmedIconButton.type';
import { useArmedPress } from './behavior/useArmedPress';
import '../../theme/visually-hidden.css';
import './ArmedIconButton.css';

const ArmedIconButton = (props: ArmedIconButtonProps) => {
  const { icon, tone, size = 'sm', disabled = false, tabIndex, className } = props;
  const { ask, armed, name, press } = useArmedPress(props);

  return (
    <Box as="span" ref={ask.holdRef} className={['armed-icon-btn', tone && `armed-icon-btn--${tone}`, className].filter(Boolean).join(' ')}>
      <Tooltip content={name}>
        <IconButton
          ref={ask.triggerRef}
          size={size}
          label={name}
          disabled={disabled}
          tabIndex={tabIndex}
          data-armed={armed || undefined}
          onClick={press}
          onBlur={ask.cancel}
          onKeyDown={ask.onKeyDown}
        >
          <ArmedIcon name={icon} armed={armed} size={ARMED_ICON_SIZE[size]} />
        </IconButton>
      </Tooltip>
      <Box as="span" className="visually-hidden" role="status">{armed ? name : ''}</Box>
    </Box>
  );
};

export { ArmedIconButton };
