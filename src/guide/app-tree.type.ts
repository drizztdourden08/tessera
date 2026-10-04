/* @layer renderer-design-system @kind types */
import type { DECISION_TREE } from './tree.constants';
import type { DecisionNode, PathsOf } from './tree.type';

type QuestionPathsOf<Node> = Node extends { readonly answers: infer Answers }
  ? readonly [] | {
    [Answer in keyof Answers & string]: Answers[Answer] extends { readonly answers: unknown } ? readonly [Answer, ...QuestionPathsOf<Answers[Answer]>] : never;
  }[keyof Answers & string]
  : never;

type QuestionPath = QuestionPathsOf<typeof DECISION_TREE>;

interface AppBranch {
  readonly at: QuestionPath;
  readonly answers: Readonly<Record<string, DecisionNode | null>>;
}

type AppTree = readonly AppBranch[];

type BranchPaths<Branch> = Branch extends { readonly at: infer At extends readonly string[]; readonly answers: infer Answers }
  ? readonly [...At, ...PathsOf<{ readonly answers: Answers }>]
  : never;

type AppTreePaths<Tree> = Tree extends AppTree ? BranchPaths<Tree[number]> : never;

export type { AppBranch, AppTree, AppTreePaths, QuestionPath };
