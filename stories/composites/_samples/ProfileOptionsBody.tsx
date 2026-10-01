/* @layer stories @kind story */
import { Box, Callout, Field, Icon, Select, Tabs, Toggle } from '../../../src/primitives';
import { changedIn, RANDOMIZER_TABS, valueOf } from './randomizer-options';
import type { RandomizerOption } from './randomizer-options';
import type { BodyProps } from './ProfileWizardBodies';

type OptionsBodyProps = BodyProps & { tab: string; onTab: (tab: string) => void };

type RowProps = { item: RandomizerOption; value: string; locked: boolean; onChange: (value: string) => void };

const OptionRow = ({ item, value, locked, onChange }: RowProps) => {
  if (item.choices.length === 2 && item.choices.includes('On') && item.choices.includes('Off')) {
    return (
      <Box className="profile-wizard-story__option">
        <Toggle checked={value === 'On'} label={item.label} description={item.hint || undefined} disabled={locked} onChange={(on) => onChange(on ? 'On' : 'Off')} />
      </Box>
    );
  }
  return (
    <Box className="profile-wizard-story__option">
      <Field label={item.label} hint={item.hint || undefined}>
        <Select options={item.choices.map((choice) => ({ value: choice, label: choice }))} value={value} disabled={locked} onChange={onChange} />
      </Field>
    </Box>
  );
};

const ProfileOptionsBody = ({ wizard, tab, onTab }: OptionsBodyProps) => {
  const { options } = wizard.values;
  const active = RANDOMIZER_TABS.find((entry) => entry.id === tab) ?? RANDOMIZER_TABS[0];
  const tabs = RANDOMIZER_TABS.map((entry) => {
    const changed = changedIn(entry, options);
    return { id: entry.id, label: entry.label, badge: changed > 0 ? changed : undefined };
  });
  const setOption = (id: string, value: string) => wizard.setValue('options', { ...options, [id]: value });
  const locked = active?.live === false;
  return (
    <>
      <Tabs tabs={tabs} activeTab={active?.id ?? ''} onTabChange={onTab} />
      {locked && (
        <Callout tone="info" icon={<Icon name="lock" />}>
          {active.options.length > 0 ? 'Not implemented yet. These rows are fixed in this version and show what the seed uses.' : 'Not implemented yet.'}
        </Callout>
      )}
      <Box className="profile-wizard-story__options">
        {active?.options.map((item) => (
          <OptionRow key={item.id} item={item} value={valueOf(options, item)} locked={locked} onChange={(value) => setOption(item.id, value)} />
        ))}
      </Box>
    </>
  );
};

export { ProfileOptionsBody };
