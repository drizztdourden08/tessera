/* @layer renderer-components @kind component */
import { Anchored } from '../../../../../primitives/Anchored';
import { useAnchorTracking } from '../../../../../primitives/Portal';
import { useTesseraStrings } from '../../../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { Small } from '../../../../../primitives/text-elements';
import { asidePositionFor } from '../behavior/aside-position';
import type { ShortcutsAsideProps } from '../WidgetOptions.type';
import { ShortcutsList } from './ShortcutsList';

const ShortcutsAside = (props: ShortcutsAsideProps) => {
  const { panelRef } = props;
  const { widgets } = useTesseraStrings();
  const { position } = useAnchorTracking({ active: true, anchorRef: panelRef, compute: asidePositionFor });

  return (
    <Anchored
      anchorRef={panelRef}
      placement="right-start"
      portal={false}
      fallback={position}
      className="widget-options-aside"
      role="complementary"
      aria-label={widgets.shortcutsSection}
    >
      <Small tone="muted" className="widget-options__section">{widgets.shortcutsSection}</Small>
      <ShortcutsList />
    </Anchored>
  );
};

export { ShortcutsAside };
