/* @layer renderer-components @kind component */
import { Shortcut } from '../../Shortcut';
import { useTesseraStrings } from '../../TesseraProvider/behavior/useTesseraStrings';

const CommandKeyHints = ({ id }: { id: string }) => {
  const { common } = useTesseraStrings();
  return (
    <span id={id} className="command-input__keys">
      <Shortcut keys="up" legend="symbol" size="xs" />
      <Shortcut keys="down" legend="symbol" size="xs" />
      <span className="command-input__key-text">{common.history}</span>
      <Shortcut keys="esc" size="xs" />
      <span className="command-input__key-text">{common.clear}</span>
    </span>
  );
};

export { CommandKeyHints };
