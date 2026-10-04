/* @layer stories @kind logic */
import type { MarkupToken } from './description.type';

const markupText = (tokens: readonly MarkupToken[]): string => tokens.map((token) => {
  switch (token.kind) {
    case 'strong':
    case 'em': return markupText(token.children);
    case 'keys': return token.keys.join('+');
    case 'page': return token.name;
    case 'code':
    case 'link':
    case 'text': return token.text;
  }
}).join('');

export { markupText };
