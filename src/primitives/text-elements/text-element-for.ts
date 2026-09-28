/* @layer renderer-components @kind util */
import { createElement } from 'react';
import { TextElement } from '../TextElement';
import type { TextElementOwnProps, TextTag } from '../TextElement';
import type { TextElementComponent } from './text-elements.type';

const textElementFor = <T extends TextTag>(tag: T, displayName: string): TextElementComponent<T> => {
  const Element = (props: TextElementOwnProps<T>) => createElement(TextElement<T>, { ...props, as: tag } as Parameters<typeof TextElement<T>>[0]);
  Element.displayName = displayName;
  return Element;
};

export { textElementFor };
