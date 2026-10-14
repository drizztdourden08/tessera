/* @layer renderer-components @kind component */
import { useId, useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import { Box } from '../../primitives/Box';
import { widgetClass } from './behavior/widget-class';
import { widgetName } from './behavior/widget-name';
import { WidgetBody } from './sub-components/WidgetBody';
import { WidgetTitlebar } from './sub-components/WidgetTitlebar';
import type { WidgetProps } from './Widget.type';
import './Widget.css';

const Widget = (props: WidgetProps) => {
  const { id, tabs, opacity, peek = false, padding, fill, disabled, onOpenSettings, children } = props;
  const titleId = useId();
  const titled = tabs.length <= 1;
  const [hovered, setHovered] = useState(false);
  const frameOpacity = hovered ? 1 : opacity;
  const style = useMemo(() => ({ '--widget-frame-opacity': frameOpacity }) as CSSProperties, [frameOpacity]);

  return (
    <Box
      className={widgetClass(props)}
      style={style}
      role="region"
      aria-labelledby={titled ? titleId : undefined}
      aria-label={titled ? undefined : widgetName(props)}
      data-widget-id={id}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <WidgetTitlebar {...props} titleId={titleId} />
      {!peek && <WidgetBody padding={padding} fill={fill} disabled={disabled} onOpenSettings={onOpenSettings}>{children}</WidgetBody>}
    </Box>
  );
};

export { Widget };
