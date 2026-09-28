/* @layer renderer-components @kind component */
import './Text.css';
import { TEXT_MEMBERS } from '../text-elements/text-elements.constants';
import { typesettingStyle } from './behavior/text-style';
import type { TextProps } from './Text.type';

const TextBase = (props: TextProps) => {
  const { as: Tag = 'span', variant, className = '', weight, italic, opticalSize, features, style, children, ...rest } = props;
  const typeset = typesettingStyle({ weight, italic, opticalSize, features });
  return (
    <Tag
      className={`text${variant ? ` text--${variant}` : ''}${className ? ` ${className}` : ''}`}
      style={typeset ? { ...typeset, ...style } : style}
      {...rest}
    >
      {children}
    </Tag>
  );
};

const Text = Object.assign(TextBase, TEXT_MEMBERS);

export { Text };
