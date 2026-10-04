/* @layer renderer-components @kind hook */
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTesseraStrings } from '../../TesseraProvider/behavior/useTesseraStrings';
import type { JsonInputProps, JsonText } from '../JsonInput.type';
import { checkJson } from './check-json';
import { formatJson } from './format-json';
import { jsonProblem } from './json-problem';

const same = (a: unknown, b: unknown): boolean => JSON.stringify(a) === JSON.stringify(b);

const useJsonText = (props: JsonInputProps, indent: number): JsonText => {
  const { value, onChange, onProblem, shape = 'any', defaultText } = props;
  const strings = useTesseraStrings();
  const [text, setText] = useState(() => defaultText ?? formatJson(value, indent));
  const held = useRef<unknown>(value);
  useEffect(() => {
    if (same(value, held.current)) return;
    held.current = value;
    setText(formatJson(value, indent));
  }, [value, indent]);
  const check = useMemo(() => checkJson(text, shape), [text, shape]);
  const problem = check.fault ? jsonProblem(text, check.fault, strings) : null;
  const problemKey = problem ? `${problem.reason}@${String(problem.offset)}` : '';
  useEffect(() => {
    onProblem?.(problem);
  }, [problemKey]);
  const edit = (next: string) => {
    setText(next);
    const result = checkJson(next, shape);
    if (result.fault || same(result.value, held.current)) return;
    held.current = result.value;
    onChange(result.value);
  };
  const tidy = check.fault ? null : formatJson(check.value, indent);
  return { text, edit, problem, value: check.value, format: tidy !== null && tidy !== text ? () => setText(tidy) : undefined };
};

export { useJsonText };
