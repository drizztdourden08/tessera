/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { HINT_ICON_SIZE } from '../PasswordInput.constants';
import type { CapsLockHintProps } from './CapsLockHint.type';

const CapsLockHint = (props: CapsLockHintProps) => {
  const { on } = props;
  const { password } = useTesseraStrings();
  return (
    <>
      <Box as="span" className="password-input__spoken" role="status">{on ? password.capsLockOn : ''}</Box>
      {on && (
        <Box as="span" className="password-input__caps" aria-hidden="true">
          <Icon name="arrow-big-up-dash" size={HINT_ICON_SIZE} />
          {password.capsLockOn}
        </Box>
      )}
    </>
  );
};

export { CapsLockHint };
