/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Box } from '../../../primitives/Box';
import { SegmentedControl } from '../../../primitives/SegmentedControl';
import { optionHint } from '../behavior/option-hint';
import { useChoiceFit } from '../behavior/useChoiceFit';
import { SettingsSelect } from './SettingsSelect';
import type { SettingsSegmentedProps } from './SettingsSegmented.type';

const ignore = () => undefined;

const SettingsSegmented = (props: SettingsSegmentedProps) => {
  const { input, label, disabled, compact } = props;
  const probeRef = useRef<HTMLElement>(null);
  const options = input.options.map((option) => ({ value: option.value, label: option.label, hint: optionHint(option) }));
  const fits = useChoiceFit(probeRef, compact, options.map((option) => option.label).join('\n'));

  return (
    <>
      <Box as="span" className="settings-row__fit" aria-hidden="true" inert>
        <Box as="span" ref={probeRef} className="settings-row__fit-probe">
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
