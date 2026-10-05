/* @layer renderer-components @kind component */
import { useId, useRef } from 'react';
import { Box } from '../../primitives/Box';
import { FieldControlContext } from '../../primitives/field-control/field-control-context';
import { Icon } from '../../primitives/Icon';
import { IconButton } from '../../primitives/IconButton';
import { Text } from '../../primitives/Text';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { focusRowControl } from './behavior/focus-row-control';
import { rowControl } from './behavior/row-control';
import type { FormRowProps } from './FormRow.type';
import { FormRowHead } from './sub-components/FormRowHead';
import './FormRow.css';

const FormRow = (props: FormRowProps) => {
  const { label, description, changed = false, advanced = false, problem, onReset, children, className } = props;
  const { common } = useTesseraStrings();
  const auto = useId();
  const controlId = props.id ?? `form-row-${auto}`;
  const { control, descriptionId, problemId } = rowControl(props, controlId);
  const controlBox = useRef<HTMLElement>(null);
  return (
    <Box className={['form-row', className].filter(Boolean).join(' ')} data-changed={changed || undefined} data-problem={problem ? true : undefined}>
      <FormRowHead label={label} labelId={control.labelId ?? ''} controlId={controlId} onNameClick={() => focusRowControl(controlBox.current, controlId)} description={description} descriptionId={descriptionId} changed={changed} advanced={advanced} />
      <Box ref={controlBox} className="form-row__control">
        <FieldControlContext.Provider value={control}>{children}</FieldControlContext.Provider>
        {problem && <Text id={problemId} variant="caption" tone="danger" role="alert">{problem}</Text>}
      </Box>
      <Box className="form-row__reset">
        {onReset && (
          <IconButton size="sm" variant="ghost" label={common.resetNamed(label)} title={common.resetNamed(label)} disabled={!changed} onClick={onReset}>
            <Icon name="rotate-ccw" />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export { FormRow };
