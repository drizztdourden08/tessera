/* @layer stories @kind component */
import { useState } from 'react';
import { OptionGroup, OptionsPanel } from '../../../src/composites';
import { Box, Button, Text } from '../../../src/primitives';
import { SAMPLE_GROUPS, SAMPLE_TABS, SAMPLE_VALUES } from './options-panel-samples.constants';
import { OptionsPanelRow } from './OptionsPanelRow';
import './OptionsPanelDemo.css';

interface OptionsPanelDemoProps {
  title?: string;
  toolbar?: boolean;
  aside?: boolean;
}

const OptionsPanelDemo = ({ title = 'Randomizer options', toolbar = true, aside = true }: OptionsPanelDemoProps) => {
  const [tab, setTab] = useState('items');
  const [values, setValues] = useState(SAMPLE_VALUES);
  return (
    <Box className="options-panel-demo">
      <OptionsPanel
        title={title} tabs={SAMPLE_TABS} activeTab={tab} onTabChange={setTab}
        toolbar={toolbar ? <Button size="sm" variant="ghost" onClick={() => setValues(SAMPLE_VALUES)}>Reset all</Button> : undefined}
        aside={aside ? <Box className="options-panel-demo__pool"><Text variant="caption" tone="dim">Item pool: 120 items</Text></Box> : undefined}
      >
        {(SAMPLE_GROUPS[tab] ?? []).map((group) => (
          <OptionGroup key={group.title} title={group.title} tone={group.tone}>
            {group.options.map((option) => (
              <OptionsPanelRow key={option.id} option={option} value={values[option.id] ?? option.on} onChange={(next) => setValues({ ...values, [option.id]: next })} />
            ))}
          </OptionGroup>
        ))}
      </OptionsPanel>
    </Box>
  );
};

export { OptionsPanelDemo };
