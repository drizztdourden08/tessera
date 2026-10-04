/* @layer renderer-components @kind component */
import { useMemo } from 'react';
import { ShortcutList } from '../../../../../primitives/ShortcutList';
import type { ShortcutListGroup } from '../../../../../primitives/ShortcutList';
import { useTesseraStrings } from '../../../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { SHORTCUT_GROUPS } from '../WidgetOptions.constants';

const ShortcutsList = () => {
  const { widgets } = useTesseraStrings();
  const groups = useMemo<ShortcutListGroup[]>(() => SHORTCUT_GROUPS.map((group) => ({
    label: widgets[group.label],
    items: group.items.map(({ keys, gesture, does }) => ({
      keys,
      gesture: gesture && { icon: gesture.icon, label: widgets[gesture.label] },
      description: widgets[does],
    })),
  })), [widgets]);

  return <ShortcutList groups={groups} label={widgets.shortcutsSection} className="widget-shortcuts" />;
};

export { ShortcutsList };
