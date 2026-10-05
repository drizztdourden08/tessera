/* @layer stories @kind util */
import type { JsonRead } from './json-text.type';

const AT_LINE = /line (\d+)/;

const readJson = (text: string): JsonRead => {
  try {
    return { value: JSON.parse(text) as unknown, problem: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const line = AT_LINE.exec(message)?.[1];
    return { problem: { message, line: line === undefined ? undefined : Number(line) } };
  }
};

export { readJson };
