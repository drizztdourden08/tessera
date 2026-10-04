/* @layer renderer-components @kind component */
import { useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import { Box } from '../../primitives/Box';
import { ScrollArea } from '../../primitives/ScrollArea';
import { WidgetTitlebar } from './sub-components/WidgetTitlebar';
import type { WidgetProps } from './Widget.type';
import './Widget.css';

const Widget = (props: WidgetProps) => {
  const { id, paneKey, opacity, peek = false, square = false, children } = props;
  const [hovered, setHovered] = useState(false);
  const frameOpacity = hovered ? 1 : opacity;
  const style = useMemo(() => ({ '--widget-frame-opacity': frameOpacity }) as CSSProperties, [frameOpacity]);
  const cls = ['widget', peek && 'widget--peek', paneKey === null && 'widget--floating', square && 'widget--square'].filter(Boolean).join(' ');

  return (
    <Box
      className={cls}
      style={style}
      data-widget-id={id}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <WidgetTitlebar {...props} />
      {!peek && (
        <ScrollArea axis="both" scrollbar="slim" fade={false} className="widget__content">
          {children}
        </ScrollArea>
      )}
    </Box>
  );
};

export { Widget };
