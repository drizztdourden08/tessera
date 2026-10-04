/* @layer renderer-components @kind component */
import { useId } from 'react';
import { Box } from '../Box';
import { useFieldControl } from '../Field/behavior/useFieldControl';
import { useJsonText } from './behavior/useJsonText';
import { INDENT } from './JsonInput.constants';
import type { JsonInputProps } from './JsonInput.type';
import { JsonEditor } from './sub-components/JsonEditor';
import { JsonFoot } from './sub-components/JsonFoot';
import './JsonInput.css';

const JsonInput = (props: JsonInputProps) => {
  const { indent = INDENT, readOnly, disabled, className } = props;
  const control = useFieldControl(props.id, props['aria-describedby']);
  const statusId = useId();
  const json = useJsonText(props, indent);
  const invalid = json.problem !== null || props.invalid === true || control.invalid === true;
  return (
    <Box className={['json-input', className].filter(Boolean).join(' ')}>
      <JsonEditor
        text={json.text}
        errorLine={json.problem?.line}
        textarea={{
          id: control.id,
          'aria-label': props['aria-label'],
          'aria-labelledby': props['aria-label'] ? undefined : control.labelId,
          'aria-describedby': [control.describedBy, statusId].filter(Boolean).join(' '),
          'aria-invalid': invalid || undefined,
          readOnly,
          disabled,
          onChange: json.edit,
        }}
      />
      <JsonFoot id={statusId} problem={json.problem} value={json.value} onFormat={readOnly ? undefined : json.format} disabled={disabled} />
    </Box>
  );
};

export { JsonInput };
