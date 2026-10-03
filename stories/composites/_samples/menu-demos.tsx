/* @layer stories @kind story */
import { useState } from 'react';
import { DropdownMenu } from '../../../src/composites';
import type { MenuIconSide, MenuIntensity, MenuSize, MenuVariant } from '../../../src/composites';
import { Box, Text } from '../../../src/primitives';
import { INITIAL_OPEN, buildViewMenu } from './data-menu';
import { choiceMenu } from './menu-choices';

type MenuDemoArgs = {
  variant: MenuVariant;
  intensity: MenuIntensity;
  size: MenuSize;
  iconOnly: boolean;
  iconSide: MenuIconSide;
  filter: boolean;
  closeOnSelect: boolean;
};

const useViewMenu = (onPick: (label: string) => void) => {
  const [open, setOpen] = useState(INITIAL_OPEN);
  return buildViewMenu({
    open,
    onToggle: (id) => {
      setOpen((prev) => ({ ...prev, [id]: !prev[id] }));
      onPick(`Toggled ${id}`);
    },
    onPick,
  });
};

const MenuDemo = (args: MenuDemoArgs) => {
  const { variant, intensity, size, iconOnly, iconSide, filter, closeOnSelect } = args;
  const [last, setLast] = useState('Nothing picked yet.');
  const groups = useViewMenu(setLast);
  const trigger = iconOnly ? { label: 'View', iconOnly: true } : { label: 'View', icon: 'chevron-down' as const, iconSide };
  return (
    <Box className="story-row">
      <DropdownMenu
        trigger={trigger}
        groups={groups}
        variant={variant}
        intensity={intensity}
        size={size}
        filter={filter}
        closeOnSelect={closeOnSelect}
      />
      <Text className="story-label">{last}</Text>
    </Box>
  );
};

const ChoiceDemo = ({ inline = false }: { inline?: boolean }) => {
  const [flags, setFlags] = useState<Record<string, boolean>>({ grid: true, hints: false });
  const [sort, setSort] = useState('progress');
  const groups = choiceMenu({ flags, sort, onFlag: (id) => setFlags((all) => ({ ...all, [id]: all[id] !== true })), onSort: setSort });
  if (inline) return <DropdownMenu inline groups={groups} />;
  return <DropdownMenu trigger={{ label: 'Board', icon: 'layout-grid' }} groups={groups} closeOnSelect={false} />;
};

export { ChoiceDemo, MenuDemo };
export type { MenuDemoArgs };
