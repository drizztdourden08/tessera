/* @layer renderer-components @kind util */
import { createElement } from 'react';
import { TextElement } from '../TextElement';
import { RunningTextContext } from '../Quote/behavior/running-text-context';
import type { TextElementOwnProps, TextLook, TextTag } from '../TextElement';
import type { TextElementComponent } from './text-elements.type';

const textElementFor = <T extends TextTag>(tag: T, displayName: string): TextElementComponent<T, TextLook> => {
  const Element = (props: TextElementOwnProps<T>) => {
    const element = createElement(TextElement<T>, { ...props, as: tag } as Parameters<typeof TextElement<T>>[0]);
    return tag === 'p' ? createElement(RunningTextContext.Provider, { value: true }, element) : element;
  };
  Element.displayName = displayName;
  return Element;
};

export { textElementFor };
