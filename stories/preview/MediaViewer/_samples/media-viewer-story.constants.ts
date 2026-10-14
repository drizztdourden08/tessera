/* @layer stories @kind data */
import type { PreviewCardEntry } from '../../_shared/preview-card.type';

const VIEWER_TEXT = {
  expand: 'Expand',
  expandName: (name: string) => `Expand ${name}`,
} as const;

const VIEWER_MAPPING: readonly PreviewCardEntry[] = [
  { name: 'RotP MediaViewer', badge: 'Replaced', tone: 'warning', text: 'The big view of a picture or a video in Sanctuary\'s file pane, with one button for Fit or 100%. It becomes MediaViewer, which adds steps of zoom, dragging, and arrows through a set.' },
  { name: 'RotP MediaPreview', badge: 'Becomes a recipe', tone: 'info', text: 'The small picture with an Expand button under it. That is an Image inside a Pressable and a Button: no new part, an example on this page.' },
  { name: 'RotP usePixelArt', badge: 'Replaced', tone: 'warning', text: 'Keeps small sprites sharp instead of blurry. MediaViewer does it by itself for any picture 256 pixels or smaller.' },
  { name: 'DialogShell', badge: 'Stays', tone: 'success', text: 'MediaViewer is drawn in it, so Escape, focus and the close button work as in every dialog.' },
  { name: 'Video', badge: 'Stays', tone: 'success', text: 'A video plays in Tessera\'s own Video with its controls, and starts where the small preview stopped.' },
  { name: 'Overlay', badge: 'Not a fit', text: 'A shade over part of the screen. It has no close button, no focus trap and no Escape.' },
];

const VIEWER_CHOICES: readonly PreviewCardEntry[] = [
  {
    name: 'A. MediaViewer, a new part',
    badge: 'Recommended', tone: 'success',
    text: 'A picture or a video opened large, with zoom in steps, drag to look around, sharp sprites, and arrows through a set. Sanctuary\'s files, store pictures and sprite sheets all use it; it reuses DialogShell, Video and the Carousel steps.',
  },
  {
    name: 'B. No new part: a recipe in the guide',
    badge: 'Considered',
    text: 'The guide shows DialogShell with an Image and a Fit button. Nothing new ships, but every app writes its own zoom and dragging again.',
  },
  {
    name: 'C. Keep it in RotP',
    badge: 'Considered',
    text: 'Only Sanctuary opens pictures large today. Tessera stays smaller; the next app with pictures copies RotP\'s.',
  },
];

const VIEWER_CODE = `import { MediaViewer } from '@drizztdourden08/tessera';

<MediaViewer
  open={opened !== null}
  items={files.map((file) => ({ id: file.id, kind: 'image', src: file.url, name: file.name }))}
  defaultIndex={opened ?? 0}
  onClose={() => setOpened(null)}
/>`;

export { VIEWER_CHOICES, VIEWER_CODE, VIEWER_MAPPING, VIEWER_TEXT };
