/* @layer stories @kind data */
import type { TesseraPart } from '../../../src/primitives';

interface ProviderPartText {
  title: string;
  point: string;
  note: string;
}

const PART_TEXT: Readonly<Record<TesseraPart, ProviderPartText>> = {
  spinner: {
    title: 'Spinner',
    point: 'Spinner: the loading spinner, also inside buttons and fields.',
    note: 'Every Spinner, loading Button and loading field draws the app spinner.',
  },
  writeText: {
    title: 'Clipboard writer',
    point: 'Clipboard writer: what every copy button calls.',
    note: 'Every copy button hands its text to the app writer. Copy the code below to see it.',
  },
  link: {
    title: 'Link',
    point: 'Link: the component behind every href, such as a router link.',
    note: 'Every href Tessera renders goes through the app link. Click one to see where it goes.',
  },
  imagePlaceholder: {
    title: 'Image placeholder',
    point: 'Image placeholder: what Image and Thumbnail show while loading, broken or empty.',
    note: 'Image and Thumbnail draw the app placeholder until the picture loads.',
  },
  strings: {
    title: 'Wording',
    point: 'Wording: any built in text, replaced key by key.',
    note: 'Name only the keys to change. Every other key keeps its English text.',
  },
  errorFallback: {
    title: 'Crash screen',
    point: 'Crash screen: what an ErrorBoundary shows when a section fails.',
    note: 'Every ErrorBoundary shows the app crash screen. Break the section to see it.',
  },
  emptyArt: {
    title: 'Empty state art',
    point: 'Empty state art: the picture in an EmptyState that names no icon.',
    note: 'An EmptyState with no icon shows the app picture.',
  },
  portalDocument: {
    title: 'Portal document',
    point: 'Portal document: the document popups and dialogs render into.',
    note: 'Every Portal renders into this document instead of its own, such as the host page of an app inside an iframe.',
  },
  icons: {
    title: 'Icon set',
    point: 'Icon set: the icons behind Icon names.',
    note: 'Icon looks each name up in the app set. Here some names draw Phosphor duotone icons.',
  },
};

const PROVIDER_PARTS: readonly TesseraPart[] = [
  'spinner', 'writeText', 'link', 'imagePlaceholder', 'strings', 'errorFallback', 'emptyArt', 'portalDocument', 'icons',
];

export { PART_TEXT, PROVIDER_PARTS };
