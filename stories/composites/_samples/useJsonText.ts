/* @layer stories @kind hook */
import { useState } from 'react';
import type { JsonText } from './json-text.type';
import { readJson } from './read-json';

const tidy = (value: unknown): string => JSON.stringify(value, null, 2);

const useJsonText = (start: unknown, draft?: string): JsonText => {
  const [text, setText] = useState(() => draft ?? tidy(start));
  const [saved, setSaved] = useState<unknown>(start);
  const edit = (next: string) => {
    setText(next);
    const read = readJson(next);
    if (read.problem === null) setSaved(read.value);
  };
  const set = (value: unknown) => {
    setText(tidy(value));
    setSaved(value);
  };
  return { text, edit, set, saved, problem: readJson(text).problem };
};

export { useJsonText };
