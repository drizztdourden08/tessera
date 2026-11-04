/* @layer renderer-components @kind component */
import { useId, useRef } from 'react';
import { Box } from '../../primitives/Box';
import { FieldControlContext } from '../../primitives/field-control/field-control-context';
import { Text } from '../../primitives/Text';
import { focusRowControl } from './behavior/focus-row-control';
import { rowClass } from './behavior/row-class';
import { rowControl } from './behavior/row-control';
import type { FormRowProps } from './FormRow.type';
import { FormRowHead } from './sub-components/FormRowHead';
import { FormRowReset } from './sub-components/FormRowReset';
import './FormRow.css';

const FormRow = (props: FormRowProps) => {
  const { label, description, descriptionLines = 2, help, changed = false, advanced = false, problem, onReset, children, className } = props;
  const auto = useId();
  const controlId = props.id ?? `form-row-${auto}`;
  const { control, descriptionId, problemId } = rowControl(props, controlId);
  const resettable = changed && onReset !== undefined;
  const controlBox = useRef<HTMLElement>(null);
  return (
    <Box className={rowClass(resettable, className)} data-changed={changed || undefined} data-problem={problem ? true : undefined}>
      <FormRowHead label={label} labelId={control.labelId ?? ''} controlId={controlId} onNameClick={() => focusRowControl(controlBox.current, controlId)} help={help} description={description} descriptionLines={descriptionLines} descriptionOverflow={props.descriptionOverflow ?? 'hint'} descriptionId={descriptionId} changed={changed} advanced={advanced} />
      <Box ref={controlBox} className="form-row__control">
        <FieldControlContext.Provider value={control}>{children}</FieldControlContext.Provider>
        {problem && <Text id={problemId} variant="caption" tone="danger" role="alert">{problem}</Text>}
      </Box>
      {resettable && <FormRowReset label={label} onReset={onReset} />}
    </Box>
  );
};

export { FormRow };
