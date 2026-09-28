/* @layer renderer-components @kind component */
import { Fragment } from 'react';
import { isMouseButton } from './behavior/is-mouse-button';
import { keyFace } from './behavior/key-face';
import { usePlatform } from './behavior/usePlatform';
import { Keycap } from './sub-components/Keycap';
import { MouseCap } from './sub-components/MouseCap';
import type { KeyboardKey, KeyboardProps } from './Keyboard.type';
import './Keyboard.css';

const Keyboard = (props: KeyboardProps) => {
  const { keys, platform = 'auto', className, ...rest } = props;
  const resolved = usePlatform(platform);
  const list: readonly KeyboardKey[] = typeof keys === 'string' ? [keys] : keys;
  const classes = ['keyboard', `keyboard--${resolved}`, className].filter(Boolean).join(' ');
  return (
    <kbd className={classes} {...rest}>
      {list.map((key, index) => (
        <Fragment key={`${index}-${key}`}>
          {index > 0 && resolved === 'windows' ? <span className="keyboard__joiner">+</span> : null}
          {isMouseButton(key) ? <MouseCap button={key} /> : <Keycap face={keyFace(key, resolved)} />}
        </Fragment>
      ))}
    </kbd>
  );
};

export { Keyboard };
