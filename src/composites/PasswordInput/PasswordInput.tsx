/* @layer renderer-components @kind component */
import { forwardRef } from 'react';
import { Box } from '../../primitives/Box';
import { TextInput } from '../../primitives/TextInput';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { leavesRoot } from './behavior/leaves-root';
import { passwordClass } from './behavior/password-class';
import { usePasswordField } from './behavior/usePasswordField';
import { usePasswordName } from './behavior/usePasswordName';
import type { PasswordInputProps } from './PasswordInput.type';
import { MaskOverlay } from './sub-components/MaskOverlay';
import { PasswordNotes } from './sub-components/PasswordNotes';
import './PasswordInput.css';

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>((props, ref) => {
  const {
    value, onChange, mode, revealed: _revealed, defaultRevealed: _defaultRevealed, onRevealedChange: _onRevealedChange, hideOnBlur, maskChar, monospace,
    capsLockWarning, rules: _rules, strength: _strength, size: _size, start, className, onKeyDown, onKeyUp, onBlur, 'aria-describedby': _describedBy, ...rest
  } = props;
  const { password } = useTesseraStrings();
  const field = usePasswordField(props, ref);
  const name = usePasswordName(props);
  const { reveal, caps } = field;

  return (
    <Box
      className={passwordClass({ size: field.size, monospace: monospace === true || maskChar !== undefined, masked: field.masked, start: start !== undefined, className })}
      data-mask-cells={field.masked && field.cells > 1 ? field.cells : undefined}
      onBlur={(event) => { if (hideOnBlur === true && leavesRoot(event)) reveal.hide(); }}
    >
      <TextInput
        ref={field.setRef}
        autoComplete={mode === 'new' ? 'new-password' : 'current-password'}
        spellCheck={false}
        autoCapitalize="off"
        autoCorrect="off"
        aria-describedby={field.describedBy}
        {...rest}
        aria-label={name}
        type={reveal.shown ? 'text' : 'password'}
        size={field.size}
        start={start}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => { onKeyDown?.(event); caps.track(event); }}
        onKeyUp={(event) => { onKeyUp?.(event); caps.track(event); }}
        onBlur={(event) => { onBlur?.(event); caps.clear(); }}
        end={{ icon: reveal.shown ? 'eye-off' : 'eye', label: password.showPassword, pressed: reveal.shown, onClick: reveal.toggle }}
      />
      {field.masked && maskChar !== undefined && <MaskOverlay inputRef={field.inputRef} maskChar={maskChar} value={value} />}
      <PasswordNotes field={field} capsLockWarning={capsLockWarning !== false} />
    </Box>
  );
});

PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
