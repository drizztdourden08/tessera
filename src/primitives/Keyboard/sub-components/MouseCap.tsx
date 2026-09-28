/* @layer renderer-components @kind component */
import { KeyGlyph } from './KeyGlyph';
import { MOUSE_SPECS } from './MouseCap.constants';
import type { MouseCapProps } from './MouseCap.type';

const MouseCap = (props: MouseCapProps) => {
  const { button } = props;
  const spec = MOUSE_SPECS[button];
  return (
    <span className="keyboard__key keyboard__key--mouse">
      <KeyGlyph spec={spec} />
      <span className="keyboard__spoken">{spec.name}</span>
    </span>
  );
};

export { MouseCap };
