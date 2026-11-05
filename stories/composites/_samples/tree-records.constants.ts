/* @layer stories @kind data */
type RecordNode = {
  id: string;
  kind: string;
  icon: 'bookmark' | 'bug' | 'zap';
  code: string;
  title: string;
  children?: RecordNode[];
};

const RECORD_TREE: RecordNode[] = [
  {
    id: 'story',
    kind: 'Story',
    icon: 'bookmark',
    code: 'ARG-7',
    title: 'Sign in rework',
    children: [
      { id: 'bug', kind: 'Bug', icon: 'bug', code: 'ARG-12', title: 'Fix the login redirect' },
      { id: 'task', kind: 'Task', icon: 'zap', code: 'ARG-13', title: 'Add a reset link' },
    ],
  },
  { id: 'lone', kind: 'Bug', icon: 'bug', code: 'ARG-14', title: 'Fix the crash on save' },
];

export { RECORD_TREE };
export type { RecordNode };
