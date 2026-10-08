/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Box } from '../../../primitives/Box';
import { SegmentedControl } from '../../../primitives/SegmentedControl';
import { optionHint } from '../behavior/option-hint';
import { useChoiceFit } from '../../../primitives/dom/useChoiceFit';
import { settingsChoiceRoom } from '../behavior/settings-choice-room';
import { SettingsSelect } from './SettingsSelect';
import type { SettingsSegmentedProps } from './SettingsSegmented.type';
import '../../../theme/fit-probe.css';

const ignore = () => undefined;

const SettingsSegmented = (props: SettingsSegmentedProps) => {
  const { input, label, disabled, compact } = props;
  const probeRef = useRef<HTMLElement>(null);
  const options = input.options.map((option) => ({ value: option.value, label: option.label, hint: optionHint(option) }));
  const fits = useChoiceFit(probeRef, settingsChoiceRoom(compact), [String(compact), ...options.map((option) => option.label)].join('\n'));

  return (
    <>
      <Box as="span" className="fit-probe" aria-hidden="true" inert>
        <Box as="span" ref={probeRef} className="fit-probe__content">
          <SegmentedControl value={input.value} onChange={ignore} options={options} disabled={disabled} />
        </Box>
      </Box>
      {fits
        ? <SegmentedControl value={input.value} onChange={input.onChange} options={options} disabled={disabled} aria-label={label} />
        : (
          <Box as="span" className="settings-row__fit-select" data-fit="select">
            <SettingsSelect input={{ ...input, kind: 'select' }} label={label} disabled={disabled} />
          </Box>
        )}
    </>
  );
};

export { SettingsSegmented };
