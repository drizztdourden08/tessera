/* @layer renderer-components @kind component */
import './Text.css';
import { typesettingStyle } from './typesetting/text-style';
import type { TextProps } from './Text.type';

const Text = (props: TextProps) => {
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

export { Text };
