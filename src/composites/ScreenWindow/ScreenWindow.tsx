/* @layer renderer-components @kind component */
import { useId } from 'react';
import { Box } from '../../primitives/Box';
import { ScreenLayer } from '../ScreenLayer';
import { WindowHeader } from '../WindowHeader';
import { useTopOnlyCheck } from './behavior/useTopOnlyCheck';
import { WindowContentHeader } from './sub-components/WindowContentHeader';
import type { ScreenWindowProps } from './ScreenWindow.type';
import './ScreenWindow.css';

const ScreenWindow = (props: ScreenWindowProps) => {
  const { title, onClose, back, children, header, subtitle, extra, floating, hidden, size, square, className } = props;
  const titleId = useId();
  useTopOnlyCheck(props);
  const classes = ['screen-window', header && 'screen-window--header', className].filter(Boolean).join(' ');

  return (
    <ScreenLayer onClose={onClose} floating={floating} hidden={hidden} size={size} square={square} labelledBy={titleId}>
      <Box className={classes}>
        {header
          ? <WindowContentHeader header={header} back={back} title={title} titleId={titleId} onClose={onClose} />
          : (
            <WindowHeader
              title={title}
              titleId={titleId}
              subtitle={subtitle}
              extra={extra}
              back={back}
              onClose={onClose}
              className="screen-window__header"
            />
          )}
        <Box className="screen-window__content">{children}</Box>
      </Box>
    </ScreenLayer>
  );
};

export { ScreenWindow };
