/* @layer renderer-components @kind component */
import { Pressable } from '../../../primitives/Pressable';
import { Shortcut } from '../../../primitives/Shortcut';
import { Span } from '../../../primitives/text-elements';
import { useKeybindCapture } from '../behavior/useKeybindCapture';
import type { SettingsKeybindProps } from './SettingsKeybind.type';

const SettingsKeybind = (props: SettingsKeybindProps) => {
  const { value, onChange, label, disabled, strings } = props;
  const { listening, start, stop, onKeyDown } = useKeybindCapture(onChange);
  const classes = ['settings-row__keybind', listening ? 'settings-row__keybind--listening' : ''].filter(Boolean).join(' ');
  return (
    <Pressable
      className={classes}
      disabled={disabled}
      aria-label={strings.changeShortcut(label)}
      aria-pressed={listening}
      onClick={listening ? stop : start}
      onBlur={stop}
      onKeyDown={onKeyDown}
    >
      {listening ? <Span tone="muted">{strings.pressKeys}</Span> : <Shortcut keys={value} size="xs" />}
    </Pressable>
  );
};

export { SettingsKeybind };
