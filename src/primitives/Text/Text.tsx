/* @layer renderer-components @kind component */
import '../../theme/text-tone.css';
import './Text.css';
import { TEXT_MEMBERS } from '../text-elements/text-elements.constants';
import { Quote } from '../Quote';
import { Shortcut } from '../Shortcut';
import { smartChildren } from '../times-between-digits/smart-children';
import { textClassName } from './behavior/text-class-name';
import { typesettingStyle } from './behavior/text-style';
import type { TextProps } from './Text.type';

const TextBase = (props: TextProps) => {
  const { as: Tag = 'span', variant, size, font, tone, mono, numeric, smartTimes, className, weight, italic, opticalSize, features, style, children, ...rest } = props;
  const typeset = typesettingStyle({ weight, italic, opticalSize, features });
  return (
    <Tag
      className={textClassName({ variant, size, font, tone, mono, numeric, className })}
      style={typeset ? { ...typeset, ...style } : style}
      {...rest}
    >
      {smartChildren(children, smartTimes)}
    </Tag>
  );
};

TextBase.displayName = 'Text';

const Text = Object.assign(TextBase, TEXT_MEMBERS, { Quote, Q: Quote, Shortcut, Sc: Shortcut });

export { Text };
