/* @layer stories @kind constants */
interface LogEntry {
  id: string;
  text: string;
  level: 'info' | 'warn';
}

const LEVELS = ['info', 'info', 'info', 'warn'] as const;

const entriesOf = (count: number): readonly LogEntry[] =>
  Array.from({ length: count }, (_, at) => ({
    id: `entry-${at}`,
    text: `Event ${at + 1}`,
    level: LEVELS[at % LEVELS.length] ?? 'info',
  }));

export type { LogEntry };
export { entriesOf };
