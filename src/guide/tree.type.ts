/* @layer renderer-design-system @kind types */
interface DecisionNode {
  readonly question: string;
  readonly answers: Readonly<Record<string, DecisionNode | null>>;
}

type PathsOf<Node> = Node extends { readonly answers: infer Answers }
  ? { [Answer in keyof Answers & string]: readonly [Answer, ...PathsOf<Answers[Answer]>] }[keyof Answers & string]
  : readonly [];

export type { DecisionNode, PathsOf };
