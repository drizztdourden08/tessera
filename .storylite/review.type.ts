/* @layer root-config @kind types */
type ReviewStatus = 'new' | 'seen' | 'ok';

type ReviewColour = 'red' | 'yellow' | 'green';

interface ReviewEntry {
  status: ReviewStatus;
  hash?: string;
  at?: string;
}

type ReviewRegistry = Record<string, Record<string, ReviewEntry>>;

interface ReviewPage {
  title: string;
  hash: string;
}

interface ReviewState {
  pages: Record<string, ReviewColour>;
  groups: Record<string, ReviewColour>;
}

export type { ReviewColour, ReviewEntry, ReviewPage, ReviewRegistry, ReviewState };
