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

interface ReviewStory {
  title: string;
  file: string;
}

interface ReviewMark {
  status: ReviewStatus;
  changed: boolean;
}

interface ReviewNote {
  text: string;
  at: string;
}

type ReviewNotes = Record<string, ReviewNote>;

interface ReviewState {
  pages: Record<string, ReviewColour>;
  groups: Record<string, ReviewColour>;
  marks: Record<string, ReviewMark>;
  notes: ReviewNotes;
}

type ReviewPostKind = 'set' | 'note';

type ReviewRequest = { kind: 'set'; title: string; status: ReviewStatus } | { kind: 'note'; title: string; text: string };

interface ReviewReply {
  code: number;
  error?: string;
  state?: ReviewState;
}

export type {
  ReviewColour, ReviewEntry, ReviewNote, ReviewNotes, ReviewPage, ReviewPostKind, ReviewRegistry, ReviewReply, ReviewRequest,
  ReviewState, ReviewStatus, ReviewStory,
};
