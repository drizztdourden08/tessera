/* @layer renderer-components @kind component */
import { Icon } from '../../Icon';
import { useTesseraStrings } from '../../TesseraProvider/behavior/useTesseraStrings';
import { HINT_ICON_SIZE } from '../PasswordInput.constants';
import type { CapsLockHintProps } from './CapsLockHint.type';

const CapsLockHint = (props: CapsLockHintProps) => {
  const { on } = props;
  const { password } = useTesseraStrings();
  return (
    <>
      <span className="password-input__spoken" role="status">{on ? password.capsLockOn : ''}</span>
      {on && (
        <span className="password-input__caps" aria-hidden="true">
          <Icon name="arrow-big-up-dash" size={HINT_ICON_SIZE} />
          {password.capsLockOn}
        </span>
      )}
    </>
  );
};

export { CapsLockHint };
