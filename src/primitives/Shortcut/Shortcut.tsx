/* @layer renderer-components @kind component */
import { Fragment } from 'react';
import type { ReactNode } from 'react';
import { keyFace } from './behavior/key-face';
import { shortcutClass } from './behavior/shortcut-class';
import { Keycap } from './sub-components/Keycap';
import { MouseCap } from './sub-components/MouseCap';
import type { ShortcutKey, ShortcutProps } from './Shortcut.type';
import './Shortcut.css';

const Shortcut = (props: ShortcutProps) => {
  const { keys = [], mouse, legend = 'label', width, animate = false, state, fill = false, className, ...rest } = props;
  const list: readonly ShortcutKey[] = typeof keys === 'string' ? [keys] : keys;
  const caps: ReactNode[] = list.map((key) => <Keycap face={keyFace(key, legend, width)} />);
  if (mouse) caps.push(<MouseCap button={mouse} />);
  return (
    <kbd className={shortcutClass({ animate, state, fill, className })} {...rest}>
      {caps.map((cap, index) => (
        <Fragment key={index}>
          {index > 0 ? <span className="shortcut__joiner">+</span> : null}
          {cap}
        </Fragment>
      ))}
    </kbd>
  );
};

export { Shortcut };
