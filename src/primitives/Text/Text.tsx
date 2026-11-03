/* @layer renderer-components @kind component */
import { useRef } from 'react';
import '../../theme/text-tone.css';
import './Text.css';
import { TEXT_MEMBERS } from '../text-elements/text-elements.constants';
import { Quote } from '../Quote';
import { useClamped } from '../dom/useClamped';
import { Shortcut } from '../Shortcut';
import { Tooltip } from '../Tooltip';
import { smartChildren } from '../times-between-digits/smart-children';
import { textClassName } from './behavior/text-class-name';
import { typesettingStyle } from './behavior/text-style';
import { textStyleMerge } from './behavior/text-style-merge';
import type { TextProps } from './Text.type';

const TextBase = (props: TextProps) => {
  const { as: Tag = 'span', variant, size, font, leading, tone, mono, numeric, smartTimes, clamp, className, weight, italic, opticalSize, features, style, children, ...rest } = props;
  const textRef = useRef<HTMLElement>(null);
  const clamped = useClamped(textRef, clamp !== undefined);
  const typeset = typesettingStyle({ weight, italic, opticalSize, features });
  const text = (
    <Tag
      ref={textRef}
      className={textClassName({ variant, size, font, leading, tone, mono, numeric, clamp: clamp !== undefined, className })}
      style={textStyleMerge(typeset, style, clamp)}
      {...rest}
    >
      {smartChildren(children, smartTimes)}
    </Tag>
  );
  if (clamp === undefined) return text;
  return <Tooltip content={clamped ? children : null} className="text-clamp-anchor">{text}</Tooltip>;
};

TextBase.displayName = 'Text';

const Text = Object.assign(TextBase, TEXT_MEMBERS, { Quote, Q: Quote, Shortcut, Sc: Shortcut });

export { Text };
