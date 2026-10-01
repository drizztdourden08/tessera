/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Anchored } from '../../../../primitives/Anchored';
import { Box } from '../../../../primitives/Box';
import { Button } from '../../../../primitives/Button';
import { Divider } from '../../../../primitives/Divider';
import { Glyph } from '../../../../primitives/Glyph';
import { IconButton } from '../../../../primitives/IconButton';
import { useAnchorTracking, useDismissListeners } from '../../../../primitives/Portal';
import { useTesseraStrings } from '../../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { Small, Span } from '../../../../primitives/text-elements';
import { ORIGIN } from './WidgetOptions.constants';
import { panelPositionFor } from './behavior/panel-position';
import { LayoutRows } from './sub-components/LayoutRows';
import { PlacementRow } from './sub-components/PlacementRow';
import { ShortcutsList } from './sub-components/ShortcutsList';
import type { WidgetOptionsProps } from './WidgetOptions.type';
import './WidgetOptions.css';

const WidgetOptions = (props: WidgetOptionsProps) => {
  const { title, anchorRef, onReset, onClose, children } = props;
  const { common, widgets } = useTesseraStrings();
  const panelRef = useRef<HTMLDivElement>(null);
  const { position } = useAnchorTracking({ active: true, anchorRef, compute: panelPositionFor, onOutOfView: onClose });
  useDismissListeners({ open: true, onClose, contentRef: panelRef, triggerRef: anchorRef });

  return (
    <Anchored
      ref={panelRef}
      anchorRef={anchorRef}
      placement="bottom-end"
      flip
      className="widget-options"
      fallback={position ?? ORIGIN}
      role="dialog"
      aria-label={widgets.optionsFor(title)}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <Box className="widget-options__header">
        <Span className="widget-options__title">{title}</Span>
        <IconButton label={common.close} title={common.close} onClick={onClose}>
          <Glyph name="close" size={14} />
        </IconButton>
      </Box>
      <Small tone="muted" className="widget-options__section">{widgets.placementSection}</Small>
      <PlacementRow {...props} />
      <LayoutRows {...props} />
      {children != null && (
        <>
          <Divider className="widget-options__divider" />
          {children}
        </>
      )}
      <Divider className="widget-options__divider" />
      <Small tone="muted" className="widget-options__section">{widgets.shortcutsSection}</Small>
      <ShortcutsList />
      <Divider className="widget-options__divider" />
      <Box className="widget-options__footer">
        <Button size="sm" variant="ghost" onClick={onReset}>{widgets.resetWidget}</Button>
      </Box>
    </Anchored>
  );
};

export { WidgetOptions };
