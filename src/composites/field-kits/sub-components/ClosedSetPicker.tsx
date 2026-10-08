/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Box } from '../../../primitives/Box';
import { Select } from '../../../primitives/Select';
import { controlName } from '../../../primitives/field-control/control-name';
import { useChoiceFit } from '../../../primitives/dom/useChoiceFit';
import { closedSetRoom } from '../behavior/closed-set-room';
import { closedSetTier } from '../behavior/closed-set-tier';
import { ClosedSetChoices } from './ClosedSetChoices';
import type { ClosedSetProps } from './EnumEditorControl.type';
import '../../../theme/fit-probe.css';

const ignore = (): void => undefined;

const ClosedSetPicker = (props: ClosedSetProps) => {
  const { field, options, labelOf, current, disabled, onChange } = props;
  const probeRef = useRef<HTMLElement>(null);
  const tier = closedSetTier(options.length);
  const chips = tier === 'chips';
  const fits = useChoiceFit(probeRef, closedSetRoom, [tier, ...options.map(labelOf)].join('\n'));
  const list = (
    <Select
      {...controlName(props)}
      value={current}
      options={options.map((option) => ({ value: option, label: labelOf(option) }))}
      placeholder={field.label}
      disabled={disabled}
      searchable
      onChange={onChange}
    />
  );
  if (tier === 'list') return list;

  return (
    <Box className="field-kit__closed-set" data-fit={fits ? tier : 'list'}>
      <Box as="span" className="fit-probe" aria-hidden="true" inert>
        <Box as="span" ref={probeRef} className={`fit-probe__content${chips ? ' fit-probe__content--wraps' : ''}`}>
          <ClosedSetChoices field={field} options={options} labelOf={labelOf} current={current} disabled={disabled} onChange={ignore} chips={chips} />
        </Box>
      </Box>
      {fits ? <ClosedSetChoices {...props} chips={chips} /> : list}
    </Box>
  );
};

export { ClosedSetPicker };
