/* @layer renderer-components @kind hook */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTagPopup } from './useTagPopup';
import { useTagKeyDown } from './useTagKeyDown';
import { adviseTag } from './tag-convention';
import { blocksCreate } from './blocksCreate';
import { addTag } from './addTag';
import { filterSuggestions } from './filterSuggestions';
import { isNewValue } from './isNewValue';
import { normalizeTag } from './tag-values';
import { removeAt } from './removeAt';
import { resolveCommit } from './resolveCommit';
import { DEFAULT_MAX_SUGGESTIONS, NO_SUGGESTIONS } from './useTagInput.constants';
import type { UseTagInputParams } from './useTagInput.type';

const useTagInput = (params: UseTagInputParams) => {
  const {
    value, onChange, suggestions = NO_SUGGESTIONS, maxSuggestions = DEFAULT_MAX_SUGGESTIONS,
    disabled, validate, enforce = false, createError,
  } = params;

  const [query, setQuery] = useState('');
  const [highlightIdx, setHighlightIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const popup = useTagPopup(disabled);

  const [visibleCreateError, setVisibleCreateError] = useState<string | null>(createError ?? null);
  useEffect(() => setVisibleCreateError(createError ?? null), [createError]);

  const filtered = useMemo(
    () => filterSuggestions({ suggestions, query, selected: value, limit: maxSuggestions }),
    [suggestions, query, value, maxSuggestions],
  );

  const advice = adviseTag(query, validate);
  const isNew = isNewValue(query, suggestions);
  const blocked = blocksCreate({ raw: query, isNew, enforce, validate });
  const createText = isNew && !blocked ? normalizeTag(query) : null;

  const commit = useCallback(
    (raw: string) => {
      const next = addTag(value, raw);
      if (next !== value) onChange(next);
      setQuery('');
      setHighlightIdx(-1);
      inputRef.current?.focus();
    },
    [value, onChange],
  );

  const commitTyped = useCallback(() => {
    if (blocked) return;
    const tag = resolveCommit(query, suggestions);
    if (tag !== null) commit(tag);
  }, [blocked, query, suggestions, commit]);

  const handleQueryChange = useCallback(
    (next: string) => {
      setQuery(next);
      setHighlightIdx(-1);
      setVisibleCreateError(null);
      popup.handleOpen();
    },
    [popup],
  );

  const handleRemove = useCallback(
    (index: number) => {
      const next = removeAt(value, index);
      if (next !== value) onChange(next);
    },
    [value, onChange],
  );

  const handleKeyDown = useTagKeyDown({
    value, onChange, query, filtered, highlightIdx, setHighlightIdx, commit, commitTyped, popup,
  });

  return {
    query, filtered, createText, advice, blocked, createError: visibleCreateError, highlightIdx,
    inputRef, popup, commit, handleQueryChange, handleKeyDown, handleRemove,
  };
};

export { useTagInput };
