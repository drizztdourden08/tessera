/* @layer renderer-components @kind component */
import '../../theme/text-tone.css';
import './Text.css';
import { TEXT_MEMBERS } from '../text-elements/text-elements.constants';
import { CodeBlock } from '../CodeBlock';
import { Quote } from '../Quote';
import { Shortcut } from '../Shortcut';
import { textClassName } from './behavior/text-class-name';
import { typesettingStyle } from './behavior/text-style';
import type { TextProps } from './Text.type';

const TextBase = (props: TextProps) => {
  const { as: Tag = 'span', variant, tone, mono, numeric, className, weight, italic, opticalSize, features, style, children, ...rest } = props;
  const typeset = typesettingStyle({ weight, italic, opticalSize, features });
  return (
    <Tag
      className={textClassName({ variant, tone, mono, numeric, className })}
      style={typeset ? { ...typeset, ...style } : style}
      {...rest}
    >
      {children}
    </Tag>
  );
};

TextBase.displayName = 'Text';

const Text = Object.assign(TextBase, TEXT_MEMBERS, { CodeBlock, Quote, Q: Quote, Shortcut, Sc: Shortcut });

export { Text };
