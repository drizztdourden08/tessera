/* @layer renderer-components @kind types */
interface IndexPress {
  key: string;
  active: number;
  count: number;
  page: number;
}

interface IndexKeys {
  after: string;
  before: string;
}

export type { IndexKeys, IndexPress };
