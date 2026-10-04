/* @layer stories @kind data */
import type { TesseraPart } from '../../../src/primitives';

interface ProviderPartText {
  title: string;
  note: string;
}

const PART_TEXT: Readonly<Record<TesseraPart, ProviderPartText>> = {
  spinner: {
    title: 'Spinner',
    note: 'Every Spinner, loading Button and loading field draws the app spinner.',
  },
  writeText: {
    title: 'Clipboard writer',
    note: 'Every copy button hands its text to the app writer. Copy the code below to see it.',
  },
  imagePlaceholder: {
    title: 'Image placeholder',
    note: 'Image and Thumbnail draw the app placeholder until the picture loads.',
  },
  strings: {
    title: 'Wording',
    note: 'Name only the keys to change. Every other key keeps its English text.',
  },
  errorFallback: {
    title: 'Crash screen',
    note: 'Every ErrorBoundary shows the app crash screen. Break the section to see it.',
  },
  emptyArt: {
    title: 'Empty state art',
    note: 'An EmptyState with no icon shows the app picture.',
  },
  portalDocument: {
    title: 'Portal document',
    note: 'Every Portal renders into this document instead of its own, such as the host page of an app inside an iframe.',
  },
  icons: {
    title: 'Icon set',
    note: 'Icon looks each name up in the app set. Here some names draw Phosphor duotone icons.',
  },
};

const PROVIDER_PARTS: readonly TesseraPart[] = [
  'spinner', 'writeText', 'imagePlaceholder', 'strings', 'errorFallback', 'emptyArt', 'portalDocument', 'icons',
];

export { PART_TEXT, PROVIDER_PARTS };
