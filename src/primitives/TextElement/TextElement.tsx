/* @layer renderer-components @kind component */
import type { ElementType, ReactElement } from 'react';
import { typesettingStyle } from '../Text/behavior/text-style';
import type { AnyTextElementProps, TextElementProps, TextTag } from './TextElement.type';
import '../../theme/text-tone.css';
import './TextElement.css';

const AnyTextElement = (props: AnyTextElementProps) => {
  const { as, tone, className, weight, italic, opticalSize, features, style, ...rest } = props;
  const Tag = as as ElementType;
  const typeset = typesettingStyle({ weight, italic, opticalSize, features });
  const toned = tone ? ['text-el--toned', `text-el--tone-${tone}`] : [];
  const classes = ['text-el', `text-el--${as}`, ...toned, className].filter(Boolean).join(' ');
  return <Tag className={classes} style={typeset ? { ...typeset, ...style } : style} {...rest} />;
};

const TextElement = AnyTextElement as <T extends TextTag>(props: TextElementProps<T>) => ReactElement;

export { TextElement };
