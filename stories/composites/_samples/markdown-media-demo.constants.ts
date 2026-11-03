/* @layer stories @kind data */
const UPLOAD_DELAY = 1500;

const IMAGE_PATTERN = /!\[[^\]]*\]\([^)]*\)/g;

const MEDIA_TEXT = {
  refused: 'The picture was refused: it is larger than 5 MB.',
  limitNote: 'The counter counts text only. Pictures are left out.',
  start: 'Paste, drop or pick a picture; it uploads for a moment and then appears as Markdown.',
};

const textOnly = (text: string): number => text.replace(IMAGE_PATTERN, '').length;

export { MEDIA_TEXT, UPLOAD_DELAY, textOnly };
