/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Anchored } from '../../../../primitives/Anchored';
import { Box } from '../../../../primitives/Box';
import { HintLine } from '../../../../primitives/HintLine';
import { HintScope } from '../../../../primitives/HintScope';
import { useAnchorTracking } from '../../../../primitives/Portal';
import { useTesseraStrings } from '../../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { ORIGIN, SHORTCUTS_OPEN_KEY } from './WidgetOptions.constants';
import { panelPositionFor } from './behavior/panel-position';
import { useAfterFirstFrame } from './behavior/useAfterFirstFrame';
import { useOptionsDismiss } from './behavior/useOptionsDismiss';
import { useSessionFlag } from './behavior/useSessionFlag';
import { LayoutRows } from './sub-components/LayoutRows';
import { OptionsHeader } from './sub-components/OptionsHeader';
import { PlacementRow } from './sub-components/PlacementRow';
import { ShortcutsAside } from './sub-components/ShortcutsAside';
import type { WidgetOptionsProps } from './WidgetOptions.type';
import './WidgetOptions.css';

const WidgetOptions = (props: WidgetOptionsProps) => {
  const { title, anchorRef, onReset, onClose, children } = props;
  const { widgets } = useTesseraStrings();
  const panelRef = useRef<HTMLDivElement>(null);
  const shortcuts = useSessionFlag(SHORTCUTS_OPEN_KEY);
  const shown = useAfterFirstFrame();
  const { position } = useAnchorTracking({ active: true, anchorRef, compute: panelPositionFor, onOutOfView: onClose });
  useOptionsDismiss({ panelRef, anchorRef, onClose });

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
      <HintScope>
        <OptionsHeader title={title} shortcutsOpen={shortcuts.on} onToggleShortcuts={shortcuts.toggle} onReset={onReset} onClose={onClose} />
        <Box className="widget-options__rows">
          <PlacementRow {...props} />
          <LayoutRows {...props} />
        </Box>
        {children != null && <Box className="widget-options__own">{children}</Box>}
        <HintLine className="widget-options__hint" />
      </HintScope>
      {shown && shortcuts.on && <ShortcutsAside panelRef={panelRef} />}
    </Anchored>
  );
};

export { WidgetOptions };
