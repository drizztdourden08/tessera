/* @layer renderer-components @kind component */
import { Icon } from '../../../../primitives/Icon';
import { useTesseraStrings } from '../../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { ControlMenu, ControlMenuGroup, ControlMenuSub } from '../../../ControlMenu';
import { LayoutRows } from './sub-components/LayoutRows';
import { OptionsHeader } from './sub-components/OptionsHeader';
import { PlacementRow } from './sub-components/PlacementRow';
import { ShortcutsList } from './sub-components/ShortcutsList';
import type { WidgetOptionsProps } from './WidgetOptions.type';
import './WidgetOptions.css';

const WidgetOptions = (props: WidgetOptionsProps) => {
  const { title, onReset, defaultOpen, children } = props;
  const { common, widgets } = useTesseraStrings();

  return (
    <ControlMenu
      trigger={{ label: common.options, icon: <Icon name="settings" size={14} />, iconOnly: true }}
      label={widgets.optionsFor(title)}
      header={<OptionsHeader title={title} onReset={onReset} />}
      filter
      variant="ghost"
      intensity="medium"
      defaultOpen={defaultOpen}
      className="widget-options"
      triggerClassName="widget__btn widget__options"
    >
      <PlacementRow {...props} />
      <LayoutRows {...props} />
      {children != null && <ControlMenuGroup>{children}</ControlMenuGroup>}
      <ControlMenuSub label={widgets.shortcutsSection} icon="keyboard" hint={{ label: widgets.shortcutsSection, description: widgets.shortcutsHint }}>
        <ShortcutsList />
      </ControlMenuSub>
    </ControlMenu>
  );
};

export { WidgetOptions };
