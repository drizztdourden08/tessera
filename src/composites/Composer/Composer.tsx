/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { Flex } from '../../primitives/Flex';
import { Textarea } from '../../primitives/Textarea';
import { useComposerKeys } from './behavior/useComposerKeys';
import { COMPOSER_MAX_ROWS, COMPOSER_ROWS } from './Composer.constants';
import type { ComposerProps } from './Composer.type';
import { ComposerSend } from './sub-components/ComposerSend';
import '../../theme/composer-box.css';
import './Composer.css';

const Composer = (props: ComposerProps) => {
  const { value, onChange, onSubmit, placeholder, maxRows = COMPOSER_MAX_ROWS, disabled = false, busy = false, sendSlot, bar, className, 'aria-label': ariaLabel } = props;
  const onKeyDown = useComposerKeys({ value, disabled, busy, onSubmit });

  return (
    <Box className={['composer', 'composer-box', className].filter(Boolean).join(' ')}>
      <Textarea
        look="bare"
        autoGrow
        rows={COMPOSER_ROWS}
        maxRows={maxRows}
        aria-label={ariaLabel}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={onKeyDown}
      />
      {bar != null && (
        <Flex className="composer-box__foot" gap="xs" align="center">
          <Flex className="composer-box__bar" gap="xs" align="center">{bar}</Flex>
        </Flex>
      )}
      <Flex className="composer-box__send" gap="xs" align="center">
        {sendSlot ?? <ComposerSend value={value} disabled={disabled} busy={busy} onSubmit={onSubmit} />}
      </Flex>
    </Box>
  );
};

export { Composer };
