/* @layer stories @kind types */
interface DateStep {
  key: string;
  label: string;
  minutes: number;
}

interface DateRow {
  id: string;
  name: string;
  savedAt: number;
  created: string;
}

export type { DateRow, DateStep };
