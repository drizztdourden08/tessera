/* @layer renderer-components @kind component */
import './EmojiIcon.css';
import type { EmojiIconProps } from './EmojiIcon.type';

const EmojiIcon = (props: EmojiIconProps) => {
  const { glyph, size = 'md', className = '', ...rest } = props;
  return (
    <span
      className={`emoji-icon emoji-icon--${size}${className ? ` ${className}` : ''}`}
      aria-hidden="true"
      {...rest}
    >
      {glyph}
    </span>
  );
};

export { EmojiIcon };
