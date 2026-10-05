/* @layer renderer-components @kind logic */
import { foldText } from '../../../data/text/fold-text';
import { matchesText } from '../../../data/text/matches-text';
import type { CommandEntry } from '../CommandInput.type';

const inArguments = (typed: string, entries: readonly CommandEntry[]): boolean =>
  entries.some((entry) => typed.startsWith(`${entry.command} `));

const suggestCommands = (entries: readonly CommandEntry[], value: string, limit: number): readonly CommandEntry[] => {
  const typed = value.trimStart();
  const word = typed.trim();
  if (word === '' || inArguments(typed, entries)) return [];
  const start = foldText(word);
  const hits = entries.filter((entry) => entry.command !== word && matchesText(entry.command, word));
  const first = hits.filter((entry) => foldText(entry.command).startsWith(start));
  const rest = hits.filter((entry) => !first.includes(entry));
  return [...first, ...rest].slice(0, Math.max(limit, 0));
};

export { suggestCommands };
