/* @layer renderer-components @kind component */
import { Span } from '../../text-elements';
import type { StepperNoteProps } from './StepperNote.type';
import '../../../theme/visually-hidden.css';

const StepperNote = ({ id, text }: StepperNoteProps) =>
  text === undefined ? null : <Span id={id} className="visually-hidden">{text}</Span>;

export { StepperNote };
