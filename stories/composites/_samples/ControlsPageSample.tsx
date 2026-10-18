/* @layer stories @kind component */
import { useState } from 'react';
import { ListItemList, ListItemRow, SidePanel } from '../../../src/composites';
import { Box, Icon, IconButton } from '../../../src/primitives';
import { ControlsBindings } from './ControlsBindings';
import { ControlsDeviceCard } from './ControlsDeviceCard';
import { ControlsDeviceRailButton } from './ControlsDeviceRailButton';
import { CONTROLS_ACTIONS, CONTROLS_DEVICES, CONTROLS_FIRST_PROFILE, CONTROLS_PROFILES, CONTROLS_TEXT as T } from './controls-page.constants';
import type { ControlsBindings as Bindings, ControlsPageSampleProps } from './controls-page.type';

const ControlsPageSample = ({ folded = false }: ControlsPageSampleProps) => {
  const [profile, setProfile] = useState(CONTROLS_FIRST_PROFILE);
  const [bindings, setBindings] = useState<Bindings>({});
  const bind = (actionId: string, deviceId: string) => setBindings((was) => ({ ...was, [`${profile.id}:${actionId}`]: deviceId }));
  const assign = (deviceId: string) => {
    const free = CONTROLS_ACTIONS.find((action) => bindings[`${profile.id}:${action.id}`] === undefined);
    if (free) bind(free.id, deviceId);
  };
  const rail = CONTROLS_PROFILES.map((item) => (
    <IconButton key={item.id} size="sm" variant="ghost" active={item.id === profile.id} label={T.pick(item.name)} onClick={() => setProfile(item)}>
      <Icon name={item.icon} />
    </IconButton>
  ));
  const add = <IconButton size="sm" variant="ghost" label={T.newProfile}><Icon name="plus" /></IconButton>;
  const rescan = <IconButton size="sm" variant="ghost" label={T.rescan}><Icon name="refresh-cw" /></IconButton>;
  const devices = CONTROLS_DEVICES.map((device) => <ControlsDeviceRailButton key={device.id} device={device} onAssign={assign} />);
  return (
    <Box className="controls-story">
      <SidePanel title={T.profiles} actions={add} rail={rail} defaultCollapsed={folded} width={240}>
        <ListItemList label={T.profiles}>
          {CONTROLS_PROFILES.map((item) => (
            <ListItemRow
              key={item.id}
              name={item.name}
              meta={item.meta}
              icon={<Icon name={item.icon} />}
              selected={item.id === profile.id}
              onClick={() => setProfile(item)}
            />
          ))}
        </ListItemList>
      </SidePanel>
      <ControlsBindings profile={profile} bindings={bindings} onBind={bind} />
      <SidePanel side="end" title={T.devices} actions={rescan} rail={devices} defaultCollapsed={folded} width={288}>
        {CONTROLS_DEVICES.map((device) => <ControlsDeviceCard key={device.id} device={device} onAssign={assign} />)}
      </SidePanel>
    </Box>
  );
};

export { ControlsPageSample };
