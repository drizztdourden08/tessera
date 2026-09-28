/* @layer renderer-components @kind component */
import type { ElementType, ReactElement } from 'react';
import { typesettingStyle } from '../Text/behavior/text-style';
import type { AnyTextElementProps, TextElementProps, TextTag } from './TextElement.type';
import './TextElement.css';

const AnyTextElement = (props: AnyTextElementProps) => {
  const { as, className, weight, italic, opticalSize, features, style, ...rest } = props;
  const Tag = as as ElementType;
  const typeset = typesettingStyle({ weight, italic, opticalSize, features });
  const classes = ['text-el', `text-el--${as}`, className].filter(Boolean).join(' ');
  return <Tag className={classes} style={typeset ? { ...typeset, ...style } : style} {...rest} />;
};

const TextElement = AnyTextElement as <T extends TextTag>(props: TextElementProps<T>) => ReactElement;

export { TextElement };
