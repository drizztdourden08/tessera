/* @layer renderer-components @kind util */
import { DATA_IMAGE_BODY, DATA_IMAGE_HEAD, DATA_IMAGE_MAX_LENGTH, DATA_IMAGE_WHITESPACE } from './data-image.constants';

const dataImage = (src: string): string | undefined => {
  if (src.length > DATA_IMAGE_MAX_LENGTH) return undefined;
  const text = src.trim();
  const head = DATA_IMAGE_HEAD.exec(text)?.[0];
  if (!head) return undefined;
  const body = text.slice(head.length).replace(DATA_IMAGE_WHITESPACE, '');
  return DATA_IMAGE_BODY.test(body) ? head + body : undefined;
};

export { dataImage };
