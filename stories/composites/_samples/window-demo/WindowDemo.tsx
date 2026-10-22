/* @layer stories @kind component */
import { useState } from 'react';
import { ScreenWindow } from '../../../../src/composites';
import { Button } from '../../../../src/primitives';
import { ScreenDemo } from '../ScreenDemo';
import { useWindowSwitch } from '../useWindowSwitch';
import { cornerProps, windowTop } from './window-props';
import { WindowList } from './WindowList';
import type { WindowArgs } from './window-demo.type';

const WindowDemo = (props: WindowArgs) => {
  const { title, subtitle, withExtra, withFloating, withHeader, withBack, titleRow, square, phone } = props;
  const [hidden, setHidden] = useState(false);
  const { view, floating } = useWindowSwitch(withFloating);
  const players = withFloating && view === 'players';
  const shownTitle = players ? 'Players' : 'Sessions';
  const extra = withExtra ? <Button size="sm">New session</Button> : undefined;
  const goBack = withBack ? () => setHidden(true) : undefined;
  const top = windowTop({ withHeader, players, subtitle, extra, goBack });
  return (
    <ScreenDemo hidden={hidden} onReopen={() => setHidden(false)} note="The close button hides the window" phone={phone}>
      <ScreenWindow
        title={withFloating ? shownTitle : title}
        {...top}
        {...cornerProps(props, players)}
        floating={floating}
        titleRow={titleRow}
        hidden={hidden}
        square={square}
        onClose={() => setHidden(true)}
      >
        <WindowList players={players} padded={withHeader} />
      </ScreenWindow>
    </ScreenDemo>
  );
};

export { WindowDemo };
