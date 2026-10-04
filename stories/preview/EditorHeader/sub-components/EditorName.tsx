/* @layer stories @kind component */
import { useId } from 'react';
import { Box, Icon, Span, TextInput } from '../../../../src/primitives';
import { useNameKeys } from '../behavior/useNameKeys';
import { EDITOR_STRINGS } from '../editor-strings.constants';
import type { EditorNameProps } from '../EditorBar.type';

const EditorName = (props: EditorNameProps) => {
  const { value, onChange, label = EDITOR_STRINGS.name, error, placeholder, size = 'lg' } = props;
  const id = useId();
  const keys = useNameKeys(value, onChange);
  return (
    <Box className={`editor-name editor-name--${size}`}>
      <Box className="editor-name__row">
        <TextInput
          id={id}
          className="editor-name__input"
          value={value}
          aria-label={label}
          aria-describedby={error ? `${id}-error` : undefined}
          invalid={error !== undefined}
          placeholder={placeholder ?? label}
          spellCheck={false}
          onChange={(event) => onChange(event.currentTarget.value)}
          {...keys}
        />
        <Box as="span" className="editor-name__pen" aria-hidden>
          <Icon name="pencil" size={14} />
        </Box>
      </Box>
      {error && <Span id={`${id}-error`} tone="danger" className="editor-name__error">{error}</Span>}
    </Box>
  );
};

export { EditorName };
