/* @layer renderer-components @kind component */
import './Flex.css';
import type { FlexProps } from './Flex.type';

const Flex = (props: FlexProps) => {
  const { direction = 'row', gap, align, justify, wrap, inline, container, as: Tag = 'div', className = '', children, ...rest } = props;
  return (
    <Tag
      className={`flex${inline ? ' flex--inline' : ''}${container ? ' flex--container' : ''}${className ? ` ${className}` : ''}`}
      data-dir={direction}
      data-gap={gap}
      data-align={align}
      data-justify={justify}
      data-wrap={wrap ? '' : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export { Flex };
