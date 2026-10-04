/* @layer stories @kind component */
import { useState } from 'react';
import { ControlMenu, ControlMenuGroup, ControlMenuRow, ControlMenuSub } from '../../../src/composites';
import { Box, NumberStepper, SegmentedControl, Select, Slider, Text, Toggle } from '../../../src/primitives';
import type { SegmentOption } from '../../../src/primitives';

type ControlMenuDemoProps = {
  filter?: boolean;
  sub?: boolean;
  every?: boolean;
  align?: 'start' | 'end' | 'auto';
  defaultOpen?: boolean;
  label?: string;
};

type Density = 'cozy' | 'compact';

const DENSITY: SegmentOption<Density>[] = [
  { value: 'cozy', label: 'Cozy', hint: { label: 'Cozy rows', description: 'Room around every row' } },
  { value: 'compact', label: 'Compact', hint: { label: 'Compact rows', description: 'One line per row' } },
];

const THEMES = [{ value: 'dark', label: 'Dark' }, { value: 'light', label: 'Light' }, { value: 'system', label: 'System' }];

const ControlMenuDemo = (props: ControlMenuDemoProps) => {
  const { filter, sub, every, align, defaultOpen, label = 'View options' } = props;
  const [density, setDensity] = useState<Density>('cozy');
  const [labels, setLabels] = useState(true);
  const [zoom, setZoom] = useState(100);
  const [columns, setColumns] = useState(3);
  const [theme, setTheme] = useState('dark');
  const [sounds, setSounds] = useState(false);

  return (
    <Box className="story-row control-menu-story">
      <ControlMenu trigger={{ label, icon: 'sliders-horizontal' }} filter={filter} align={align} defaultOpen={defaultOpen}>
        <ControlMenuRow label="Density" hint={{ label: 'Density', description: 'How much room each row takes' }}>
          <SegmentedControl<Density> size="sm" aria-label="Density" value={density} options={DENSITY} onChange={setDensity} />
        </ControlMenuRow>
        <ControlMenuRow label="Labels" hint={{ label: 'Labels', description: 'Show a label under every icon' }}>
          <Toggle size="sm" checked={labels} onChange={setLabels} aria-label="Labels" />
        </ControlMenuRow>
        <ControlMenuRow label="Zoom" about="Scales the board, not the menus">
          <Slider size="sm" value={zoom} min={50} max={200} step={10} onChange={setZoom} formatValue={(v) => `${v}%`} />
        </ControlMenuRow>
        {every && (
          <ControlMenuGroup label="Board">
            <ControlMenuRow label="Columns" hint={{ label: 'Columns', description: 'How many cards side by side' }}>
              <NumberStepper size="sm" value={columns} min={1} max={6} onChange={setColumns} ariaLabel="Columns" />
            </ControlMenuRow>
            <ControlMenuRow label="Theme">
              <Select size="sm" aria-label="Theme" options={THEMES} value={theme} onChange={setTheme} />
            </ControlMenuRow>
          </ControlMenuGroup>
        )}
        {sub && (
          <ControlMenuSub label="Sounds" icon="volume-2" description={sounds ? 'On' : 'Off'}>
            <ControlMenuRow label="Play sounds">
              <Toggle size="sm" checked={sounds} onChange={setSounds} aria-label="Play sounds" />
            </ControlMenuRow>
            <ControlMenuRow label="Columns">
              <NumberStepper size="sm" value={columns} min={1} max={6} onChange={setColumns} ariaLabel="Columns" />
            </ControlMenuRow>
          </ControlMenuSub>
        )}
      </ControlMenu>
      <Text className="story-label">{`${density} · labels ${labels ? 'on' : 'off'} · zoom ${zoom}% · ${columns} columns · ${theme} · sounds ${sounds ? 'on' : 'off'}`}</Text>
    </Box>
  );
};

export { ControlMenuDemo };
export type { ControlMenuDemoProps };
