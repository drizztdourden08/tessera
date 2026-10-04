/* @layer renderer-components @kind component */
import { forwardRef, useMemo, useRef } from 'react';
import { mergeRefs } from '../dom/merge-refs';
import { useFieldControl } from '../Field/behavior/useFieldControl';
import { TextInput } from '../TextInput';
import { useTesseraStrings } from '../TesseraProvider/behavior/useTesseraStrings';
import { clearsOnEscape } from './behavior/clears-on-escape';
import { SEARCH_MARK } from './SearchInput.constants';
import type { SearchInputProps } from './SearchInput.type';
import './SearchInput.css';

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>((props, ref) => {
  const { value, onChange, start = SEARCH_MARK, onKeyDown, placeholder, className = '', 'aria-label': ownLabel, ...rest } = props;
  const { common, navigation } = useTesseraStrings();
  const { labelId } = useFieldControl();
  const inputRef = useRef<HTMLInputElement>(null);
  const setRef = useMemo(() => mergeRefs(ref, inputRef), [ref]);
  const named = ownLabel !== undefined || rest['aria-labelledby'] !== undefined || labelId !== undefined;

  const clear = () => {
    onChange('');
    inputRef.current?.focus();
  };

  return (
    // eslint-disable-next-line tessera/prefer-named-input -- SearchInput is the part the rule points to
    <TextInput
      ref={setRef}
      type="search"
      enterKeyHint="search"
      autoComplete="off"
      spellCheck={false}
      className={`search-input ${className}`}
      placeholder={placeholder ?? common.searchPlaceholder}
      aria-label={named ? ownLabel : common.search}
      {...rest}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (!clearsOnEscape(event, value)) return;
        event.preventDefault();
        event.stopPropagation();
        onChange('');
      }}
      start={start}
      end={value === '' ? undefined : { icon: 'x', label: navigation.clearSearch, onClick: clear }}
    />
  );
});

SearchInput.displayName = 'SearchInput';

export { SearchInput };
