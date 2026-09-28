/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Portal, useAnchorTracking } from '../../../primitives/Portal';
import { Box } from '../../../primitives/Box';
import { Floating } from '../../../primitives/Floating';
import { Text } from '../../../primitives/Text';
import { Checkbox } from '../../../primitives/Checkbox';
import { Slider } from '../../../primitives/Slider';
import { useSettingsDismiss } from '../behavior/useSettingsDismiss';
import { WidgetPositionRow } from './WidgetPositionRow';
import { ANCHOR_GAP, EDGE_MARGIN, ORIGIN, PANEL_HEIGHT, PANEL_WIDTH } from './WidgetSettings.constants';
import type { WidgetSettingsProps } from './WidgetSettings.type';

const panelPositionFor = (rect: DOMRect): { top: number; left: number } => {
  let top = rect.bottom + ANCHOR_GAP;
  let left = rect.right - PANEL_WIDTH;
  if (left < EDGE_MARGIN) left = EDGE_MARGIN;
  if (left + PANEL_WIDTH > window.innerWidth - EDGE_MARGIN) {
    left = window.innerWidth - PANEL_WIDTH - EDGE_MARGIN;
  }
  if (top + PANEL_HEIGHT > window.innerHeight - EDGE_MARGIN) {
    top = rect.top - PANEL_HEIGHT - ANCHOR_GAP;
  }
  return { top, left };
};

const WidgetSettings = (props: WidgetSettingsProps) => {
  const { widget, anchorRef, onClose, onChange, children, exclusiveLabel = 'Shrink content area' } = props;
  const panelRef = useRef<HTMLDivElement>(null);

  const { position: pos } = useAnchorTracking({
    active: true,
    anchorRef,
    compute: panelPositionFor,
    onOutOfView: onClose,
  });

  useSettingsDismiss(panelRef, anchorRef, onClose);

  return (
    <Portal layer="popover">
      <Floating
        ref={panelRef}
        className="widget-settings"
        placement={pos ?? ORIGIN}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <WidgetPositionRow widget={widget} onChange={onChange} onClose={onClose} />

        <Box className="widget-settings__row">
          <Text className="widget-settings__label">Opacity</Text>
          <Slider
            value={Math.round(widget.opacity * 100)}
            min={0}
            max={100}
            step={5}
            onChange={(v) => onChange({ opacity: v / 100 })}
            showValue
            formatValue={(v) => `${v}%`}
          />
        </Box>

        {widget.mode === 'docked' && (
          <Box className="widget-settings__row">
            <Text className="widget-settings__label">Exclusive</Text>
            <Checkbox
              className="widget-settings__toggle"
              checked={widget.exclusive}
              onChange={(c) => onChange({ exclusive: c })}
              label={exclusiveLabel}
            />
          </Box>
        )}

        {children && (
          <>
            <Box className="widget-settings__separator" />
            {children}
          </>
        )}
      </Floating>
    </Portal>
  );
};

export { WidgetSettings };
