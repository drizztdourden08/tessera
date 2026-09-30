/* @layer root-config @kind types */
type ReviewMark = 'ok' | 'seen';

type ReviewColour = 'red' | 'yellow' | 'green';

interface ReviewEntry {
  mark: ReviewMark;
  hash: string;
  at: string;
}

type ReviewLedger = Record<string, ReviewEntry>;

interface ReviewPage {
  title: string;
  hash: string;
}

export type { ReviewColour, ReviewLedger, ReviewPage };
