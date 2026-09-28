/* @layer renderer-components @kind component */
import { Icon } from '../../Icon';
import { KEY_SYMBOLS } from './Keycap.constants';
import type { KeycapProps, KeySymbolSpec } from './Keycap.type';

const Keycap = (props: KeycapProps) => {
  const { face } = props;
  const { name, label, symbol, width } = face;
  const glyph: KeySymbolSpec | undefined = symbol ? KEY_SYMBOLS[symbol] : undefined;
  const spoken = label !== name;
  const classes = ['shortcut__cap', `shortcut__cap--${width}`, glyph ? 'shortcut__cap--icon' : ''].filter(Boolean).join(' ');
  return (
    <kbd className={classes}>
      {glyph ? <Icon icon={glyph.icon} flip={glyph.flip} className="shortcut__symbol" /> : null}
      {label ? <span aria-hidden={spoken || undefined}>{label}</span> : null}
      {spoken ? <span className="shortcut__spoken">{name}</span> : null}
    </kbd>
  );
};

export { Keycap };
