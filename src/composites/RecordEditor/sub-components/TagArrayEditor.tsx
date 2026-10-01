/* @layer renderer-components @kind component */
import { useCallback, useMemo, useState } from 'react';
import { namespacedTag, TagInput } from '../../../primitives/TagInput';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { toList } from '../../field-kits/to-list';
import { toText } from '../../field-kits/to-text';
import { buildTagKeyMap } from '../behavior/tag-key-map';
import { isReferencedTagList } from '../behavior/is-referenced-tag-list';
import { NO_OPTIONS, NO_SUGGESTIONS } from './TagArrayEditor.constants';
import type { TagArrayEditorProps } from '../RecordEditor.type';
import '../../../theme/record-editor.css';

const TagArrayEditor = (props: TagArrayEditorProps) => {
  const { field, value, binding } = props;
  const { records } = useTesseraStrings();
  const referenced = isReferencedTagList(field);
  const targetKind = field.of?.targetKind ?? '';

  const options = referenced
    ? binding.resolveIdRefOptions?.(targetKind, field) ?? NO_OPTIONS
    : NO_OPTIONS;
  const map = useMemo(() => buildTagKeyMap(options), [options]);

  const stored = useMemo(() => toList(value).map(toText), [value]);
  const shown = useMemo(
    () => (referenced ? stored.map(map.keyOfId) : stored),
    [referenced, stored, map],
  );
  const suggestions = binding.resolveTagSuggestions?.(field) ?? NO_SUGGESTIONS;

  const [createError, setCreateError] = useState<string | null>(null);

  const handleChange = useCallback(
    (next: readonly string[]) => {
      if (!referenced) {
        binding.onChange(field.path, [...next]);
        return;
      }
      const resolved: string[] = [];
      const invented: string[] = [];
      for (const key of next) {
        const id = map.idOfKey(key) ?? (stored.includes(key) ? key : undefined);
        if (id) resolved.push(id);
        else invented.push(key);
      }
      binding.onChange(field.path, resolved);
      for (const key of invented) {
        setCreateError(null);
        void binding.onCreateTag?.(key).then((outcome) => {
          if (outcome.success) binding.onChange(field.path, [...resolved, outcome.id]);
          else setCreateError(outcome.error);
        });
      }
    },
    [referenced, binding, field.path, map, stored],
  );

  return (
    <TagInput
      id={field.path}
      className="record-editor__tags"
      value={shown}
      suggestions={suggestions}
      placeholder={records.tagPlaceholder}
      validate={namespacedTag}
      enforce={referenced}
      disabled={binding.disabled}
      createError={createError}
      onChange={handleChange}
    />
  );
};

export { TagArrayEditor };
