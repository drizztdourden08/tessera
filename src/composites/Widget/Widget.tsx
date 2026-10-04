/* @layer renderer-components @kind component */
import { useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import { Box } from '../../primitives/Box';
import { ScrollArea } from '../../primitives/ScrollArea';
import { widgetClass } from './behavior/widget-class';
import { WidgetTitlebar } from './sub-components/WidgetTitlebar';
import type { WidgetProps } from './Widget.type';
import './Widget.css';

const Widget = (props: WidgetProps) => {
  const { id, opacity, peek = false, padding = 'sm', fill = false, children } = props;
  const [hovered, setHovered] = useState(false);
  const frameOpacity = hovered ? 1 : opacity;
  const style = useMemo(() => ({ '--widget-frame-opacity': frameOpacity }) as CSSProperties, [frameOpacity]);

  return (
    <Box
      className={widgetClass(props)}
      style={style}
      data-widget-id={id}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <WidgetTitlebar {...props} />
      {!peek && (
        <ScrollArea
          axis="both"
          scrollbar="slim"
          fade={false}
          className={`widget__content widget__content--pad-${padding}`}
          data-fill={fill || undefined}
        >
          {children}
        </ScrollArea>
      )}
    </Box>
  );
};

export { Widget };
