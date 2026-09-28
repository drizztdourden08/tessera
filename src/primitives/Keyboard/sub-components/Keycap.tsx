/* @layer renderer-components @kind component */
import { KeyGlyph } from './KeyGlyph';
import { KEY_SYMBOLS } from './KeyGlyph.constants';
import type { KeycapProps } from './Keycap.type';

const Keycap = (props: KeycapProps) => {
  const { face } = props;
  const { name, word, symbol, width } = face;
  const spoken = word !== name;
  return (
    <kbd className={`keyboard__key keyboard__key--${width}`}>
      {symbol ? <KeyGlyph spec={KEY_SYMBOLS[symbol]} /> : null}
      {word ? <span aria-hidden={spoken || undefined}>{word}</span> : null}
      {spoken ? <span className="keyboard__spoken">{name}</span> : null}
    </kbd>
  );
};

export { Keycap };
