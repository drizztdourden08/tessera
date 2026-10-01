/* @layer stories @kind component */
import { useState } from 'react';
import type { ComponentType } from 'react';
import { SettingsSection } from '../../../src/composites/SettingsSection';
import { EmptyState, Field, NumberInput, Select, TextInput, Toggle } from '../../../src/primitives';

const SCALES = [
  { value: '90', label: '90%' },
  { value: '100', label: '100%' },
  { value: '125', label: '125%' },
];

const DENSITY = [
  { value: 'comfortable', label: 'Comfortable' },
  { value: 'compact', label: 'Compact' },
];

const GeneralPanel = () => {
  const [launch, setLaunch] = useState(true);
  const [updates, setUpdates] = useState(true);
  const [name, setName] = useState('mira');
  return (
    <SettingsSection title="General" description="How the app starts and what it calls you in sessions.">
      <Field label="Display name"><TextInput value={name} onChange={(e) => setName(e.target.value)} /></Field>
      <Toggle checked={launch} onChange={setLaunch} label="Open the last session on launch" />
      <Toggle checked={updates} onChange={setUpdates} label="Check for updates" description="Once a day, in the background." />
    </SettingsSection>
  );
};

const HostingPanel = () => {
  const [port, setPort] = useState(38281);
  const [slots, setSlots] = useState(16);
  const [relay, setRelay] = useState(true);
  return (
    <SettingsSection title="Hosting" description="Defaults for sessions you host from this computer.">
      <Field label="Port"><NumberInput value={port} min={1024} max={65535} onChange={setPort} /></Field>
      <Field label="Player limit" hint="Players past the limit join as spectators."><NumberInput value={slots} min={1} max={64} onChange={setSlots} /></Field>
      <Toggle checked={relay} onChange={setRelay} label="Relay through the server" />
    </SettingsSection>
  );
};

const AppearancePanel = () => {
  const [scale, setScale] = useState('100');
  const [density, setDensity] = useState('comfortable');
  return (
    <SettingsSection title="Appearance">
      <Field label="Interface size"><Select value={scale} onChange={setScale} options={SCALES} /></Field>
      <Field label="List density"><Select value={density} onChange={setDensity} options={DENSITY} /></Field>
    </SettingsSection>
  );
};

const PANELS: Record<string, ComponentType | undefined> = {
  general: GeneralPanel,
  hosting: HostingPanel,
  appearance: AppearancePanel,
};

const SettingsPanel = ({ id }: { id: string }) => {
  const Panel = PANELS[id];
  if (Panel) return <Panel />;
  return <EmptyState message="This sample has no options for this section. Try General, Hosting or Appearance." />;
};

export { AppearancePanel, GeneralPanel, HostingPanel, SettingsPanel };
