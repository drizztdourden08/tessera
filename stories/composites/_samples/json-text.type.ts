/* @layer stories @kind types */
interface JsonProblem {
  message: string;
  line: number | undefined;
}

type JsonRead = { value: unknown; problem: null } | { value?: never; problem: JsonProblem };

interface JsonText {
  text: string;
  edit: (text: string) => void;
  set: (value: unknown) => void;
  saved: unknown;
  problem: JsonProblem | null;
}

interface JsonCodeDemoProps {
  start: unknown;
  draft?: string;
}

export type { JsonCodeDemoProps, JsonRead, JsonText };
