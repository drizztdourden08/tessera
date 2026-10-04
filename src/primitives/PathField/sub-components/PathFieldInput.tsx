/* @layer renderer-components @kind component */
import { Box } from '../../Box';
import type { PathFieldInputProps } from '../PathField.type';
import { PathFieldShown } from './PathFieldShown';

const PathFieldInput = ({ view, value, label }: PathFieldInputProps) => (
  <Box as="span" className="path-field__box" data-masked={view.masked || undefined}>
    <input
      className="path-field__input"
      id={view.inputId}
      value={value ?? ''}
      placeholder={view.drop.dropping ? view.words.drop : view.words.placeholder}
      aria-label={label}
      aria-describedby={view.describedBy}
      aria-invalid={view.invalid || undefined}
      readOnly={!view.editable}
      disabled={view.disabled}
      spellCheck={false}
      autoComplete="off"
      onChange={(event) => view.change(event.target.value)}
      onFocus={() => view.setFocused(true)}
      onBlur={() => view.setFocused(false)}
    />
    {view.masked && value && <PathFieldShown path={value} />}
    {view.drop.dropping && <Box as="span" className="path-field__drop">{view.words.drop}</Box>}
  </Box>
);

export { PathFieldInput };
