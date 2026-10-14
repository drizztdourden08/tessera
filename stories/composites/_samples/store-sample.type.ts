/* @layer stories @kind types */
interface StoreSample {
  id: string;
  name: string;
  kind: string;
  author: string;
  summary: string;
  average: number | null;
  count: number;
  picture: string;
}

export type { StoreSample };
