/* @layer renderer-components @kind logic */
import type { FieldControl } from '../../../primitives/field-control/field-control.type';
import type { FormRowProps } from '../FormRow.type';

const rowControl = (props: FormRowProps, id: string): { control: FieldControl; descriptionId: string; problemId: string } => {
  const descriptionId = `${id}-description`;
  const problemId = `${id}-problem`;
  const notes = [props.description ? descriptionId : null, props.problem ? problemId : null].filter(Boolean).join(' ');
  return {
    control: { id, describedBy: notes || undefined, invalid: props.problem != null, labelId: `${id}-label` },
    descriptionId,
    problemId,
  };
};

export { rowControl };
