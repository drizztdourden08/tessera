/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { PlainInput } from '../../../primitives/field-control/PlainInput';
import type { PathInputBoxProps } from '../PathInput.type';
import { PathInputShown } from './PathInputShown';

const PathInputBox = ({ view, value, label }: PathInputBoxProps) => (
  <Box as="span" className="path-input__box" data-masked={view.masked || undefined}>
    <PlainInput
      className="path-input__input"
      id={view.inputId}
      value={value ?? ''}
      placeholder={view.drop.dropping ? view.words.drop : view.words.placeholder}
      aria-label={label}
      aria-labelledby={label ? undefined : view.labelId}
      aria-describedby={view.describedBy}
      aria-invalid={view.invalid || undefined}
      readOnly={!view.editable}
      disabled={view.disabled}
      spellCheck={false}
      autoComplete="off"
      onChange={(event) => view.change(event.target.value)}
      onFocus={() => view.setFocused(true)}
      onBlur={view.blur}
    />
    {view.masked && value && <PathInputShown path={value} />}
    {view.drop.dropping && <Box as="span" className="path-input__drop">{view.words.drop}</Box>}
  </Box>
);

export { PathInputBox };
