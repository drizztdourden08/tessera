/* @layer renderer-components @kind component */
import { useState, useRef } from 'react';
import { Box } from '../../primitives/Box';
import type { WidgetProps } from './Widget.type';
import { useWidgetMoveResize } from './behavior/useWidgetMoveResize';
import { useWidgetStyle } from './behavior/useWidgetStyle';
import { WidgetResizeHandles } from './sub-components/WidgetResizeHandles';
import { WidgetSettings } from './sub-components/WidgetSettings';
import { WidgetTitlebar } from './sub-components/WidgetTitlebar';
import './Widget.css';

const Widget = (props: WidgetProps) => {
  const { state, label = state.id, onChange, onClose, children, settingsContent, dockedStyle, exclusiveLabel } = props;
  const [hovered, setHovered] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const gearRef = useRef<HTMLButtonElement>(null);

  const { dragMouseDown, onEdgeMouseDown } = useWidgetMoveResize(state, onChange);
  const style = useWidgetStyle(state, hovered ? 1 : state.opacity, dockedStyle);

  const cls = [
    'widget',
    `widget--${state.mode}`,
    state.mode === 'docked' && `widget--${state.side}`,
  ].filter(Boolean).join(' ');

  return (
    <Box
      className={cls}
      style={style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <WidgetTitlebar
        label={label}
        gearRef={gearRef}
        onMouseDown={state.mode === 'floating' ? dragMouseDown : undefined}
        onToggleSettings={() => setSettingsOpen((v) => !v)}
        onClose={onClose}
      />

      <Box className="widget__content">
        {children}
      </Box>

      <WidgetResizeHandles mode={state.mode} side={state.side} onEdgeMouseDown={onEdgeMouseDown} />

      {settingsOpen && (
        <WidgetSettings
          widget={state}
          anchorRef={gearRef}
          onClose={() => setSettingsOpen(false)}
          onChange={onChange}
          exclusiveLabel={exclusiveLabel}
        >
          {settingsContent}
        </WidgetSettings>
      )}
    </Box>
  );
};

export { Widget };
